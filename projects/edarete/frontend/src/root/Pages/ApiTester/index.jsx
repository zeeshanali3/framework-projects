import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  Paper,
  Alert,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://192.168.6.236:5001/api/v1';

const ApiTester = () => {
  const [action, setAction] = useState('status');
  const [semesterId, setSemesterId] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [assessmentName, setAssessmentName] = useState('');
  const [githubUsername, setGithubUsername] = useState('');
  const [testFileType, setTestFileType] = useState('hidden');
  const [timeout, setTimeout] = useState('30');
  const [format, setFormat] = useState('json');
  const [jobId, setJobId] = useState('');
  const [forceRerun, setForceRerun] = useState('false');
  
  // New fields for additional actions
  const [threshold, setThreshold] = useState('80');
  const [minSimilarity, setMinSimilarity] = useState('80');
  const [sheetName, setSheetName] = useState('');
  const [tabName, setTabName] = useState('');
  const [assignmentType, setAssignmentType] = useState('individual');
  const [templateName, setTemplateName] = useState('');
  const [description, setDescription] = useState('');
  const [privateRepo, setPrivateRepo] = useState('false');
  const [sourcePath, setSourcePath] = useState('');
  const [commitMessage, setCommitMessage] = useState('');
  const [confirm, setConfirm] = useState('false');
  const [destinationPath, setDestinationPath] = useState('');
  const [templateRepo, setTemplateRepo] = useState('');
  const [deadline, setDeadline] = useState('');
  const [maxPoints, setMaxPoints] = useState('100');
  const [oldPrefix, setOldPrefix] = useState('');
  const [newPrefix, setNewPrefix] = useState('');
  
  // Workflow automation fields
  const [runBothTests, setRunBothTests] = useState('false');
  const [checkComments, setCheckComments] = useState('true');
  const [checkPlagiarism, setCheckPlagiarism] = useState('true');
  const [uploadResults, setUploadResults] = useState('false');
  const [forceReclone, setForceReclone] = useState('false');
  const [runGivenTests, setRunGivenTests] = useState('true');
  const [runHiddenTests, setRunHiddenTests] = useState('true');
  
  // File upload states
  const [hiddenTestFile, setHiddenTestFile] = useState(null);
  const [sharedTestFile, setSharedTestFile] = useState(null);
  const [makeFile, setMakeFile] = useState(null);
  const [headerFile, setHeaderFile] = useState(null);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState('');

  // Data fetching states
  const [semesters, setSemesters] = useState([]);
  const [courses, setCourses] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [repositories, setRepositories] = useState([]);
  const [loadingSemesters, setLoadingSemesters] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingAssessments, setLoadingAssessments] = useState(false);
  const [loadingRepositories, setLoadingRepositories] = useState(false);

  const actionOptions = [
    // System Actions
    { value: 'status', label: 'System Status', auth: false, category: 'System' },
    { value: 'routes', label: 'List Routes', auth: false, category: 'System' },
    
    // Semester & Assessment Management
    { value: 'list_semesters', label: 'List Semesters', auth: true, category: 'Semester' },
    { value: 'get_semester', label: 'Get Semester Details', auth: true, category: 'Semester' },
    { value: 'list_assessments', label: 'List Assessments', auth: true, category: 'Assessment' },
    
    // Test Execution
    { value: 'tests/run', label: 'Run Tests (Single Student)', auth: true, category: 'Testing' },
    { value: 'tests/run-all', label: 'Run Tests (All Students)', auth: true, category: 'Testing' },
    { value: 'tests/status', label: 'Get Test Status', auth: true, category: 'Testing' },
    { value: 'results', label: 'Get Test Results', auth: true, category: 'Testing' },
    
    // Repository Management
    { value: 'repositories', label: 'List Repositories', auth: true, category: 'Repository' },
    { value: 'repositories/clone', label: 'Clone All Repositories', auth: true, category: 'Repository' },
    { value: 'repositories/clone-one', label: 'Clone Single Repository', auth: true, category: 'Repository' },
    { value: 'repositories/clone-status', label: 'Get Clone Status', auth: true, category: 'Repository' },
    
    // Comments Checking
    { value: 'comments/check', label: 'Check Comments (All Students)', auth: true, category: 'Comments' },
    { value: 'comments/check-one', label: 'Check Comments (Single Student)', auth: true, category: 'Comments' },
    
    // Plagiarism Detection
    { value: 'plagiarism/check', label: 'Run Plagiarism Check', auth: true, category: 'Plagiarism' },
    { value: 'plagiarism/matches', label: 'Get Plagiarism Matches', auth: true, category: 'Plagiarism' },
    { value: 'plagiarism/download', label: 'Download Plagiarism Files', auth: true, category: 'Plagiarism' },
    
    // Results Upload
    { value: 'results/upload', label: 'Upload Results to Google Sheet', auth: true, category: 'Results' },
    { value: 'results/upload-one', label: 'Upload Single Student Result', auth: true, category: 'Results' },
    
    // Documentation Generation
    { value: 'docs/generate', label: 'Generate Student Manuals', auth: true, category: 'Documentation' },
    { value: 'docs/mark', label: 'Mark Generated Manuals', auth: true, category: 'Documentation' },
    { value: 'docs/rename', label: 'Rename Lab Prefixes', auth: true, category: 'Documentation' },
    { value: 'docs/generate-complete', label: 'Generate Complete Lab Manual', auth: true, category: 'Documentation' },
    
    // Template Management
    { value: 'templates/create', label: 'Create Repository Template', auth: true, category: 'Templates' },
    { value: 'templates/update', label: 'Update Repository Template', auth: true, category: 'Templates' },
    { value: 'templates/delete', label: 'Delete Repository Template', auth: true, category: 'Templates' },
    { value: 'templates/download', label: 'Download Repository Template', auth: true, category: 'Templates' },
    
    // Assignment Creation
    { value: 'assignments/create', label: 'Create GitHub Assignment', auth: true, category: 'Assignments' },
    
    // Local Structure
    { value: 'structure/create', label: 'Create Local Structure', auth: true, category: 'Structure' },
    
    // Workflow Automation
    { value: 'workflow/complete', label: 'Complete Workflow (Entire Class)', auth: true, category: 'Workflow' },
    { value: 'student/complete', label: 'Complete Workflow (Single Student)', auth: true, category: 'Workflow' }
  ];

  const requiresAuth = actionOptions.find(opt => opt.value === action)?.auth || false;

  // Clear form when action changes
  React.useEffect(() => {
    setSemesterId('');
    setCourseCode('');
    setAssessmentName('');
    setGithubUsername('');
    setJobId('');
    setThreshold('80');
    setMinSimilarity('80');
    setSheetName('');
    setTabName('');
    setAssignmentType('individual');
    setTemplateName('');
    setDescription('');
    setPrivateRepo('false');
    setSourcePath('');
    setCommitMessage('');
    setConfirm('false');
    setDestinationPath('');
    setTemplateRepo('');
    setDeadline('');
    setMaxPoints('100');
    setOldPrefix('');
    setNewPrefix('');
    setRunBothTests('false');
    setCheckComments('true');
    setCheckPlagiarism('true');
    setUploadResults('false');
    setForceReclone('false');
    setRunGivenTests('true');
    setRunHiddenTests('true');
    setResponse(null);
    setError(null);
    setSemesters([]);
    setCourses([]);
    setAssessments([]);
    setRepositories([]);
  }, [action]);

  // Fetch semesters
  const fetchSemesters = async () => {
    if (!apiKey) {
      setError({ message: 'API Key required to fetch semesters' });
      return;
    }
    
    setLoadingSemesters(true);
    try {
      const res = await fetch(`${API_BASE_URL}/semesters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ action: 'list_semesters' })
      });

      const data = await res.json();
      if (res.ok && data.semesters) {
        setSemesters(data.semesters);
      } else {
        setError(data.error || { message: 'Failed to fetch semesters' });
      }
    } catch (err) {
      setError({ message: err.message || 'Failed to fetch semesters' });
    } finally {
      setLoadingSemesters(false);
    }
  };

  // Fetch courses for selected semester
  const fetchCourses = async (selectedSemesterId) => {
    if (!apiKey || !selectedSemesterId) return;
    
    setLoadingCourses(true);
    try {
      const res = await fetch(`${API_BASE_URL}/semesters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ 
          action: 'get_semester',
          semester_id: selectedSemesterId
        })
      });

      const data = await res.json();
      if (res.ok && data.courses) {
        setCourses(data.courses);
      } else {
        setError(data.error || { message: 'Failed to fetch courses' });
      }
    } catch (err) {
      setError({ message: err.message || 'Failed to fetch courses' });
    } finally {
      setLoadingCourses(false);
    }
  };

  // Fetch assessments for selected course
  const fetchAssessments = async (selectedSemesterId, selectedCourseCode) => {
    if (!apiKey || !selectedSemesterId || !selectedCourseCode) return;
    
    setLoadingAssessments(true);
    try {
      const res = await fetch(`${API_BASE_URL}/semesters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ 
          action: 'list_assessments',
          semester_id: selectedSemesterId,
          course_code: selectedCourseCode
        })
      });

      const data = await res.json();
      if (res.ok && data.assessments) {
        setAssessments(data.assessments);
      } else {
        setError(data.error || { message: 'Failed to fetch assessments' });
      }
    } catch (err) {
      setError({ message: err.message || 'Failed to fetch assessments' });
    } finally {
      setLoadingAssessments(false);
    }
  };

  // Fetch repositories (GitHub usernames)
  const fetchRepositories = async (selectedSemesterId, selectedCourseCode, selectedAssessment) => {
    if (!apiKey || !selectedSemesterId || !selectedCourseCode || !selectedAssessment) return;
    
    setLoadingRepositories(true);
    try {
      const res = await fetch(`${API_BASE_URL}/semesters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ 
          action: 'repositories',
          semester_id: selectedSemesterId,
          course_code: selectedCourseCode,
          assessment_name: selectedAssessment
        })
      });

      const data = await res.json();
      if (res.ok && data.repositories) {
        setRepositories(data.repositories);
      } else {
        setError(data.error || { message: 'Failed to fetch repositories' });
      }
    } catch (err) {
      setError({ message: err.message || 'Failed to fetch repositories' });
    } finally {
      setLoadingRepositories(false);
    }
  };

  // Auto-fetch courses when semester changes
  React.useEffect(() => {
    if (semesterId && apiKey) {
      fetchCourses(semesterId);
      setCourseCode('');
      setAssessmentName('');
      setGithubUsername('');
    }
  }, [semesterId]);

  // Auto-fetch assessments when course changes
  React.useEffect(() => {
    if (semesterId && courseCode && apiKey) {
      fetchAssessments(semesterId, courseCode);
      setAssessmentName('');
      setGithubUsername('');
    }
  }, [courseCode]);

  // Auto-fetch repositories when assessment changes
  React.useEffect(() => {
    if (semesterId && courseCode && assessmentName && apiKey && action === 'tests/run') {
      fetchRepositories(semesterId, courseCode, assessmentName);
    }
  }, [assessmentName]);

  const buildRequestBody = () => {
    const body = { action };

    // Semester Management
    if (action === 'get_semester' && semesterId) {
      body.semester_id = semesterId;
    }

    if (action === 'list_assessments') {
      if (semesterId) body.semester_id = semesterId;
      if (courseCode) body.course_code = courseCode;
    }

    // Test Execution
    if (action === 'tests/run') {
      if (semesterId) body.semester_id = semesterId;
      if (courseCode) body.course_code = courseCode;
      if (assessmentName) body.assessment_name = assessmentName;
      if (githubUsername) body.github_username = githubUsername;
      if (testFileType) body.test_file_type = testFileType;
      if (timeout) body.timeout = parseInt(timeout);
    }

    if (action === 'tests/run-all') {
      if (semesterId) body.semester_id = semesterId;
      if (courseCode) body.course_code = courseCode;
      if (assessmentName) body.assessment_name = assessmentName;
      if (testFileType) body.test_file_type = testFileType;
      if (timeout) body.timeout = parseInt(timeout);
      if (forceRerun) body.force_rerun = forceRerun === 'true';
    }

    if (action === 'tests/status') {
      if (semesterId) body.semester_id = semesterId;
      if (courseCode) body.course_code = courseCode;
      if (assessmentName) body.assessment_name = assessmentName;
      if (jobId) body.job_id = jobId;
    }

    if (action === 'results') {
      if (semesterId) body.semester_id = semesterId;
      if (courseCode) body.course_code = courseCode;
      if (assessmentName) body.assessment_name = assessmentName;
      if (githubUsername) body.github_username = githubUsername;
      if (format) body.format = format;
    }

    // Repository Management
    if (action === 'repositories') {
      if (semesterId) body.semester_id = semesterId;
      if (courseCode) body.course_code = courseCode;
      if (assessmentName) body.assessment_name = assessmentName;
    }

    if (action === 'repositories/clone') {
      if (semesterId) body.semester_id = semesterId;
      if (courseCode) body.course_code = courseCode;
      if (assessmentName) body.assessment_name = assessmentName;
      if (forceRerun) body.force_reclone = forceRerun === 'true';
    }

    if (action === 'repositories/clone-one') {
      if (semesterId) body.semester_id = semesterId;
      if (courseCode) body.course_code = courseCode;
      if (assessmentName) body.assessment_name = assessmentName;
      if (githubUsername) body.github_username = githubUsername;
      if (forceRerun) body.force_reclone = forceRerun === 'true';
    }

    if (action === 'repositories/clone-status') {
      if (jobId) body.job_id = jobId;
    }

    // Comments Checking
    if (action === 'comments/check') {
      if (semesterId) body.semester_id = semesterId;
      if (courseCode) body.course_code = courseCode;
      if (assessmentName) body.assessment_name = assessmentName;
    }

    if (action === 'comments/check-one') {
      if (semesterId) body.semester_id = semesterId;
      if (courseCode) body.course_code = courseCode;
      if (assessmentName) body.assessment_name = assessmentName;
      if (githubUsername) body.github_username = githubUsername;
    }

    // Plagiarism Detection
    if (action === 'plagiarism/check') {
      if (semesterId) body.semester_id = semesterId;
      if (courseCode) body.course_code = courseCode;
      if (assessmentName) body.assessment_name = assessmentName;
      if (threshold) body.threshold = parseInt(threshold);
    }

    if (action === 'plagiarism/matches') {
      if (semesterId) body.semester_id = semesterId;
      if (courseCode) body.course_code = courseCode;
      if (assessmentName) body.assessment_name = assessmentName;
      if (minSimilarity) body.min_similarity = parseInt(minSimilarity);
    }

    if (action === 'plagiarism/download') {
      if (semesterId) body.semester_id = semesterId;
      if (courseCode) body.course_code = courseCode;
      if (assessmentName) body.assessment_name = assessmentName;
    }

    // Results Upload
    if (action === 'results/upload') {
      if (semesterId) body.semester_id = semesterId;
      if (courseCode) body.course_code = courseCode;
      if (assessmentName) body.assessment_name = assessmentName;
      if (sheetName) body.sheet_name = sheetName;
      if (tabName) body.tab_name = tabName;
    }

    if (action === 'results/upload-one') {
      if (semesterId) body.semester_id = semesterId;
      if (courseCode) body.course_code = courseCode;
      if (assessmentName) body.assessment_name = assessmentName;
      if (githubUsername) body.github_username = githubUsername;
      if (sheetName) body.sheet_name = sheetName;
      if (tabName) body.tab_name = tabName;
    }

    // Documentation Generation
    if (action === 'docs/generate') {
      if (semesterId) body.semester_id = semesterId;
      if (courseCode) body.course_code = courseCode;
      if (assessmentName) body.assessment_name = assessmentName;
      if (assignmentType) body.assignment_type = assignmentType;
    }

    if (action === 'docs/mark') {
      if (semesterId) body.semester_id = semesterId;
      if (courseCode) body.course_code = courseCode;
      if (assessmentName) body.assessment_name = assessmentName;
      if (assignmentType) body.assignment_type = assignmentType;
    }

    if (action === 'docs/rename') {
      if (semesterId) body.semester_id = semesterId;
      if (courseCode) body.course_code = courseCode;
      if (oldPrefix) body.old_prefix = oldPrefix;
      if (newPrefix) body.new_prefix = newPrefix;
    }

    if (action === 'docs/generate-complete') {
      if (semesterId) body.semester_id = semesterId;
      if (courseCode) body.course_code = courseCode;
    }

    // Template Management
    if (action === 'templates/create') {
      if (templateName) body.template_name = templateName;
      if (description) body.description = description;
      if (privateRepo) body.private = privateRepo === 'true';
      if (sourcePath) body.source_path = sourcePath;
    }

    if (action === 'templates/update') {
      if (templateName) body.template_name = templateName;
      if (sourcePath) body.source_path = sourcePath;
      if (commitMessage) body.commit_message = commitMessage;
    }

    if (action === 'templates/delete') {
      if (templateName) body.template_name = templateName;
      if (confirm) body.confirm = confirm === 'true';
    }

    if (action === 'templates/download') {
      if (templateName) body.template_name = templateName;
      if (destinationPath) body.destination_path = destinationPath;
    }

    // Assignment Creation
    if (action === 'assignments/create') {
      if (semesterId) body.semester_id = semesterId;
      if (courseCode) body.course_code = courseCode;
      if (assessmentName) body.assessment_name = assessmentName;
      if (templateRepo) body.template_repo = templateRepo;
      if (deadline) body.deadline = deadline;
      if (assignmentType) body.assignment_type = assignmentType;
      if (maxPoints) body.max_points = parseInt(maxPoints);
    }

    // Local Structure
    if (action === 'structure/create') {
      if (semesterId) body.semester_id = semesterId;
      if (courseCode) body.course_code = courseCode;
    }

    // Workflow Automation
    if (action === 'workflow/complete') {
      if (semesterId) body.semester_id = semesterId;
      if (courseCode) body.course_code = courseCode;
      if (assessmentName) body.assessment_name = assessmentName;
      if (testFileType) body.test_file_type = testFileType;
      if (runBothTests) body.run_both_tests = runBothTests === 'true';
      if (checkComments) body.check_comments = checkComments === 'true';
      if (checkPlagiarism) body.check_plagiarism = checkPlagiarism === 'true';
      if (uploadResults) body.upload_results = uploadResults === 'true';
      if (forceReclone) body.force_reclone = forceReclone === 'true';
      if (forceRerun) body.force_rerun = forceRerun === 'true';
    }

    if (action === 'student/complete') {
      if (semesterId) body.semester_id = semesterId;
      if (courseCode) body.course_code = courseCode;
      if (assessmentName) body.assessment_name = assessmentName;
      if (githubUsername) body.github_username = githubUsername;
      if (runGivenTests) body.run_given_tests = runGivenTests === 'true';
      if (runHiddenTests) body.run_hidden_tests = runHiddenTests === 'true';
      if (checkComments) body.check_comments = checkComments === 'true';
      if (checkPlagiarism) body.check_plagiarism = checkPlagiarism === 'true';
      if (forceReclone) body.force_reclone = forceReclone === 'true';
    }

    return body;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const requestBody = buildRequestBody();
      
      // Check if we need to upload files (for workflow actions with test files)
      const needsFileUpload = (action === 'workflow/complete' || action === 'student/complete') && 
                              (hiddenTestFile || sharedTestFile || makeFile || headerFile);
      
      if (needsFileUpload) {
        // Use FormData for file upload
        const formData = new FormData();
        
        // Add all request body fields
        Object.keys(requestBody).forEach(key => {
          formData.append(key, requestBody[key]);
        });
        
        // Add files if present - use actual filename as form field name
        if (hiddenTestFile) {
          formData.append(hiddenTestFile.name, hiddenTestFile);
        }
        if (sharedTestFile) {
          formData.append(sharedTestFile.name, sharedTestFile);
        }
        if (makeFile) {
          formData.append(makeFile.name, makeFile);
        }
        if (headerFile) {
          formData.append(headerFile.name, headerFile);
        }
        
        const headers = {};
        if (requiresAuth && apiKey) {
          headers['Authorization'] = `Bearer ${apiKey}`;
        }
        // Don't set Content-Type for FormData - browser will set it with boundary
        
        const res = await fetch(`${API_BASE_URL}/semesters`, {
          method: 'POST',
          headers,
          body: formData
        });

        const data = await res.json();

        if (res.ok) {
          setResponse(data);
        } else {
          setError(data.error || { message: 'Unknown error occurred' });
        }
      } else {
        // Regular JSON request
        const headers = {
          'Content-Type': 'application/json'
        };

        if (requiresAuth && apiKey) {
          headers['Authorization'] = `Bearer ${apiKey}`;
        }

        const res = await fetch(`${API_BASE_URL}/semesters`, {
          method: 'POST',
          headers,
          body: JSON.stringify(requestBody)
        });

        const data = await res.json();

        if (res.ok) {
          setResponse(data);
        } else {
          setError(data.error || { message: 'Unknown error occurred' });
        }
      }
    } catch (err) {
      setError({ message: err.message || 'Network error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response, null, 2));
    }
  };

  // Helper function to detect file-related content in response
  const hasDownloadableContent = (data) => {
    if (!data) return null;
    
    // Check for download_url
    if (data.download_url) {
      return {
        type: 'download',
        url: data.download_url,
        fileName: data.download_url.split('/').pop(),
        fileSize: data.file_size,
        expiresAt: data.expires_at
      };
    }
    
    // Check for output_file (PDF, etc.)
    if (data.output_file) {
      return {
        type: 'file',
        path: data.output_file,
        fileName: data.output_file.split('/').pop(),
        fileSize: data.file_size
      };
    }
    
    // Check for sheet_url (Google Sheets)
    if (data.sheet_url) {
      return {
        type: 'sheet',
        url: data.sheet_url,
        tabName: data.tab_name
      };
    }

    // Check for repository_url (GitHub)
    if (data.repository_url) {
      return {
        type: 'repository',
        url: data.repository_url,
        name: data.template_name || data.repository_name
      };
    }

    // Check for assignment URLs
    if (data.assignment_url || data.invite_link) {
      return {
        type: 'assignment',
        assignmentUrl: data.assignment_url,
        inviteLink: data.invite_link
      };
    }

    return null;
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size';
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };

  const handleDownload = (url) => {
    window.open(url, '_blank');
  };

  const handleFileUpload = (event, fileType) => {
    const file = event.target.files[0];
    if (file) {
      if (fileType === 'hidden') {
        setHiddenTestFile(file);
      } else if (fileType === 'shared') {
        setSharedTestFile(file);
      } else if (fileType === 'makefile') {
        setMakeFile(file);
      } else if (fileType === 'header') {
        setHeaderFile(file);
      }
    }
  };

  const handleRemoveFile = (fileType) => {
    if (fileType === 'hidden') {
      setHiddenTestFile(null);
    } else if (fileType === 'shared') {
      setSharedTestFile(null);
    } else if (fileType === 'makefile') {
      setMakeFile(null);
    } else if (fileType === 'header') {
      setHeaderFile(null);
    }
  };

  const renderFileInfo = (fileInfo) => {
    if (!fileInfo) return null;

    return (
      <Box sx={{ mb: 2 }}>
        <Alert severity="success" sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {fileInfo.type === 'download' && <DownloadIcon />}
              {fileInfo.type === 'file' && <InsertDriveFileIcon />}
              {fileInfo.type === 'sheet' && <FolderIcon />}
              {fileInfo.type === 'repository' && <FolderIcon />}
              {fileInfo.type === 'assignment' && <InsertDriveFileIcon />}
              
              <Box>
                {fileInfo.type === 'download' && (
                  <>
                    <Typography variant="subtitle2" fontWeight="600">
                      Download Available
                    </Typography>
                    <Typography variant="body2">
                      {fileInfo.fileName} ({formatFileSize(fileInfo.fileSize)})
                    </Typography>
                    {fileInfo.expiresAt && (
                      <Typography variant="caption" color="text.secondary">
                        Expires: {new Date(fileInfo.expiresAt).toLocaleString()}
                      </Typography>
                    )}
                  </>
                )}
                
                {fileInfo.type === 'file' && (
                  <>
                    <Typography variant="subtitle2" fontWeight="600">
                      File Generated
                    </Typography>
                    <Typography variant="body2">
                      {fileInfo.fileName} ({formatFileSize(fileInfo.fileSize)})
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Path: {fileInfo.path}
                    </Typography>
                  </>
                )}
                
                {fileInfo.type === 'sheet' && (
                  <>
                    <Typography variant="subtitle2" fontWeight="600">
                      Google Sheet Updated
                    </Typography>
                    <Typography variant="body2">
                      Tab: {fileInfo.tabName}
                    </Typography>
                  </>
                )}
                
                {fileInfo.type === 'repository' && (
                  <>
                    <Typography variant="subtitle2" fontWeight="600">
                      Repository Created
                    </Typography>
                    <Typography variant="body2">
                      {fileInfo.name}
                    </Typography>
                  </>
                )}
                
                {fileInfo.type === 'assignment' && (
                  <>
                    <Typography variant="subtitle2" fontWeight="600">
                      GitHub Assignment Created
                    </Typography>
                    <Typography variant="body2">
                      Assignment and invitation links available
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              {(fileInfo.type === 'download' || fileInfo.type === 'sheet' || 
                fileInfo.type === 'repository') && fileInfo.url && (
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<DownloadIcon />}
                  onClick={() => handleDownload(fileInfo.url)}
                >
                  Open
                </Button>
              )}
              
              {fileInfo.type === 'assignment' && (
                <>
                  {fileInfo.assignmentUrl && (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleDownload(fileInfo.assignmentUrl)}
                    >
                      View Assignment
                    </Button>
                  )}
                  {fileInfo.inviteLink && (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleDownload(fileInfo.inviteLink)}
                    >
                      Invite Link
                    </Button>
                  )}
                </>
              )}
            </Box>
          </Box>
        </Alert>
      </Box>
    );
  };

  const handleClearForm = () => {
    setSemesterId('');
    setCourseCode('');
    setAssessmentName('');
    setGithubUsername('');
    setTestFileType('hidden');
    setTimeout('30');
    setFormat('json');
    setJobId('');
    setForceRerun('false');
    setThreshold('80');
    setMinSimilarity('80');
    setSheetName('');
    setTabName('');
    setRunBothTests('false');
    setCheckComments('true');
    setCheckPlagiarism('true');
    setUploadResults('false');
    setForceReclone('false');
    setRunGivenTests('true');
    setRunHiddenTests('true');
    setHiddenTestFile(null);
    setSharedTestFile(null);
    setMakeFile(null);
    setHeaderFile(null);
    setResponse(null);
    setError(null);
  };

  const renderFormFields = () => {
    switch (action) {
      case 'get_semester':
        return (
          <>
            <TextField
              select
              fullWidth
              label="Semester ID"
              value={semesterId}
              onChange={(e) => setSemesterId(e.target.value)}
              SelectProps={{
                onOpen: () => {
                  if (semesters.length === 0 && !loadingSemesters && apiKey) {
                    fetchSemesters();
                  }
                }
              }}
              margin="normal"
              helperText={loadingSemesters ? "Loading semesters..." : "Click to load semesters"}
            >
              {semesters.map((sem) => (
                <MenuItem key={sem.id} value={sem.id}>
                  {sem.name} ({sem.status})
                </MenuItem>
              ))}
            </TextField>
          </>
        );

      case 'list_assessments':
        return (
          <>
            <TextField
              select
              fullWidth
              label="Semester ID"
              value={semesterId}
              onChange={(e) => setSemesterId(e.target.value)}
              SelectProps={{
                onOpen: () => {
                  if (semesters.length === 0 && !loadingSemesters && apiKey) {
                    fetchSemesters();
                  }
                }
              }}
              margin="normal"
              required
              helperText={loadingSemesters ? "Loading semesters..." : "Click to load semesters"}
            >
              {semesters.map((sem) => (
                <MenuItem key={sem.id} value={sem.id}>
                  {sem.name} ({sem.status})
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="Course Code"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              margin="normal"
              required
              disabled={!semesterId}
              helperText={!semesterId ? "Select semester first" : loadingCourses ? "Loading courses..." : "Select a course"}
            >
              {courses.map((course) => (
                <MenuItem key={course.code} value={course.code}>
                  {course.code} - {course.subject}
                </MenuItem>
              ))}
            </TextField>
          </>
        );

      case 'tests/run':
        return (
          <>
            <TextField
              select
              fullWidth
              label="Semester ID"
              value={semesterId}
              onChange={(e) => setSemesterId(e.target.value)}
              SelectProps={{
                onOpen: () => {
                  if (semesters.length === 0 && !loadingSemesters && apiKey) {
                    fetchSemesters();
                  }
                }
              }}
              margin="normal"
              required
              helperText={loadingSemesters ? "Loading semesters..." : "Click to load semesters"}
            >
              {semesters.map((sem) => (
                <MenuItem key={sem.id} value={sem.id}>
                  {sem.name} ({sem.status})
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="Course Code"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              margin="normal"
              required
              disabled={!semesterId}
              helperText={!semesterId ? "Select semester first" : loadingCourses ? "Loading courses..." : "Select a course"}
            >
              {courses.map((course) => (
                <MenuItem key={course.code} value={course.code}>
                  {course.code} - {course.subject}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="Assessment Name"
              value={assessmentName}
              onChange={(e) => setAssessmentName(e.target.value)}
              margin="normal"
              required
              disabled={!courseCode}
              helperText={!courseCode ? "Select course first" : loadingAssessments ? "Loading assessments..." : "Select an assessment"}
            >
              {assessments?.labs?.map((assessment) => (
                <MenuItem key={assessment.name} value={assessment.name}>
                  {assessment.name} ({assessment.student_count} students)
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="GitHub Username"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              placeholder="e.g., BSSE24067"
              margin="normal"
              required
              disabled={!assessmentName}
              helperText={!assessmentName ? "Select assessment first" : "Enter student's GitHub username"}
            />
            <TextField
              select
              fullWidth
              label="Test File Type"
              value={testFileType}
              onChange={(e) => setTestFileType(e.target.value)}
              margin="normal"
            >
              <MenuItem value="hidden">Hidden</MenuItem>
              <MenuItem value="shared">Shared</MenuItem>
              <MenuItem value="sample">Sample</MenuItem>
            </TextField>
            <TextField
              fullWidth
              type="number"
              label="Timeout (seconds)"
              value={timeout}
              onChange={(e) => setTimeout(e.target.value)}
              margin="normal"
            />
          </>
        );

      case 'tests/run-all':
        return (
          <>
            <TextField
              select
              fullWidth
              label="Semester ID"
              value={semesterId}
              onChange={(e) => setSemesterId(e.target.value)}
              SelectProps={{
                onOpen: () => {
                  if (semesters.length === 0 && !loadingSemesters && apiKey) {
                    fetchSemesters();
                  }
                }
              }}
              margin="normal"
              required
              helperText={loadingSemesters ? "Loading semesters..." : "Click to load semesters"}
            >
              {semesters.map((sem) => (
                <MenuItem key={sem.id} value={sem.id}>
                  {sem.name} ({sem.status})
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="Course Code"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              margin="normal"
              required
              disabled={!semesterId}
              helperText={!semesterId ? "Select semester first" : loadingCourses ? "Loading courses..." : "Select a course"}
            >
              {courses.map((course) => (
                <MenuItem key={course.code} value={course.code}>
                  {course.code} - {course.subject}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="Assessment Name"
              value={assessmentName}
              onChange={(e) => setAssessmentName(e.target.value)}
              margin="normal"
              required
              disabled={!courseCode}
              helperText={!courseCode ? "Select course first" : loadingAssessments ? "Loading assessments..." : "Select an assessment"}
            >
              {assessments?.labs?.map((assessment) => (
                <MenuItem key={assessment.name} value={assessment.name}>
                  {assessment.name} ({assessment.student_count} students)
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="Test File Type"
              value={testFileType}
              onChange={(e) => setTestFileType(e.target.value)}
              margin="normal"
            >
              <MenuItem value="hidden">Hidden</MenuItem>
              <MenuItem value="shared">Shared</MenuItem>
              <MenuItem value="sample">Sample</MenuItem>
            </TextField>
            <TextField
              fullWidth
              type="number"
              label="Timeout (seconds)"
              value={timeout}
              onChange={(e) => setTimeout(e.target.value)}
              margin="normal"
            />
            <TextField
              select
              fullWidth
              label="Force Rerun"
              value={forceRerun}
              onChange={(e) => setForceRerun(e.target.value)}
              margin="normal"
            >
              <MenuItem value="false">False</MenuItem>
              <MenuItem value="true">True</MenuItem>
            </TextField>
          </>
        );

      case 'tests/status':
        return (
          <>
            <TextField
              select
              fullWidth
              label="Semester ID"
              value={semesterId}
              onChange={(e) => setSemesterId(e.target.value)}
              SelectProps={{
                onOpen: () => {
                  if (semesters.length === 0 && !loadingSemesters && apiKey) {
                    fetchSemesters();
                  }
                }
              }}
              margin="normal"
              required
              helperText={loadingSemesters ? "Loading semesters..." : "Click to load semesters"}
            >
              {semesters.map((sem) => (
                <MenuItem key={sem.id} value={sem.id}>
                  {sem.name} ({sem.status})
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="Course Code"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              margin="normal"
              required
              disabled={!semesterId}
              helperText={!semesterId ? "Select semester first" : loadingCourses ? "Loading courses..." : "Select a course"}
            >
              {courses.map((course) => (
                <MenuItem key={course.code} value={course.code}>
                  {course.code} - {course.subject}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="Assessment Name"
              value={assessmentName}
              onChange={(e) => setAssessmentName(e.target.value)}
              margin="normal"
              required
              disabled={!courseCode}
              helperText={!courseCode ? "Select course first" : loadingAssessments ? "Loading assessments..." : "Select an assessment"}
            >
              {assessments?.labs?.map((assessment) => (
                <MenuItem key={assessment.name} value={assessment.name}>
                  {assessment.name} ({assessment.student_count} students)
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Job ID"
              value={jobId}
              onChange={(e) => setJobId(e.target.value)}
              placeholder="e.g., job_20251212103000"
              margin="normal"
              required
            />
          </>
        );

      case 'results':
        return (
          <>
            <TextField
              select
              fullWidth
              label="Semester ID"
              value={semesterId}
              onChange={(e) => setSemesterId(e.target.value)}
              SelectProps={{
                onOpen: () => {
                  if (semesters.length === 0 && !loadingSemesters && apiKey) {
                    fetchSemesters();
                  }
                }
              }}
              margin="normal"
              required
              helperText={loadingSemesters ? "Loading semesters..." : "Click to load semesters"}
            >
              {semesters.map((sem) => (
                <MenuItem key={sem.id} value={sem.id}>
                  {sem.name} ({sem.status})
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="Course Code"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              margin="normal"
              required
              disabled={!semesterId}
              helperText={!semesterId ? "Select semester first" : loadingCourses ? "Loading courses..." : "Select a course"}
            >
              {courses.map((course) => (
                <MenuItem key={course.code} value={course.code}>
                  {course.code} - {course.subject}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="Assessment Name"
              value={assessmentName}
              onChange={(e) => setAssessmentName(e.target.value)}
              margin="normal"
              required
              disabled={!courseCode}
              helperText={!courseCode ? "Select course first" : loadingAssessments ? "Loading assessments..." : "Select an assessment"}
            >
              {assessments?.labs?.map((assessment) => (
                <MenuItem key={assessment.name} value={assessment.name}>
                  {assessment.name} ({assessment.student_count} students)
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="GitHub Username (Optional)"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              placeholder="Leave empty for all students"
              margin="normal"
            />
            <TextField
              select
              fullWidth
              label="Format"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              margin="normal"
            >
              <MenuItem value="json">JSON</MenuItem>
              <MenuItem value="summary">Summary</MenuItem>
            </TextField>
          </>
        );

      case 'repositories':
        return (
          <>
            <TextField
              select
              fullWidth
              label="Semester ID"
              value={semesterId}
              onChange={(e) => setSemesterId(e.target.value)}
              SelectProps={{
                onOpen: () => {
                  if (semesters.length === 0 && !loadingSemesters && apiKey) {
                    fetchSemesters();
                  }
                }
              }}
              margin="normal"
              required
              helperText={loadingSemesters ? "Loading semesters..." : "Click to load semesters"}
            >
              {semesters.map((sem) => (
                <MenuItem key={sem.id} value={sem.id}>
                  {sem.name} ({sem.status})
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="Course Code"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              margin="normal"
              required
              disabled={!semesterId}
              helperText={!semesterId ? "Select semester first" : loadingCourses ? "Loading courses..." : "Select a course"}
            >
              {courses.map((course) => (
                <MenuItem key={course.code} value={course.code}>
                  {course.code} - {course.subject}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="Assessment Name"
              value={assessmentName}
              onChange={(e) => setAssessmentName(e.target.value)}
              margin="normal"
              required
              disabled={!courseCode}
              helperText={!courseCode ? "Select course first" : loadingAssessments ? "Loading assessments..." : "Select an assessment"}
            >
              {assessments?.labs?.map((assessment) => (
                <MenuItem key={assessment.name} value={assessment.name}>
                  {assessment.name} ({assessment.student_count} students)
                </MenuItem>
              ))}
            </TextField>
          </>
        );

      // Repository Cloning
      case 'repositories/clone':
      case 'repositories/clone-one':
        return (
          <>
            <TextField select fullWidth label="Semester ID" value={semesterId} onChange={(e) => setSemesterId(e.target.value)}
              SelectProps={{ onOpen: () => { if (semesters.length === 0 && !loadingSemesters && apiKey) fetchSemesters(); }}}
              margin="normal" required helperText={loadingSemesters ? "Loading semesters..." : "Click to load semesters"}>
              {semesters.map((sem) => (<MenuItem key={sem.id} value={sem.id}>{sem.name} ({sem.status})</MenuItem>))}
            </TextField>
            <TextField select fullWidth label="Course Code" value={courseCode} onChange={(e) => setCourseCode(e.target.value)}
              margin="normal" required disabled={!semesterId} helperText={!semesterId ? "Select semester first" : loadingCourses ? "Loading courses..." : "Select a course"}>
              {courses.map((course) => (<MenuItem key={course.code} value={course.code}>{course.code} - {course.subject}</MenuItem>))}
            </TextField>
            <TextField select fullWidth label="Assessment Name" value={assessmentName} onChange={(e) => setAssessmentName(e.target.value)}
              margin="normal" required disabled={!courseCode} helperText={!courseCode ? "Select course first" : loadingAssessments ? "Loading assessments..." : "Select an assessment"}>
              {assessments?.labs?.map((assessment) => (<MenuItem key={assessment.name} value={assessment.name}>{assessment.name} ({assessment.student_count} students)</MenuItem>))}
            </TextField>
            {action === 'repositories/clone-one' && (
              <TextField fullWidth label="GitHub Username" value={githubUsername} onChange={(e) => setGithubUsername(e.target.value)}
                placeholder="e.g., BSSE24067" margin="normal" required helperText="Enter student's GitHub username" />
            )}
            <TextField select fullWidth label="Force Reclone" value={forceRerun} onChange={(e) => setForceRerun(e.target.value)} margin="normal">
              <MenuItem value="false">False</MenuItem><MenuItem value="true">True</MenuItem>
            </TextField>
          </>
        );

      case 'repositories/clone-status':
        return (
          <TextField fullWidth label="Job ID" value={jobId} onChange={(e) => setJobId(e.target.value)}
            placeholder="e.g., clone_20251212140000" margin="normal" required helperText="Enter job ID from clone response" />
        );

      // Comments Checking
      case 'comments/check':
      case 'comments/check-one':
        return (
          <>
            <TextField select fullWidth label="Semester ID" value={semesterId} onChange={(e) => setSemesterId(e.target.value)}
              SelectProps={{ onOpen: () => { if (semesters.length === 0 && !loadingSemesters && apiKey) fetchSemesters(); }}}
              margin="normal" required helperText={loadingSemesters ? "Loading semesters..." : "Click to load semesters"}>
              {semesters.map((sem) => (<MenuItem key={sem.id} value={sem.id}>{sem.name} ({sem.status})</MenuItem>))}
            </TextField>
            <TextField select fullWidth label="Course Code" value={courseCode} onChange={(e) => setCourseCode(e.target.value)}
              margin="normal" required disabled={!semesterId} helperText={!semesterId ? "Select semester first" : loadingCourses ? "Loading courses..." : "Select a course"}>
              {courses.map((course) => (<MenuItem key={course.code} value={course.code}>{course.code} - {course.subject}</MenuItem>))}
            </TextField>
            <TextField select fullWidth label="Assessment Name" value={assessmentName} onChange={(e) => setAssessmentName(e.target.value)}
              margin="normal" required disabled={!courseCode} helperText={!courseCode ? "Select course first" : loadingAssessments ? "Loading assessments..." : "Select an assessment"}>
              {assessments?.labs?.map((assessment) => (<MenuItem key={assessment.name} value={assessment.name}>{assessment.name} ({assessment.student_count} students)</MenuItem>))}
            </TextField>
            {action === 'comments/check-one' && (
              <TextField fullWidth label="GitHub Username" value={githubUsername} onChange={(e) => setGithubUsername(e.target.value)}
                placeholder="e.g., BSSE24067" margin="normal" required helperText="Enter student's GitHub username" />
            )}
          </>
        );

      // Plagiarism Detection
      case 'plagiarism/check':
        return (
          <>
            <TextField select fullWidth label="Semester ID" value={semesterId} onChange={(e) => setSemesterId(e.target.value)}
              SelectProps={{ onOpen: () => { if (semesters.length === 0 && !loadingSemesters && apiKey) fetchSemesters(); }}}
              margin="normal" required helperText={loadingSemesters ? "Loading semesters..." : "Click to load semesters"}>
              {semesters.map((sem) => (<MenuItem key={sem.id} value={sem.id}>{sem.name} ({sem.status})</MenuItem>))}
            </TextField>
            <TextField select fullWidth label="Course Code" value={courseCode} onChange={(e) => setCourseCode(e.target.value)}
              margin="normal" required disabled={!semesterId} helperText={!semesterId ? "Select semester first" : loadingCourses ? "Loading courses..." : "Select a course"}>
              {courses.map((course) => (<MenuItem key={course.code} value={course.code}>{course.code} - {course.subject}</MenuItem>))}
            </TextField>
            <TextField select fullWidth label="Assessment Name" value={assessmentName} onChange={(e) => setAssessmentName(e.target.value)}
              margin="normal" required disabled={!courseCode} helperText={!courseCode ? "Select course first" : loadingAssessments ? "Loading assessments..." : "Select an assessment"}>
              {assessments?.labs?.map((assessment) => (<MenuItem key={assessment.name} value={assessment.name}>{assessment.name} ({assessment.student_count} students)</MenuItem>))}
            </TextField>
            <TextField fullWidth type="number" label="Threshold (%)" value={threshold} onChange={(e) => setThreshold(e.target.value)}
              margin="normal" helperText="Similarity threshold percentage (default: 80)" />
          </>
        );

      case 'plagiarism/matches':
        return (
          <>
            <TextField select fullWidth label="Semester ID" value={semesterId} onChange={(e) => setSemesterId(e.target.value)}
              SelectProps={{ onOpen: () => { if (semesters.length === 0 && !loadingSemesters && apiKey) fetchSemesters(); }}}
              margin="normal" required helperText={loadingSemesters ? "Loading semesters..." : "Click to load semesters"}>
              {semesters.map((sem) => (<MenuItem key={sem.id} value={sem.id}>{sem.name} ({sem.status})</MenuItem>))}
            </TextField>
            <TextField select fullWidth label="Course Code" value={courseCode} onChange={(e) => setCourseCode(e.target.value)}
              margin="normal" required disabled={!semesterId} helperText={!semesterId ? "Select semester first" : loadingCourses ? "Loading courses..." : "Select a course"}>
              {courses.map((course) => (<MenuItem key={course.code} value={course.code}>{course.code} - {course.subject}</MenuItem>))}
            </TextField>
            <TextField select fullWidth label="Assessment Name" value={assessmentName} onChange={(e) => setAssessmentName(e.target.value)}
              margin="normal" required disabled={!courseCode} helperText={!courseCode ? "Select course first" : loadingAssessments ? "Loading assessments..." : "Select an assessment"}>
              {assessments?.labs?.map((assessment) => (<MenuItem key={assessment.name} value={assessment.name}>{assessment.name} ({assessment.student_count} students)</MenuItem>))}
            </TextField>
            <TextField fullWidth type="number" label="Min Similarity (%)" value={minSimilarity} onChange={(e) => setMinSimilarity(e.target.value)}
              margin="normal" helperText="Minimum similarity to report (default: 80)" />
          </>
        );

      case 'plagiarism/download':
        return (
          <>
            <TextField select fullWidth label="Semester ID" value={semesterId} onChange={(e) => setSemesterId(e.target.value)}
              SelectProps={{ onOpen: () => { if (semesters.length === 0 && !loadingSemesters && apiKey) fetchSemesters(); }}}
              margin="normal" required helperText={loadingSemesters ? "Loading semesters..." : "Click to load semesters"}>
              {semesters.map((sem) => (<MenuItem key={sem.id} value={sem.id}>{sem.name} ({sem.status})</MenuItem>))}
            </TextField>
            <TextField select fullWidth label="Course Code" value={courseCode} onChange={(e) => setCourseCode(e.target.value)}
              margin="normal" required disabled={!semesterId} helperText={!semesterId ? "Select semester first" : loadingCourses ? "Loading courses..." : "Select a course"}>
              {courses.map((course) => (<MenuItem key={course.code} value={course.code}>{course.code} - {course.subject}</MenuItem>))}
            </TextField>
            <TextField select fullWidth label="Assessment Name" value={assessmentName} onChange={(e) => setAssessmentName(e.target.value)}
              margin="normal" required disabled={!courseCode} helperText={!courseCode ? "Select course first" : loadingAssessments ? "Loading assessments..." : "Select an assessment"}>
              {assessments?.labs?.map((assessment) => (<MenuItem key={assessment.name} value={assessment.name}>{assessment.name} ({assessment.student_count} students)</MenuItem>))}
            </TextField>
          </>
        );

      // Results Upload
      case 'results/upload':
      case 'results/upload-one':
        return (
          <>
            <TextField select fullWidth label="Semester ID" value={semesterId} onChange={(e) => setSemesterId(e.target.value)}
              SelectProps={{ onOpen: () => { if (semesters.length === 0 && !loadingSemesters && apiKey) fetchSemesters(); }}}
              margin="normal" required helperText={loadingSemesters ? "Loading semesters..." : "Click to load semesters"}>
              {semesters.map((sem) => (<MenuItem key={sem.id} value={sem.id}>{sem.name} ({sem.status})</MenuItem>))}
            </TextField>
            <TextField select fullWidth label="Course Code" value={courseCode} onChange={(e) => setCourseCode(e.target.value)}
              margin="normal" required disabled={!semesterId} helperText={!semesterId ? "Select semester first" : loadingCourses ? "Loading courses..." : "Select a course"}>
              {courses.map((course) => (<MenuItem key={course.code} value={course.code}>{course.code} - {course.subject}</MenuItem>))}
            </TextField>
            <TextField select fullWidth label="Assessment Name" value={assessmentName} onChange={(e) => setAssessmentName(e.target.value)}
              margin="normal" required disabled={!courseCode} helperText={!courseCode ? "Select course first" : loadingAssessments ? "Loading assessments..." : "Select an assessment"}>
              {assessments?.labs?.map((assessment) => (<MenuItem key={assessment.name} value={assessment.name}>{assessment.name} ({assessment.student_count} students)</MenuItem>))}
            </TextField>
            {action === 'results/upload-one' && (
              <TextField fullWidth label="GitHub Username" value={githubUsername} onChange={(e) => setGithubUsername(e.target.value)}
                placeholder="e.g., BSSE24067" margin="normal" required helperText="Enter student's GitHub username" />
            )}
            <TextField fullWidth label="Sheet Name (Optional)" value={sheetName} onChange={(e) => setSheetName(e.target.value)}
              placeholder="e.g., Fall2025_SE200_Labs" margin="normal" helperText="Leave empty for auto-detection" />
            <TextField fullWidth label="Tab Name (Optional)" value={tabName} onChange={(e) => setTabName(e.target.value)}
              placeholder="e.g., Lab8" margin="normal" helperText="Leave empty to use assessment name" />
          </>
        );

      // Documentation Generation
      case 'docs/generate':
      case 'docs/mark':
        return (
          <>
            <TextField select fullWidth label="Semester ID" value={semesterId} onChange={(e) => setSemesterId(e.target.value)}
              SelectProps={{ onOpen: () => { if (semesters.length === 0 && !loadingSemesters && apiKey) fetchSemesters(); }}}
              margin="normal" required helperText={loadingSemesters ? "Loading semesters..." : "Click to load semesters"}>
              {semesters.map((sem) => (<MenuItem key={sem.id} value={sem.id}>{sem.name} ({sem.status})</MenuItem>))}
            </TextField>
            <TextField select fullWidth label="Course Code" value={courseCode} onChange={(e) => setCourseCode(e.target.value)}
              margin="normal" required disabled={!semesterId} helperText={!semesterId ? "Select semester first" : loadingCourses ? "Loading courses..." : "Select a course"}>
              {courses.map((course) => (<MenuItem key={course.code} value={course.code}>{course.code} - {course.subject}</MenuItem>))}
            </TextField>
            <TextField select fullWidth label="Assessment Name" value={assessmentName} onChange={(e) => setAssessmentName(e.target.value)}
              margin="normal" required disabled={!courseCode} helperText={!courseCode ? "Select course first" : loadingAssessments ? "Loading assessments..." : "Select an assessment"}>
              {assessments?.labs?.map((assessment) => (<MenuItem key={assessment.name} value={assessment.name}>{assessment.name} ({assessment.student_count} students)</MenuItem>))}
            </TextField>
            <TextField select fullWidth label="Assignment Type" value={assignmentType} onChange={(e) => setAssignmentType(e.target.value)} margin="normal" required>
              <MenuItem value="individual">Individual</MenuItem><MenuItem value="group">Group</MenuItem><MenuItem value="exam">Exam</MenuItem>
            </TextField>
          </>
        );

      case 'docs/rename':
        return (
          <>
            <TextField select fullWidth label="Semester ID" value={semesterId} onChange={(e) => setSemesterId(e.target.value)}
              SelectProps={{ onOpen: () => { if (semesters.length === 0 && !loadingSemesters && apiKey) fetchSemesters(); }}}
              margin="normal" required helperText={loadingSemesters ? "Loading semesters..." : "Click to load semesters"}>
              {semesters.map((sem) => (<MenuItem key={sem.id} value={sem.id}>{sem.name} ({sem.status})</MenuItem>))}
            </TextField>
            <TextField select fullWidth label="Course Code" value={courseCode} onChange={(e) => setCourseCode(e.target.value)}
              margin="normal" required disabled={!semesterId} helperText={!semesterId ? "Select semester first" : loadingCourses ? "Loading courses..." : "Select a course"}>
              {courses.map((course) => (<MenuItem key={course.code} value={course.code}>{course.code} - {course.subject}</MenuItem>))}
            </TextField>
            <TextField fullWidth label="Old Prefix" value={oldPrefix} onChange={(e) => setOldPrefix(e.target.value)}
              placeholder="e.g., Lab" margin="normal" required helperText="Current prefix to replace" />
            <TextField fullWidth label="New Prefix" value={newPrefix} onChange={(e) => setNewPrefix(e.target.value)}
              placeholder="e.g., Assignment" margin="normal" required helperText="New prefix to use" />
          </>
        );

      case 'docs/generate-complete':
      case 'structure/create':
        return (
          <>
            <TextField select fullWidth label="Semester ID" value={semesterId} onChange={(e) => setSemesterId(e.target.value)}
              SelectProps={{ onOpen: () => { if (semesters.length === 0 && !loadingSemesters && apiKey) fetchSemesters(); }}}
              margin="normal" required helperText={loadingSemesters ? "Loading semesters..." : "Click to load semesters"}>
              {semesters.map((sem) => (<MenuItem key={sem.id} value={sem.id}>{sem.name} ({sem.status})</MenuItem>))}
            </TextField>
            <TextField select fullWidth label="Course Code" value={courseCode} onChange={(e) => setCourseCode(e.target.value)}
              margin="normal" required disabled={!semesterId} helperText={!semesterId ? "Select semester first" : loadingCourses ? "Loading courses..." : "Select a course"}>
              {courses.map((course) => (<MenuItem key={course.code} value={course.code}>{course.code} - {course.subject}</MenuItem>))}
            </TextField>
          </>
        );

      // Template Management
      case 'templates/create':
        return (
          <>
            <TextField fullWidth label="Template Name" value={templateName} onChange={(e) => setTemplateName(e.target.value)}
              placeholder="e.g., 2025-fall-se200-lab8" margin="normal" required helperText="Name for the template repository" />
            <TextField fullWidth label="Description (Optional)" value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Lab 8 starter code" margin="normal" helperText="Repository description" />
            <TextField fullWidth label="Source Path" value={sourcePath} onChange={(e) => setSourcePath(e.target.value)}
              placeholder="e.g., templates/lab8" margin="normal" required helperText="Local path to template source code" />
            <TextField select fullWidth label="Private Repository" value={privateRepo} onChange={(e) => setPrivateRepo(e.target.value)} margin="normal">
              <MenuItem value="false">False (Public)</MenuItem><MenuItem value="true">True (Private)</MenuItem>
            </TextField>
          </>
        );

      case 'templates/update':
        return (
          <>
            <TextField fullWidth label="Template Name" value={templateName} onChange={(e) => setTemplateName(e.target.value)}
              placeholder="e.g., 2025-fall-se200-lab8" margin="normal" required helperText="Name of the template to update" />
            <TextField fullWidth label="Source Path" value={sourcePath} onChange={(e) => setSourcePath(e.target.value)}
              placeholder="e.g., templates/lab8_updated" margin="normal" required helperText="Local path to updated template source" />
            <TextField fullWidth label="Commit Message (Optional)" value={commitMessage} onChange={(e) => setCommitMessage(e.target.value)}
              placeholder="e.g., Updated starter code" margin="normal" helperText="Git commit message" />
          </>
        );

      case 'templates/delete':
        return (
          <>
            <TextField fullWidth label="Template Name" value={templateName} onChange={(e) => setTemplateName(e.target.value)}
              placeholder="e.g., 2025-fall-se200-lab8" margin="normal" required helperText="Name of the template to delete" />
            <TextField select fullWidth label="Confirm Deletion" value={confirm} onChange={(e) => setConfirm(e.target.value)} margin="normal" required>
              <MenuItem value="false">No (Cancel)</MenuItem><MenuItem value="true">Yes (Confirm Delete)</MenuItem>
            </TextField>
          </>
        );

      case 'templates/download':
        return (
          <>
            <TextField fullWidth label="Template Name" value={templateName} onChange={(e) => setTemplateName(e.target.value)}
              placeholder="e.g., 2025-fall-se200-lab8" margin="normal" required helperText="Name of the template to download" />
            <TextField fullWidth label="Destination Path (Optional)" value={destinationPath} onChange={(e) => setDestinationPath(e.target.value)}
              placeholder="e.g., templates/downloaded" margin="normal" helperText="Local path to download to" />
          </>
        );

      // Assignment Creation
      case 'assignments/create':
        return (
          <>
            <TextField select fullWidth label="Semester ID" value={semesterId} onChange={(e) => setSemesterId(e.target.value)}
              SelectProps={{ onOpen: () => { if (semesters.length === 0 && !loadingSemesters && apiKey) fetchSemesters(); }}}
              margin="normal" required helperText={loadingSemesters ? "Loading semesters..." : "Click to load semesters"}>
              {semesters.map((sem) => (<MenuItem key={sem.id} value={sem.id}>{sem.name} ({sem.status})</MenuItem>))}
            </TextField>
            <TextField select fullWidth label="Course Code" value={courseCode} onChange={(e) => setCourseCode(e.target.value)}
              margin="normal" required disabled={!semesterId} helperText={!semesterId ? "Select semester first" : loadingCourses ? "Loading courses..." : "Select a course"}>
              {courses.map((course) => (<MenuItem key={course.code} value={course.code}>{course.code} - {course.subject}</MenuItem>))}
            </TextField>
            <TextField select fullWidth label="Assessment Name" value={assessmentName} onChange={(e) => setAssessmentName(e.target.value)}
              margin="normal" required disabled={!courseCode} helperText={!courseCode ? "Select course first" : loadingAssessments ? "Loading assessments..." : "Select an assessment"}>
              {assessments?.labs?.map((assessment) => (<MenuItem key={assessment.name} value={assessment.name}>{assessment.name} ({assessment.student_count} students)</MenuItem>))}
            </TextField>
            <TextField fullWidth label="Template Repository" value={templateRepo} onChange={(e) => setTemplateRepo(e.target.value)}
              placeholder="e.g., 2025-fall-se200-lab8" margin="normal" required helperText="Template repository name" />
            <TextField fullWidth type="datetime-local" label="Deadline (Optional)" value={deadline} onChange={(e) => setDeadline(e.target.value)}
              margin="normal" helperText="Assignment deadline" InputLabelProps={{ shrink: true }} />
            <TextField select fullWidth label="Assignment Type" value={assignmentType} onChange={(e) => setAssignmentType(e.target.value)} margin="normal" required>
              <MenuItem value="individual">Individual</MenuItem><MenuItem value="group">Group</MenuItem><MenuItem value="exam">Exam</MenuItem>
            </TextField>
            <TextField fullWidth type="number" label="Max Points (Optional)" value={maxPoints} onChange={(e) => setMaxPoints(e.target.value)}
              margin="normal" helperText="Maximum points for assignment" />
          </>
        );

      // Workflow Automation
      case 'workflow/complete':
        return (
          <>
            <TextField select fullWidth label="Semester ID" value={semesterId} onChange={(e) => setSemesterId(e.target.value)}
              SelectProps={{ onOpen: () => { if (semesters.length === 0 && !loadingSemesters && apiKey) fetchSemesters(); }}}
              margin="normal" required helperText={loadingSemesters ? "Loading semesters..." : "Click to load semesters"}>
              {semesters.map((sem) => (<MenuItem key={sem.id} value={sem.id}>{sem.name} ({sem.status})</MenuItem>))}
            </TextField>
            <TextField select fullWidth label="Course Code" value={courseCode} onChange={(e) => setCourseCode(e.target.value)}
              margin="normal" required disabled={!semesterId} helperText={!semesterId ? "Select semester first" : loadingCourses ? "Loading courses..." : "Select a course"}>
              {courses.map((course) => (<MenuItem key={course.code} value={course.code}>{course.code} - {course.subject}</MenuItem>))}
            </TextField>
            <TextField select fullWidth label="Assessment Name" value={assessmentName} onChange={(e) => setAssessmentName(e.target.value)}
              margin="normal" required disabled={!courseCode} helperText={!courseCode ? "Select course first" : loadingAssessments ? "Loading assessments..." : "Select an assessment"}>
              {assessments?.labs?.map((assessment) => (<MenuItem key={assessment.name} value={assessment.name}>{assessment.name} ({assessment.student_count} students)</MenuItem>))}
            </TextField>
            
            <Divider sx={{ my: 2 }}><Chip label="Workflow Options" size="small" /></Divider>
            
            <TextField select fullWidth label="Test File Type" value={testFileType} onChange={(e) => setTestFileType(e.target.value)} margin="normal"
              helperText="Type of tests to run">
              <MenuItem value="hidden">Hidden</MenuItem><MenuItem value="shared">Shared</MenuItem>
            </TextField>
            <TextField select fullWidth label="Run Both Tests (Hidden + Shared)" value={runBothTests} onChange={(e) => setRunBothTests(e.target.value)} margin="normal"
              helperText="Run both hidden and shared tests">
              <MenuItem value="false">False</MenuItem><MenuItem value="true">True</MenuItem>
            </TextField>
            <TextField select fullWidth label="Check Comments" value={checkComments} onChange={(e) => setCheckComments(e.target.value)} margin="normal"
              helperText="Check code comments quality">
              <MenuItem value="false">False (Skip)</MenuItem><MenuItem value="true">True (Check)</MenuItem>
            </TextField>
            <TextField select fullWidth label="Check Plagiarism" value={checkPlagiarism} onChange={(e) => setCheckPlagiarism(e.target.value)} margin="normal"
              helperText="Run plagiarism detection">
              <MenuItem value="false">False (Skip)</MenuItem><MenuItem value="true">True (Check)</MenuItem>
            </TextField>
            <TextField select fullWidth label="Upload Results to Google Sheet" value={uploadResults} onChange={(e) => setUploadResults(e.target.value)} margin="normal"
              helperText="Upload results after completion">
              <MenuItem value="false">False (Don't Upload)</MenuItem><MenuItem value="true">True (Upload)</MenuItem>
            </TextField>
            <TextField select fullWidth label="Force Reclone Repositories" value={forceReclone} onChange={(e) => setForceReclone(e.target.value)} margin="normal"
              helperText="Force re-clone repositories">
              <MenuItem value="false">False</MenuItem><MenuItem value="true">True</MenuItem>
            </TextField>
            <TextField select fullWidth label="Force Rerun Tests" value={forceRerun} onChange={(e) => setForceRerun(e.target.value)} margin="normal"
              helperText="Force re-run even if results exist">
              <MenuItem value="false">False</MenuItem><MenuItem value="true">True</MenuItem>
            </TextField>
            
            <Divider sx={{ my: 2 }}><Chip label="Upload Test Files (Optional)" size="small" color="primary" /></Divider>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Upload custom test files to override existing tests
              </Typography>
              
              <Button
                variant="outlined"
                component="label"
                startIcon={<InsertDriveFileIcon />}
                fullWidth
                sx={{ mt: 1, mb: 1 }}
              >
                {hiddenTestFile ? `Hidden Test: ${hiddenTestFile.name}` : 'Upload Hidden Test File'}
                <input
                  type="file"
                  hidden
                  accept=".txt,.cpp,.h,.hpp,.c"
                  onChange={(e) => handleFileUpload(e, 'hidden')}
                />
              </Button>
              {hiddenTestFile && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Chip
                    label={`${hiddenTestFile.name} (${formatFileSize(hiddenTestFile.size)})`}
                    onDelete={() => handleRemoveFile('hidden')}
                    color="success"
                    size="small"
                  />
                </Box>
              )}
              
              {runBothTests === 'true' && (
                <>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<InsertDriveFileIcon />}
                    fullWidth
                    sx={{ mt: 1 }}
                  >
                    {sharedTestFile ? `Shared Test: ${sharedTestFile.name}` : 'Upload Shared Test File'}
                    <input
                      type="file"
                      hidden
                      accept=".txt,.cpp,.h,.hpp,.c"
                      onChange={(e) => handleFileUpload(e, 'shared')}
                    />
                  </Button>
                  {sharedTestFile && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      <Chip
                        label={`${sharedTestFile.name} (${formatFileSize(sharedTestFile.size)})`}
                        onDelete={() => handleRemoveFile('shared')}
                        color="success"
                        size="small"
                      />
                    </Box>
                  )}
                </>
              )}
              
              <Button
                variant="outlined"
                component="label"
                startIcon={<FolderIcon />}
                fullWidth
                sx={{ mt: 1 }}
              >
                {makeFile ? `Makefile: ${makeFile.name}` : 'Upload Makefile (Optional)'}
                <input
                  type="file"
                  hidden
                  accept="*"
                  onChange={(e) => handleFileUpload(e, 'makefile')}
                />
              </Button>
              {makeFile && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <Chip
                    label={`${makeFile.name} (${formatFileSize(makeFile.size)})`}
                    onDelete={() => handleRemoveFile('makefile')}
                    color="info"
                    size="small"
                  />
                </Box>
              )}
              
              <Button
                variant="outlined"
                component="label"
                startIcon={<InsertDriveFileIcon />}
                fullWidth
                sx={{ mt: 1 }}
              >
                {headerFile ? `Header: ${headerFile.name}` : 'Upload Header File (Optional)'}
                <input
                  type="file"
                  hidden
                  accept=".h,.hpp"
                  onChange={(e) => handleFileUpload(e, 'header')}
                />
              </Button>
              {headerFile && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <Chip
                    label={`${headerFile.name} (${formatFileSize(headerFile.size)})`}
                    onDelete={() => handleRemoveFile('header')}
                    color="info"
                    size="small"
                  />
                </Box>
              )}
            </Box>
          </>
        );

      case 'student/complete':
        return (
          <>
            <TextField select fullWidth label="Semester ID" value={semesterId} onChange={(e) => setSemesterId(e.target.value)}
              SelectProps={{ onOpen: () => { if (semesters.length === 0 && !loadingSemesters && apiKey) fetchSemesters(); }}}
              margin="normal" required helperText={loadingSemesters ? "Loading semesters..." : "Click to load semesters"}>
              {semesters.map((sem) => (<MenuItem key={sem.id} value={sem.id}>{sem.name} ({sem.status})</MenuItem>))}
            </TextField>
            <TextField select fullWidth label="Course Code" value={courseCode} onChange={(e) => setCourseCode(e.target.value)}
              margin="normal" required disabled={!semesterId} helperText={!semesterId ? "Select semester first" : loadingCourses ? "Loading courses..." : "Select a course"}>
              {courses.map((course) => (<MenuItem key={course.code} value={course.code}>{course.code} - {course.subject}</MenuItem>))}
            </TextField>
            <TextField select fullWidth label="Assessment Name" value={assessmentName} onChange={(e) => setAssessmentName(e.target.value)}
              margin="normal" required disabled={!courseCode} helperText={!courseCode ? "Select course first" : loadingAssessments ? "Loading assessments..." : "Select an assessment"}>
              {assessments?.labs?.map((assessment) => (<MenuItem key={assessment.name} value={assessment.name}>{assessment.name} ({assessment.student_count} students)</MenuItem>))}
            </TextField>
            <TextField fullWidth label="GitHub Username" value={githubUsername} onChange={(e) => setGithubUsername(e.target.value)}
              placeholder="e.g., BSSE24067" margin="normal" required helperText="Enter student's GitHub username" />
            
            <Divider sx={{ my: 2 }}><Chip label="Workflow Options" size="small" /></Divider>
            
            <TextField select fullWidth label="Run Given/Shared Tests" value={runGivenTests} onChange={(e) => setRunGivenTests(e.target.value)} margin="normal"
              helperText="Run shared/given tests">
              <MenuItem value="false">False (Skip)</MenuItem><MenuItem value="true">True (Run)</MenuItem>
            </TextField>
            <TextField select fullWidth label="Run Hidden Tests" value={runHiddenTests} onChange={(e) => setRunHiddenTests(e.target.value)} margin="normal"
              helperText="Run hidden tests">
              <MenuItem value="false">False (Skip)</MenuItem><MenuItem value="true">True (Run)</MenuItem>
            </TextField>
            <TextField select fullWidth label="Check Comments" value={checkComments} onChange={(e) => setCheckComments(e.target.value)} margin="normal"
              helperText="Check code comments quality">
              <MenuItem value="false">False (Skip)</MenuItem><MenuItem value="true">True (Check)</MenuItem>
            </TextField>
            <TextField select fullWidth label="Check Plagiarism" value={checkPlagiarism} onChange={(e) => setCheckPlagiarism(e.target.value)} margin="normal"
              helperText="Run plagiarism detection">
              <MenuItem value="false">False (Skip)</MenuItem><MenuItem value="true">True (Check)</MenuItem>
            </TextField>
            <TextField select fullWidth label="Force Reclone Repository" value={forceReclone} onChange={(e) => setForceReclone(e.target.value)} margin="normal"
              helperText="Force re-clone repository">
              <MenuItem value="false">False</MenuItem><MenuItem value="true">True</MenuItem>
            </TextField>
            
            <Divider sx={{ my: 2 }}><Chip label="Upload Test Files (Optional)" size="small" color="primary" /></Divider>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Upload custom test files to override existing tests
              </Typography>
              
              <Button
                variant="outlined"
                component="label"
                startIcon={<InsertDriveFileIcon />}
                fullWidth
                sx={{ mt: 1, mb: 1 }}
              >
                {hiddenTestFile ? `Hidden Test: ${hiddenTestFile.name}` : 'Upload Hidden Test File'}
                <input
                  type="file"
                  hidden
                  accept=".txt,.cpp,.h,.hpp,.c"
                  onChange={(e) => handleFileUpload(e, 'hidden')}
                />
              </Button>
              {hiddenTestFile && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Chip
                    label={`${hiddenTestFile.name} (${formatFileSize(hiddenTestFile.size)})`}
                    onDelete={() => handleRemoveFile('hidden')}
                    color="success"
                    size="small"
                  />
                </Box>
              )}
              
              {(runGivenTests === 'true' || runHiddenTests === 'true') && (
                <>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<InsertDriveFileIcon />}
                    fullWidth
                    sx={{ mt: 1 }}
                  >
                    {sharedTestFile ? `Shared Test: ${sharedTestFile.name}` : 'Upload Shared Test File'}
                    <input
                      type="file"
                      hidden
                      accept=".txt,.cpp,.h,.hpp,.c"
                      onChange={(e) => handleFileUpload(e, 'shared')}
                    />
                  </Button>
                  {sharedTestFile && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      <Chip
                        label={`${sharedTestFile.name} (${formatFileSize(sharedTestFile.size)})`}
                        onDelete={() => handleRemoveFile('shared')}
                        color="success"
                        size="small"
                      />
                    </Box>
                  )}
                </>
              )}
              
              <Button
                variant="outlined"
                component="label"
                startIcon={<FolderIcon />}
                fullWidth
                sx={{ mt: 1 }}
              >
                {makeFile ? `Makefile: ${makeFile.name}` : 'Upload Makefile (Optional)'}
                <input
                  type="file"
                  hidden
                  accept="*"
                  onChange={(e) => handleFileUpload(e, 'makefile')}
                />
              </Button>
              {makeFile && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <Chip
                    label={`${makeFile.name} (${formatFileSize(makeFile.size)})`}
                    onDelete={() => handleRemoveFile('makefile')}
                    color="info"
                    size="small"
                  />
                </Box>
              )}
              
              <Button
                variant="outlined"
                component="label"
                startIcon={<InsertDriveFileIcon />}
                fullWidth
                sx={{ mt: 1 }}
              >
                {headerFile ? `Header: ${headerFile.name}` : 'Upload Header File (Optional)'}
                <input
                  type="file"
                  hidden
                  accept=".h,.hpp"
                  onChange={(e) => handleFileUpload(e, 'header')}
                />
              </Button>
              {headerFile && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <Chip
                    label={`${headerFile.name} (${formatFileSize(headerFile.size)})`}
                    onDelete={() => handleRemoveFile('header')}
                    color="info"
                    size="small"
                  />
                </Box>
              )}
            </Box>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        API Tester
      </Typography>

      <Grid container spacing={3}>
        {/* Left Panel - Form */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Request Configuration
              </Typography>

              <TextField
                select
                fullWidth
                label="API Action"
                value={action}
                onChange={(e) => {
                  setAction(e.target.value);
                  console.log('Action changed to:', e.target.value);
                }}
                margin="normal"
                helperText="Select an API action to test"
              >
                {actionOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    {option.auth && <Chip label="Auth Required" size="small" sx={{ ml: 1 }} />}
                  </MenuItem>
                ))}
              </TextField>

              {/* Action Description */}
              <Paper sx={{ p: 2, mt: 2, bgcolor: '#f5f5f5' }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Selected Action:</strong> {actionOptions.find(opt => opt.value === action)?.label}
                  <br />
                  <strong>Category:</strong> {actionOptions.find(opt => opt.value === action)?.category}
                  <br />
                  <strong>What it does:</strong>
                  <br />
                  {action === 'status' && '• Checks if the API server is running and operational'}
                  {action === 'routes' && '• Lists all available API endpoints'}
                  {action === 'list_semesters' && '• Retrieves all available semesters'}
                  {action === 'get_semester' && '• Gets detailed information about a specific semester'}
                  {action === 'list_assessments' && '• Lists all assessments for a course'}
                  {action === 'tests/run' && '• Runs tests for a single student\'s assignment'}
                  {action === 'tests/run-all' && '• Runs tests for all students in an assessment'}
                  {action === 'tests/status' && '• Checks the status of a running test job'}
                  {action === 'results' && '• Retrieves test results for an assessment'}
                  {action === 'repositories' && '• Lists all student repositories for an assessment'}
                  {action === 'repositories/clone' && '• Clones all student repositories for an assessment'}
                  {action === 'repositories/clone-one' && '• Clones a single student\'s repository'}
                  {action === 'repositories/clone-status' && '• Checks the status of a repository cloning job'}
                  {action === 'comments/check' && '• Checks code comments quality for all students in an assessment'}
                  {action === 'comments/check-one' && '• Checks code comments quality for a single student'}
                  {action === 'plagiarism/check' && '• Runs plagiarism detection for all students in an assessment'}
                  {action === 'plagiarism/matches' && '• Retrieves plagiarism match results'}
                  {action === 'plagiarism/download' && '• Downloads plagiarism detection files as ZIP'}
                  {action === 'results/upload' && '• Uploads all student results to Google Sheets'}
                  {action === 'results/upload-one' && '• Uploads single student result to Google Sheets'}
                  {action === 'docs/generate' && '• Generates student manuals for an assessment'}
                  {action === 'docs/mark' && '• Marks generated student manuals'}
                  {action === 'docs/rename' && '• Renames lab folder prefixes (e.g., Lab → Assignment)'}
                  {action === 'docs/generate-complete' && '• Generates complete lab manual PDF for a course'}
                  {action === 'templates/create' && '• Creates a new GitHub repository template'}
                  {action === 'templates/update' && '• Updates an existing repository template'}
                  {action === 'templates/delete' && '• Deletes a repository template'}
                  {action === 'templates/download' && '• Downloads a repository template to local machine'}
                  {action === 'assignments/create' && '• Creates a GitHub Classroom assignment'}
                  {action === 'structure/create' && '• Creates local directory structure for semester/course'}
                  {action === 'workflow/complete' && '• Runs complete marking workflow: Clone → Test → Comments → Plagiarism → Upload (entire class). Supports uploading custom test files.'}
                  {action === 'student/complete' && '• Runs complete marking workflow for a single student. Supports uploading custom test files.'}
                </Typography>
              </Paper>

              {requiresAuth && (
                <TextField
                  fullWidth
                  label="API Key"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                  margin="normal"
                  helperText="Required for authenticated endpoints"
                />
              )}

              <Divider sx={{ my: 2 }} />

              {renderFormFields()}

              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={loading || (requiresAuth && !apiKey)}
                  startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                  fullWidth
                >
                  {loading ? 'Sending...' : 'Send Request'}
                </Button>
                <IconButton
                  onClick={handleClearForm}
                  color="secondary"
                  disabled={loading}
                >
                  <Tooltip title="Clear Form">
                    <DeleteIcon />
                  </Tooltip>
                </IconButton>
              </Box>
            </CardContent>
          </Card>

          {/* Request Preview */}
          <Card elevation={3} sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Request Preview
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: '#f5f5f5',
                  borderRadius: 1,
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  overflow: 'auto',
                  maxHeight: 300
                }}
              >
                <pre>{JSON.stringify(buildRequestBody(), null, 2)}</pre>
              </Paper>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Panel - Response */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Response
                </Typography>
                {response && (
                  <IconButton onClick={handleCopyResponse} size="small">
                    <Tooltip title="Copy Response">
                      <ContentCopyIcon />
                    </Tooltip>
                  </IconButton>
                )}
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" fontWeight="600">
                    Error: {error.code || 'ERROR'}
                  </Typography>
                  <Typography variant="body2">
                    {error.message}
                  </Typography>
                </Alert>
              )}

              {response && (
                <>
                  {renderFileInfo(hasDownloadableContent(response))}
                  
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: '#f5f5f5',
                      borderRadius: 1,
                      fontFamily: 'monospace',
                      fontSize: '0.85rem',
                      overflow: 'auto',
                      maxHeight: 600
                    }}
                  >
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                  </Paper>
                </>
              )}

              {!response && !error && !loading && (
                <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
                  <Typography variant="body1">
                    No response yet. Configure and send a request.
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Documentation Accordion */}
          <Card elevation={3} sx={{ mt: 3 }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">API Documentation</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" paragraph>
                  <strong>Base URL:</strong> {API_BASE_URL}
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Endpoint:</strong> POST /semesters
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" gutterBottom>
                  Available Actions:
                </Typography>
                <ul style={{ marginLeft: 20, fontSize: '0.875rem' }}>
                  <li><strong>status:</strong> Get system status (No auth)</li>
                  <li><strong>routes:</strong> List all routes (No auth)</li>
                  <li><strong>list_semesters:</strong> List all semesters</li>
                  <li><strong>get_semester:</strong> Get semester details</li>
                  <li><strong>list_assessments:</strong> List assessments for a course</li>
                  <li><strong>tests/run:</strong> Run tests for single student</li>
                  <li><strong>tests/run-all:</strong> Run tests for all students</li>
                  <li><strong>repositories/clone:</strong> Clone all student repositories</li>
                  <li><strong>comments/check:</strong> Check code comments (entire class)</li>
                  <li><strong>plagiarism/check:</strong> Run plagiarism detection</li>
                  <li><strong>plagiarism/download:</strong> Download plagiarism files (ZIP)</li>
                  <li><strong>results/upload:</strong> Upload results to Google Sheets</li>
                  <li><strong>docs/generate-complete:</strong> Generate complete lab manual (PDF)</li>
                  <li><strong>workflow/complete:</strong> Run complete workflow (class)</li>
                  <li><strong>student/complete:</strong> Run complete workflow (single student)</li>
                </ul>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" gutterBottom>
                  File Operations:
                </Typography>
                <Typography variant="body2" paragraph>
                  Several endpoints generate or provide downloadable files:
                </Typography>
                <ul style={{ marginLeft: 20, fontSize: '0.875rem' }}>
                  <li><strong>plagiarism/download:</strong> Returns ZIP file with plagiarism reports</li>
                  <li><strong>docs/generate-complete:</strong> Generates PDF of complete lab manual</li>
                  <li><strong>results/upload:</strong> Provides Google Sheets link</li>
                  <li><strong>templates/create:</strong> Provides GitHub repository link</li>
                  <li><strong>assignments/create:</strong> Provides GitHub Classroom links</li>
                </ul>
                <Typography variant="caption" color="text.secondary">
                  When these endpoints respond, download/open buttons will appear automatically.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ApiTester;
