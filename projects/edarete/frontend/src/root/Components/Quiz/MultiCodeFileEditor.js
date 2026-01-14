import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
  IconButton,
  TextField,
  CircularProgress,
  Modal,
  Stack
} from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { showSuccessToast } from '../../Common/ToastUtils';

// Lazy load Monaco Editor only when needed
const Editor = lazy(() => import("@monaco-editor/react").then(module => ({ default: module.default })));

const MultiCodeFileEditor = ({
  isField = false,
  isLab = false,
  isTestCaseFileEnabled = false,
  quizzes = null,
  emit,
  on,
  onChange,
  isConnected,
  setSelectedComponent,
  setCodeAnswer,
  setTestOutput,
  priviousCodeAnswers,
  setFilesField,
  editor = {},
  submitTrigger,
  containerRef,
  submitModalOpen,
  setSubmitModalOpen,
  labTimerRef,
}) => {
  const [files, setFiles] = useState({});
  const [activeFile, setActiveFile] = useState('');
  const [tabs, setTabs] = useState([]);
  const [codeOutput, setCodeOutput] = useState('');
  const [showNewFileInput, setShowNewFileInput] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [fileNameError, setFileNameError] = useState('');
  const [time, setTime] = useState(0);
  const [isTimeActive, setIsTimeActive] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [helpStatus, setHelpStatus] = useState('idle'); // 'idle' | 'sending' | 'sent'
  const [currentQueryId, setCurrentQueryId] = useState(null);
  const timerRef = useRef(null);
  const helpTimerRef = useRef(null);
  const [stdin, setStdin] = useState('4\n5\n2\n8\n1\n1\n0');
  const [editorRefreshKey, setEditorRefreshKey] = useState(0);
  const editorRef = useRef(null); // Ref to store Monaco editor instance

  // Hold last parsed test results to send on submit
  const [lastTestResults, setLastTestResults] = useState(null);

  useEffect(() => {
    if (typeof setCodeAnswer === 'function') {
      setCodeAnswer(JSON.stringify(priviousCodeAnswers));
    }
    if (typeof setCodeAnswer === 'function') {
      setCodeAnswer(JSON.stringify(priviousCodeAnswers));
    }
    return () => {
      clearInterval(timerRef.current);
      if (helpTimerRef.current) {
        clearTimeout(helpTimerRef.current);
        helpTimerRef.current = null;
      }
    };
  }, []);

  // Helper to unescape string literals (fixes \\n → \n)
  const unescapeStringValue = (str) => {
    if (typeof str !== 'string') return str;

    return str
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\t/g, '\t')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
  };

  // Helper to unescape all file values
  const unescapeFiles = (filesObj) => {
    const unescaped = {};
    Object.entries(filesObj).forEach(([fileName, fileData]) => {
      unescaped[fileName] = {
        ...fileData,
        value: unescapeStringValue(fileData.value),
      };
    });
    return unescaped;
  };

  // Track last snapshot of incoming files so we can react to updates
  const lastLoadedSnapshotRef = useRef(null);

  useEffect(() => {
    if (
      !priviousCodeAnswers ||
      typeof priviousCodeAnswers !== "object" ||
      Object.keys(priviousCodeAnswers).length === 0
    ) {
      return;
    }

    const snapshot = JSON.stringify(priviousCodeAnswers);
    if (lastLoadedSnapshotRef.current === snapshot) {
      return;
    }

    lastLoadedSnapshotRef.current = snapshot;
    const unescapedFiles = unescapeFiles(priviousCodeAnswers);
    setFiles(unescapedFiles);

    setActiveFile(current => {
      if (current && unescapedFiles[current]) {
        return current;
      }
      return Object.keys(unescapedFiles)[0] || '';
    });

    setTabs(prevTabs => {
      const names = Object.keys(unescapedFiles);
      if (names.length === 0) {
        return [];
      }

      const filtered = prevTabs.filter(name => unescapedFiles[name]);
      const first = names[0];
      if (!filtered.includes(first)) {
        return [first, ...filtered];
      }

      return filtered.length ? filtered : [first];
    });
  }, [priviousCodeAnswers]);

  // Listen for socket events related to help queries
  useEffect(() => {
    if (!on) return;

    // Listen for current-query event (query raised successfully)
    const handleCurrentQuery = data => {
      console.log('current-query event received:', data);
      if (data?.success && data?.queryId) {
        setCurrentQueryId(data.queryId);
        setHelpStatus('sent');
        console.log('Query raised successfully with ID:', data.queryId);
      }
    };

    // Listen for query-attended event (instructor is coming)
    const handleQueryAttended = data => {
      console.log('query-attended event received:', data);
      if (data?.queryId === currentQueryId) {
        setHelpStatus('Someone came');
        setIsButtonDisabled(false);
        console.log('Instructor is attending your query:', data.queryId);
      }
    };

    on('current-query', handleCurrentQuery);
    on('query-attended', handleQueryAttended);

    // Cleanup listeners
    return () => {
      try {
        if (typeof on === 'function' && typeof on.off === 'function') {
          on.off('current-query', handleCurrentQuery);
          on.off('query-attended', handleQueryAttended);
        }
      } catch (e) {
        console.warn('Error cleaning up socket listeners:', e);
      }
    };
  }, [on, currentQueryId]);

  // Handle file content change - update files state without causing cursor jump
  const handleEditorChange = (value) => {
    // Only update internal state, don't re-render the editor
    const updatedFiles = {
      ...files,
      [activeFile]: {
        ...files[activeFile],
        value: value || '',
      },
    };

    // Update files state
    setFiles(updatedFiles);

    // Call parent callback with updated files
    if (typeof setFilesField === 'function') {
      setFilesField(updatedFiles);
    }

    // Call other callbacks with updated files (using JSON for external consumers)
    if (typeof setCodeAnswer === 'function') {
      setCodeAnswer(JSON.stringify(updatedFiles));
    }
    if (typeof onChange === 'function') {
      onChange(JSON.stringify(updatedFiles));
    }
  };

  // Handle editor mount to store reference
  const handleEditorMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const validateFileName = fileName => {
    if (!fileName) return 'File name is required';

    const validExtensions = ['.cpp', '.h', '.hpp', '.cxx', '.cc', '.hxx','.md'];
    const fileExt = fileName.includes('.')
      ? fileName.substring(fileName.lastIndexOf('.')).toLowerCase()
      : '';

    if (!fileExt || !validExtensions.includes(fileExt)) {
      return 'Please use a valid C++ file extension: .cpp, .h, .hpp, .cxx, .cc, .hxx';
    }

    if (files[fileName]) {
      return 'File already exists!';
    }

    return '';
  };

  // Add file
  const handleNewFile = e => {
    // Handle both Enter key press and button click
    const isEnterKey = e.key === 'Enter';
    const isButtonClick = e.type === 'click';

    if (isEnterKey || isButtonClick) {
      const error = validateFileName(newFileName);
      if (error) {
        setFileNameError(error);
        return;
      }

      const newFile = {
        name: newFileName,
        language: 'cpp',
        value: '',
      };

      setFiles(prev => {
        const updatedFiles = { ...prev, [newFileName]: newFile };
        if (typeof setFilesField === 'function') {
          setFilesField(updatedFiles);
        }
        if (typeof setCodeAnswer === 'function') {
          setCodeAnswer(JSON.stringify(updatedFiles));
        }
        return updatedFiles;
      });
      setTabs(prev => [...prev, newFileName]);
      setActiveFile(newFileName);
      setNewFileName('');
      setShowNewFileInput(false);
      setFileNameError('');
    } else if (e.key === 'Escape') {
      setNewFileName('');
      setShowNewFileInput(false);
      setFileNameError('');
    }
  };

  // Files that should be hidden from the user
  const hiddenFiles = ['testcase.cpp', 'catch.hpp', 'test_runner_main.cpp'];

  // Filter function to show only visible files
  const getVisibleFiles = () => {
    if (isTestCaseFileEnabled) {
      return Object.keys(files);
    }

    return Object.keys(files).filter(fileName => !hiddenFiles.includes(fileName));
  };

  // Delete file
  const handleDeleteFile = (fileName, e) => {
    e.stopPropagation();

    // Prevent deletion of hidden files
    if (hiddenFiles.includes(fileName)) {
      return;
    }

    const newFiles = { ...files };
    delete newFiles[fileName];
    setFiles(newFiles);
    if (typeof setFilesField === 'function') {
      setFilesField(newFiles);
    }
    if (typeof setCodeAnswer === 'function') {
      setCodeAnswer(JSON.stringify(newFiles));
    }
    // Update tabs
    const newTabs = tabs.filter(tab => tab !== fileName);
    setTabs(newTabs);

    // If active file is deleted, switch to another file
    if (activeFile === fileName) {
      if (Object.keys(newFiles).length > 0) {
        setActiveFile(newTabs[newTabs.length - 1] || Object.keys(newFiles)[0]);
      }
    }
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveFile(newValue);
  };

  // Close tab
  const handleCloseTab = (tabName, e) => {
    e.stopPropagation();
    if (tabs.length > 0) {
      const newTabs = tabs.filter(tab => tab !== tabName);
      setTabs(newTabs);
      if (activeFile === tabName) {
        setActiveFile(newTabs[newTabs.length - 1]);
      }
    }
  };
  // Function to run testcases
  // ✅ REFACTORED: Return test results
  const handleRunTests = async () => {
    console.log('Running testcases...', files);
    if (Object.keys(files).length === 0) return null;

    try {
      setCodeOutput('⏳ Running testcases...');

      // Create a temporary files object with test runner main.cpp
      const testFiles = { ...files };

      // Rename test_runner_main.cpp to main.cpp for compilation
      testFiles['main.cpp'] = {
        name: 'main.cpp',
        language: 'cpp',
        value: files['test_runner_main.cpp'].value,
      };
      delete testFiles['test_runner_main.cpp'];

      // Gather all source files
      const sourceFiles = Object.keys(testFiles).filter(
        name =>
          name.endsWith('.cpp') ||
          name.endsWith('.cc') ||
          name.endsWith('.cxx'),
      );

      if (sourceFiles.length === 0) {
        setCodeOutput('❌ Error: No C++ source files found!');
        return;
      }

      let combinedSource = '';

      // Add all header files
      Object.entries(testFiles).forEach(([name, file]) => {
        if (
          name.endsWith('.h') ||
          name.endsWith('.hpp') ||
          name.endsWith('.hxx')
        ) {
          combinedSource += `// ========== ${name} ==========\n${file.value}\n\n`;
        }
      });

      // Add all source files (including testcase.cpp and main.cpp)
      sourceFiles.forEach(name => {
        const content = testFiles[name].value || '';
        const cleanedContent = content.replace(
          /#include\s+["<]([^>"]*.h(?:pp)?)[">]/g,
          '// $& (already included above)',
        );
        combinedSource += `// ========== ${name} ==========\n${cleanedContent}\n\n`;
      });

      const base64Source = btoa(unescape(encodeURIComponent(combinedSource)));
      const base64Stdin = stdin ? btoa(unescape(encodeURIComponent(stdin))) : '';

      const payload = {
        language_id: 54,
        source_code: base64Source,
        stdin: base64Stdin,
        compiler_options: '-std=c++17',
      };

      const startTime = Date.now();
      const response = await axios.post(
        'https://judge0.edarete.com/submissions?base64_encoded=true&wait=true',
        payload,
        { headers: { 'Content-Type': 'application/json' } },
      );

      const endTime = Date.now();
      const totalTime = ((endTime - startTime) / 1000).toFixed(2);

      const decodeBase64 = str => {
        try {
          return str ? decodeURIComponent(escape(atob(str))) : '';
        } catch (e) {
          return str || '';
        }
      };

      let output = `🧪 Test Results\n`;
      output += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      output += `⏱️  Total Time: ${totalTime}s\n`;
      output += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

      const data = response.data;
      const rawStdout = data.stdout ? decodeBase64(data.stdout) : '';
      let testMeta = null;

      if (data.stderr) {
        output += `❌ Runtime Error:\n${decodeBase64(data.stderr)}\n`;
      } else if (data.compile_output) {
        output += `⚠️ Compilation Error:\n${decodeBase64(data.compile_output)}\n`;
      } else if (rawStdout) {
        output += `${rawStdout}\n`;
        testMeta = parseTestResults(rawStdout);
      } else {
        output += `✅ Compilation successful! (no output)\n`;
      }

      // Save latest test summary for submit payload
      const testResults = {
        compileError: !!data.compile_output,
        runtimeError: !!data.stderr,
        passed: testMeta?.passed ?? 0,
        failed: testMeta?.failed ?? (data.compile_output || data.stderr ? 1 : 0),
        tests: testMeta?.tests ?? [],
        rawOutput: rawStdout,
      };

      setLastTestResults(testResults);
      if (typeof setTestOutput === 'function') {
        setTestOutput(testResults);
      }

      setCodeOutput(output);

      // ✅ RETURN the results so they can be used immediately
      return testResults;
    } catch (err) {
      console.error('Test execution error:', err);
      setCodeOutput(`🚨 Failed to run tests.\n\n${err.message}`);
      return null;
    }
  };

  // Function to run user's custom main.cpp
  const handleCompileAndRun = async () => {
    console.log('Compiling and running user code...', files);
    if (!activeFile || Object.keys(files).length === 0) return;

    try {
      setCodeOutput('⏳ Compiling and running...');

      // Create a temporary files object excluding test-related files
      const userFiles = { ...files };
      delete userFiles['testcase.cpp'];
      delete userFiles['test_runner_main.cpp'];
      delete userFiles['catch.hpp'];

      // Check if user has created their own main.cpp
      if (!userFiles['main.cpp']) {
        setCodeOutput('❌ Error: Please create a main.cpp file to run your code!\n\nYou can create it by clicking the "+" button in the file explorer.');
        return;
      }

      const sourceFiles = Object.keys(userFiles).filter(
        name =>
          name.endsWith('.cpp') ||
          name.endsWith('.cc') ||
          name.endsWith('.cxx'),
      );

      if (sourceFiles.length === 0) {
        setCodeOutput('❌ Error: No C++ source files found!');
        return;
      }

      let combinedSource = '';

      // Add header files (user's headers only)
      Object.entries(userFiles).forEach(([name, file]) => {
        if (
          name.endsWith('.h') ||
          name.endsWith('.hpp') ||
          name.endsWith('.hxx')
        ) {
          combinedSource += `// ========== ${name} ==========\n${file.value}\n\n`;
        }
      });

      // Add source files
      sourceFiles.forEach(name => {
        const content = userFiles[name].value || '';
        const cleanedContent = content.replace(
          /#include\s+["<]([^>"]*.h(?:pp)?)[">]/g,
          '// $& (already included above)',
        );
        combinedSource += `// ========== ${name} ==========\n${cleanedContent}\n\n`;
      });

      const base64Source = btoa(unescape(encodeURIComponent(combinedSource)));
      const base64Stdin = stdin ? btoa(unescape(encodeURIComponent(stdin))) : '';

      const payload = {
        language_id: 54,
        source_code: base64Source,
        stdin: base64Stdin,
        compiler_options: '-std=c++17',
      };

      const startTime = Date.now();
      const response = await axios.post(
        'https://judge0.edarete.com/submissions?base64_encoded=true&wait=true',
        payload,
        { headers: { 'Content-Type': 'application/json' } },
      );

      const endTime = Date.now();
      const totalTime = ((endTime - startTime) / 1000).toFixed(2);

      const decodeBase64 = str => {
        try {
          return str ? decodeURIComponent(escape(atob(str))) : '';
        } catch (e) {
          return str || '';
        }
      };

      let output = `📊 Your Code Results\n`;
      output += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      output += `⏱️  Total Time: ${totalTime}s\n`;
      output += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

      const data = response.data;

      if (data.stderr) {
        output += `❌ Runtime Error:\n${decodeBase64(data.stderr)}\n`;
      } else if (data.compile_output) {
        output += `⚠️ Compilation Error:\n${decodeBase64(data.compile_output)}\n`;
      } else if (data.stdout) {
        output += `✅ Output:\n${decodeBase64(data.stdout)}\n`;
      } else {
        output += `✅ Compilation successful! (no output)\n`;
      }

      setCodeOutput(output);
    } catch (err) {
      console.error('Compilation error:', err);
      setCodeOutput(`🚨 Failed to compile or run.\n\n${err.message}`);
    }
  };

  const handleEditorRefresh = () => {
    setEditorRefreshKey(prev => prev + 1);
  };

  const handleHelp = async () => {
    if (helpStatus === 'sending' || helpStatus === 'sent') return;
    try {
      setHelpStatus('sending');
      setIsButtonDisabled(true);
      // emit help request event
      if (!isConnected) {
        console.error('Socket not connected');
        setHelpStatus('idle');
        setIsButtonDisabled(false);
        return;
      }
      emit('hand-raise', {
        timestamp: new Date().toISOString(),
        // additional data can be added here
      });
      setHelpStatus('sent');

      // Status will be updated by 'current-query' event listener
    } catch (err) {
      console.error('Help request failed', err);
      // allow retry
      setHelpStatus('idle');
      setIsButtonDisabled(false);
      if (helpTimerRef.current) {
        clearTimeout(helpTimerRef.current);
        helpTimerRef.current = null;
      }
    }
  };
  const handleQueryDone = () => {
    // Reset help status
    if (!isConnected) {
      console.error('Socket not connected');
      return;
    }
    try {
      emit('student-rating', {
        queryId: currentQueryId,
        studentRating: 5, // assuming a 5-star rating for simplicity
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Failed to mark query as done:', err);
    }
    setHelpStatus('idle');
    setIsButtonDisabled(false);
    setCurrentQueryId(null);
  };
  const handleSave = async () => {
    if (!isConnected) {
      console.error('Socket not connected');
      return;
    }

    try {
      const payload = {
        answer: JSON.stringify(files), // Stringify files object
        courseId: quizzes?.courseId || null,
        timestamp: new Date().toISOString(),
      };

      console.log('Submitting assignment with payload:', payload);
      emit('submit-answer', payload);
    } catch (err) {
      console.error('Failed to submit assignment:', err);
    }
  };
  useEffect(() => {
    if (!isLab) return; // sirf lab me auto-save

    // Auto-save har 5 min (5 * 60 * 1000 ms)
    const interval = setInterval(() => {
      console.log("💾 Auto-saving lab...");
      handleSave();
    }, 5 * 60 * 1000); // 5 min

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [isLab, files]); // files add kar sakte ho agar latest state chahiye

  const handleSubmit = async () => {
    if (!isConnected) {
      console.error('Socket not connected');
      return;
    }

    try {
      // ✅ FIX: Use lastTestResults from state, but also check if we need to run tests
      let testResults = lastTestResults;

      // If no test results exist, run tests first
      if (!testResults) {
        console.log('⚠️ No test results found, running tests before submit...');
        testResults = await handleRunTests();
      }

      // Final fallback if tests failed to run
      if (!testResults) {
        testResults = {
          compileError: false,
          runtimeError: false,
          passed: 0,
          failed: 0,
          tests: [],
          rawOutput: '',
          message: 'Tests could not be run before submission'
        };
      }

      const payload = {
        answer: JSON.stringify(files),
        courseId: quizzes?.courseId || null,
        timestamp: new Date().toISOString(),
        testResults: testResults, // ✅ Always include test results
      };

      console.log('📤 Submitting with test results:', testResults);
      console.log('📤 Full payload:', payload);

      emit('submit-answer', payload);
      emit('subComponent-completed', { courseId: quizzes?.courseId || null });
      setSelectedComponent('quiz-listing');
      if (labTimerRef <= 1) {
        showSuccessToast("Your lab was automatically submitted because the time has ended.");
      }
      else {
        showSuccessToast("Lab submitted successfully.");
      }
    } catch (err) {
      console.error('Failed to submit assignment:', err);
    }
  };
  // Format time (e.g., "50s" or "1m 2s" or "1h 2m 3s")
  const formatTime = seconds => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
    if (mins > 0) return `${mins}m ${secs}s`;
    return `${secs}s`;
  };

  // Ensure we only submit once on trigger
  const autoSubmittedRef = useRef(false);
  useEffect(() => {
    if (submitTrigger && !autoSubmittedRef.current) {
      autoSubmittedRef.current = true;
      handleSubmit();
    }
  }, [submitTrigger]);

  // Parse test results with fail header + attached details, avoid double count
  const parseTestResults = (raw) => {
    // ✅ FIX: The output is all on ONE line, not multiple lines
    // First check if there's a summary at the end
    const summaryMatch = raw.match(/Tests\s+Passed:\s+(\d+)\s+Failed:\s+(\d+)/);

    if (summaryMatch) {
      const passed = parseInt(summaryMatch[1], 10);
      const failed = parseInt(summaryMatch[2], 10);
      console.log('✅ Found summary in single-line output:', { passed, failed });

      // Also parse individual test results
      const tests = [];
      const passMatches = raw.matchAll(/\[PASS\]\s+([^\[]+?)(?=\s*\[|Tests\s+Passed:|$)/g);
      const failMatches = raw.matchAll(/\[FAIL\]\s+([^:]+):\s*([^\[]*?)(?=\s*\[|Tests\s+Passed:|$)/g);

      for (const match of passMatches) {
        tests.push({ name: match[1].trim(), status: 'pass' });
      }

      for (const match of failMatches) {
        tests.push({
          name: match[1].trim(),
          status: 'fail',
          details: match[2].trim()
        });
      }

      console.log('📊 Final test results:', { passed, failed, totalTests: tests.length });
      return { passed, failed, tests };
    }

    // ✅ FALLBACK: Old line-by-line parsing (in case format changes)
    const lines = raw.split(/\r?\n/);
    const tests = [];
    let passed = 0;
    let failed = 0;

    const passHeader = /^\[PASS\]\s+(.+)$/;
    const failHeader = /^\[FAIL\]\s+(.+):\s*$/;
    const summaryLine = /^Tests\s+Passed:\s+(\d+)\s+Failed:\s+(\d+)\s*$/;

    const isHeader = (s) => passHeader.test(s) || failHeader.test(s);

    for (let i = 0; i < lines.length;) {
      const line = lines[i];

      // Prefer summary counts if present
      const mSummary = line.match(summaryLine);
      if (mSummary) {
        passed = parseInt(mSummary[1], 10);
        failed = parseInt(mSummary[2], 10);
        console.log('✅ Found summary line:', { passed, failed });
        i++;
        continue;
      }

      const mPass = line.match(passHeader);
      if (mPass) {
        tests.push({ name: mPass[1].trim(), status: 'pass' });
        i++;
        continue;
      }

      const mFail = line.match(failHeader);
      if (mFail) {
        const name = mFail[1].trim();
        i++;
        const detailLines = [];
        while (i < lines.length && !isHeader(lines[i])) {
          if (lines[i].trim().length > 0) detailLines.push(lines[i]);
          i++;
        }
        tests.push({ name, status: 'fail', details: detailLines.join('\n') });
        continue;
      }

      i++;
    }

    // If summary was not found, compute counts from tests array
    if (passed === 0 && failed === 0) {
      passed = tests.filter(t => t.status === 'pass').length;
      failed = tests.filter(t => t.status === 'fail').length;
      console.log('⚠️ No summary found, counted from tests:', { passed, failed });
    }

    console.log('📊 Final test results:', { passed, failed, totalTests: tests.length });
    return { passed, failed, tests };
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100vh', // Use viewport height instead of 100%
          gap: 2,
          p: 2,
          boxSizing: 'border-box',
        }}
      >
        {/* Buttons + Timer */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 2,
            flexShrink: 0, // Prevent shrinking
          }}
        >
          {/* {isLab && isTimeActive && (
          <Typography
            variant="h6"
            sx={{ color: '#FF0000', fontWeight: 'bold' }}
          >
            {formatTime(time)}
          </Typography>
        )} */}
          <Box
            sx={{
              display: 'flex',
              gap: 1,
            }}
          >
            <Button
              onClick={() => {
                // Download all files individually (one file per download)
                try {
                  const names = Object.keys(files || {});
                  if (names.length === 0) return;
                  names.forEach(name => {
                    const file = files[name];
                    const content = (file && file.value) || '';
                    const blob = new Blob([content], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = name;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    URL.revokeObjectURL(url);
                  });
                  try { showSuccessToast && showSuccessToast(`Downloaded ${names.length} files`); } catch(e){}
                } catch (err) {
                  console.error('Download all failed:', err);
                }
              }}
              disabled={Object.keys(files).length === 0}
              sx={{
                backgroundColor: '#9c27b0',
                border: '1px solid #9c27b0',
                paddingY: 1,
                paddingX: 2,
                color: '#FFFFFF',
                textTransform: 'none',
                '&:hover': {
                  color: '#9c27b0',
                  borderColor: '#9c27b0',
                  backgroundColor: '#FFFFFF',
                },
              }}
            >
              Download All
            </Button>
            {isLab && (
              <Button
                onClick={handleSave}
                sx={{
                  backgroundColor: '#4C49ED',
                  border: '1px solid #4C49ED',
                  paddingY: 1,
                  paddingX: 2,
                  color: '#FFFFFF',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    color: '#4C49ED',
                    borderColor: '#4C49ED',
                    backgroundColor: '#FFFFFF',
                  },
                }}
              >
                Save {quizzes?.componentName}
              </Button>
            )}
            {isLab && (
              <Button
                onClick={() => setSubmitModalOpen(true)}
                sx={{
                  backgroundColor: '#4C49ED',
                  border: '1px solid #4C49ED',
                  paddingY: 1,
                  paddingX: 2,
                  color: '#FFFFFF',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    color: '#4C49ED',
                    borderColor: '#4C49ED',
                    backgroundColor: '#FFFFFF',
                  },
                }}
              >
                Submit {quizzes?.componentName}
              </Button>
            )}
            {isLab && (
              <Button
                onClick={
                  helpStatus === 'Someone came' ? handleQueryDone : handleHelp
                }
                disabled={
                  isButtonDisabled || isTimeActive || helpStatus === 'sent'
                }
                sx={{
                  backgroundColor: '#4C49ED',
                  border: '1px solid #4C49ED',
                  paddingY: 1,
                  paddingX: 2,
                  color: '#FFFFFF',
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                {helpStatus === 'sending'
                  ? 'Sending...'
                  : helpStatus === 'sent'
                    ? 'Help request sent'
                    : helpStatus === 'Someone came'
                      ? 'Someone came'
                      : 'Help'}
              </Button>
            )}
            <Button
              onClick={handleCompileAndRun}
              disabled={Object.keys(files).length === 0}
              sx={{
                backgroundColor: '#4C49ED',
                border: '1px solid #4C49ED',
                paddingY: 1,
                paddingX: 2,
                color: '#FFFFFF',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  color: '#4C49ED',
                  borderColor: '#4C49ED',
                  backgroundColor: '#FFFFFF',
                },
              }}
            >
              Run My Code
            </Button>
            <Button
              onClick={handleRunTests}
              disabled={Object.keys(files).length === 0}
              sx={{
                backgroundColor: '#28a745',
                border: '1px solid #28a745',
                paddingY: 1,
                paddingX: 2,
                color: '#FFFFFF',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  color: '#28a745',
                  borderColor: '#28a745',
                  backgroundColor: '#FFFFFF',
                },
              }}
            >
              Run Tests
            </Button>
            <Button
              onClick={handleEditorRefresh}
              sx={{
                backgroundColor: '#6c63ff',
                border: '1px solid #6c63ff',
                paddingY: 1,
                paddingX: 2,
                color: '#FFFFFF',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  color: '#6c63ff',
                  borderColor: '#6c63ff',
                  backgroundColor: '#FFFFFF',
                },
              }}
            >
              Reload Editor
            </Button>
          </Box>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            display: 'flex',
            flex: 1, // Take remaining space
            overflow: 'hidden', // Prevent overflow
            minHeight: 0, // Important for flex children
          }}
        >
          {/* File Explorer */}
          <Box
            sx={{
              width: isField ? 150 : 250,
              bgcolor: isField ? '#fff' : '#1e1e1e',
              color: isField ? '#000' : 'white',
              border: '1px solid #333',
              p: 1,
              overflowX: "auto"
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 1,
                borderBottom: '1px solid #333',
              }}
            >
              <Typography variant="subtitle2" color={isField ? "#000" : "white"}>
                EXPLORER
              </Typography>
              <IconButton
                size="small"
                onClick={() => {
                  setShowNewFileInput(true);
                  setFileNameError('');
                }}
                sx={{ color: isField ? '#1e1e1e' : 'white' }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
            <List dense sx={{ width: "fit-content" }}>
              {getVisibleFiles().map(fileName => (
                <ListItem
                  key={fileName}
                  // ❌ REMOVE: button
                  // ✅ ADD: component="button" and onClick
                  component="div" // Changed from button={true}
                  selected={activeFile === fileName}
                  onClick={() => {
                    setActiveFile(fileName);
                    if (!tabs.includes(fileName)) {
                      setTabs([...tabs, fileName]);
                    }
                  }}
                  sx={{
                    borderRadius: 1,
                    cursor: 'pointer', // Add cursor pointer
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      },
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    },
                  }}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      size="small"
                      onClick={e => handleDeleteFile(fileName, e)}
                      sx={{ color: isField ? '#1e1e1e' : 'rgba(255, 255, 255, 0.5)' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  }
                >
                  <ListItemIcon sx={{ minWidth: 30, color: 'inherit' }}>
                    <InsertDriveFileIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={fileName}
                    primaryTypographyProps={{
                      variant: 'body2',
                      sx: {
                        width: "fit-content",
                        minWidth: "max-content",
                        fontFamily: 'monospace',
                        color:
                          activeFile === fileName
                            ? (isField ? '#1e1e1e' : 'white')
                            : (isField ? '#1e1e1e' : 'rgba(255, 255, 255, 0.8)'),
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>

            {/* New File Input */}
            {showNewFileInput && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  mt: 1,
                  gap: 1,
                }}
              >
                <TextField
                  variant="outlined"
                  placeholder="Enter new file name"
                  value={newFileName}
                  onChange={e => setNewFileName(e.target.value)}
                  error={!!fileNameError}
                  helperText={fileNameError}
                  InputProps={{
                    sx: {
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      color: '#1e1e1e',
                      bgcolor: '#f5f5f5',
                      borderColor: '#ccc',
                      '&:hover': {
                        borderColor: '#4C49ED',
                      },
                      '&.Mui-focused': {
                        borderColor: '#4C49ED',
                        boxShadow: '0 0 0 2px rgba(76, 73, 237, 0.2)',
                      },
                    },
                  }}
                  onKeyDown={handleNewFile}
                  size="small"
                />
                <Button
                  onClick={handleNewFile}
                  variant="contained"
                  sx={{
                    bgcolor: '#4C49ED',
                    color: 'white',
                    textTransform: 'none',
                    borderRadius: 1,
                    paddingY: 1,
                    paddingX: 2,
                    '&:hover': {
                      bgcolor: '#4C49ED',
                      opacity: 0.9,
                    },
                  }}
                >
                  Create File
                </Button>
              </Box>
            )}
          </Box>

          {/* Editor + Output Console */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              bgcolor: isField ? '#fff' : '#121212',
            }}
          >
            {/* Tabs */}
            <Box
              sx={{ borderTop: 1, borderRight: 1, borderColor: isField ? '#1e1e1e' : 'divider', backgroundColor: isField ? '#fff' : '#252526' }}
            >
              <Tabs
                value={activeFile}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  minHeight: '50px',
                  overflowX: "auto",
                  '& .MuiTabs-flexContainer': {
                    overflowX: "auto",
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#0078d4',
                  },
                }}
              >
                {tabs &&
                  tabs.length > 0 &&
                  tabs.map(tabName => (
                    <Tab
                      key={tabName}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography sx={{ color: "#5c59ef", fontSize: '0.75rem' }}>
                            {tabName}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={e => {
                              e.stopPropagation();
                              handleCloseTab(tabName, e);
                            }}
                            sx={{
                              ml: 0.5,
                              '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              },
                            }}
                          >
                            <CloseIcon
                              fontSize="small"
                              sx={{ color: '#939393', fontSize: '16px' }}
                            />
                          </IconButton>
                        </Box>
                      }
                      value={tabName}
                      sx={{
                        minHeight: '36px',
                        fontSize: '0.75rem',
                        textTransform: 'none',
                        color:
                          activeFile === tabName
                            ? 'white'
                            : 'rgba(255, 255, 255, 0.7)',
                        bgcolor: activeFile === tabName ? (isField ? '#fff' : '#1e1e1e') : (isField ? '#fff' : '#2d2d2d'),
                        borderRight: '1px solid #252526',
                      }}
                    />
                  ))}
              </Tabs>
            </Box>
            {/* Editor */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                overflow: 'hidden',
                borderRight: '1px solid #333',
              }}
            >
              {activeFile ? (
                <Suspense
                  fallback={
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CircularProgress size={32} />
                    </Box>
                  }
                >
                  <Editor
                    key={`${editorRefreshKey}-${activeFile}`}
                    path={activeFile}
                    height="100%"
                    width="100%"
                    language={files[activeFile]?.language || 'cpp'}
                    theme={isField ? "light" : "vs-dark"}
                    defaultValue={files[activeFile]?.value ?? ''}
                    onChange={handleEditorChange}
                    onMount={handleEditorMount}
                    options={{
                      fontSize: 14,
                      lineHeight: 1.5,
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      tabSize: 2,
                    }}
                  />
                </Suspense>
              ) : null}
            </Box>

            {/* Output Console with Input and Output side by side */}
            <Box
              sx={{
                bgcolor: isField ? '#fff' : '#1e1e1e',
                borderTop: '1px solid #333',
                borderBottom: '1px solid #333',
                display: 'flex',
                height: '30%',
                gap: 0,
                minHeight: 200,
              }}
            >
              {/* Input Section (Left) */}
              <Box
                sx={{
                  width: '50%',
                  borderRight: '1px solid #333',
                  display: 'flex',
                  flexDirection: 'column',
                  p: 2,
                  overflow: 'hidden',
                }}
              >
                <Typography variant="subtitle2" sx={{ mb: 1, color: '#4CAF50' }}>
                  Input (stdin)
                </Typography>
                <TextField
                  multiline
                  fullWidth
                  placeholder="Enter input here..."
                  value={stdin}
                  onChange={e => setStdin(e.target.value)}
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      color: '#cccccc',
                      height: '100%',
                      alignItems: 'flex-start',
                      '& textarea': {
                        height: '100% !important',
                        overflow: 'auto !important',
                      },
                    },
                  }}
                  sx={{
                    flex: 1,
                    '& .MuiInputBase-root': {
                      height: '100%',
                    },
                  }}
                />
              </Box>

              {/* Output Section (Right) */}
              <Box
                sx={{
                  width: '50%',
                  color: '#cccccc',
                  fontFamily: 'monospace',
                  p: 2,
                  overflowY: 'auto',
                  borderRight: '1px solid #333',
                }}
              >
                <Typography variant="subtitle2" sx={{ mb: 1, color: '#4C42B7' }}>
                  Output
                </Typography>
                <pre
                  style={{
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {codeOutput || 'Compile and run to see output...'}
                </pre>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* ✅ open modal when we press on Submit */}
      {
        isLab && (
          <Modal
            open={submitModalOpen}
            onClose={() => setSubmitModalOpen(false)}
            container={() => containerRef.current}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography variant="h6" fontWeight="bold" mb={1}>
                Lab Submission
              </Typography>

              <Typography variant="body2" color="text.secondary" mb={3}>
                Are you sure you want to submit this lab?
              </Typography>

              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  onClick={() => setSubmitModalOpen(false)}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Confirm
                </Button>
              </Stack>
            </Box>
          </Modal>
        )
      }
    </>
  );
};

export default MultiCodeFileEditor;
