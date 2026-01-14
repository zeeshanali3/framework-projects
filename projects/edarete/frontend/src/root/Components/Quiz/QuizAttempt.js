import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import MultiCodeFileEditor from './MultiCodeFileEditor';
import { showSuccessToast } from '../../Common/ToastUtils';

const QuizAttempt = ({
  course,
  setSelectedComponent,
  quizParameters,
  handleQuizCancelledToast,
  quizData,
  isConnected,
  emit,
  on,
  disconnect,
  micPermission,
  setMicPermission,
  micAvailable,
  requestMicAccess,
  isExternalConnected,
  externalScreens,
  detectExternalScreens,
}) => {
  const { currentUser, userSelectedRole } = useSelector(state => state.main);
  const quizRef = useRef(null);
  const answersRef = useRef({});
  const codeRef = useRef({});
  const timerRef = useRef("");
  const testResultsRef = useRef({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [codeAnswer, setCodeAnswer] = useState('');
  const [answers, setAnswers] = useState({});
  const [countdown, setCountdown] = useState(10);
  const [continueWithoutMic, setContinueWithoutMic] = useState(false);
  const [testOutput, setTestOutput] = useState(null);
  const [warningModal, setWarningModal] = useState({
    open: false,
    reason: '',
    countdown: 10,
  });
  const [codeFile, setCodeFile] = useState({});
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const warningTimerRef = useRef(null);

  const isModalBlocking = useRef(false);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours?.toString().padStart(2, '0')}:${minutes?.toString().padStart(2, '0')}:${seconds?.toString().padStart(2, '0')}`;
    } else {
      return `${minutes?.toString().padStart(2, '0')}:${seconds?.toString().padStart(2, '0')}`;
    }
  };

  console.log('Quiz Data in Attempt:', {
    course,
    quizData,
    answers,
    isConnected,
    emit,
    on,
  });

  let isDummy = false;

  const quizType =
    quizData?.subComponentStartedPayload?.currentQuestion?.config;
  console.log('Quiz Type in Attempt:', quizType);

  const dummyFiles = {
    'test_runner_main.cpp': {
      name: 'test_runner_main.cpp',
      language: 'cpp',
      value:
        '#include <iostream>\n#include "catch.hpp"\n#include "function.h"\nusing namespace std;\n\nint main() {\n    int passed = 0, failed = 0;\n    for (auto& t : Catch::tests()) {\n        try {\n            t.func();\n            cout << "[PASS] " << t.name << endl;\n            passed++;\n        } catch (const exception& ex) {\n            cout << "[FAIL] " << t.name << " -> " << ex.what() << endl;\n            failed++;\n        }\n    }\n    cout << "\\nTests Passed: " << passed << "  Failed: " << failed << endl;\n    return failed == 0 ? 0 : 1;\n}',
    },
    'main.cpp': {
      name: 'main.cpp',
      language: 'cpp',
      value:
        '#include "function.h"\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[] = {5, 2, 4, 1, 3};\n    int size = sizeof(arr)/sizeof(arr[0]);\n\n    cout << "Original array: ";\n    Function::printArray(arr, size);\n\n    Function::bubbleSort(arr, size);\n\n    cout << "Sorted array: ";\n    Function::printArray(arr, size);\n\n    return 0;\n}',
    },
    'testcase.cpp': {
      name: 'testcase.cpp',
      language: 'cpp',
      value:
        '#include "catch.hpp"\n#include "function.h"\n\nvoid test_bubble_sort() {\n    int arr[] = {5, 3, 2, 4, 1};\n    int expected[] = {1, 2, 3, 4, 5};\n    int size = sizeof(arr)/sizeof(arr[0]);\n\n    Function::bubbleSort(arr, size);\n\n    for (int i = 0; i < size; i++) {\n        REQUIRE(arr[i] == expected[i]);\n    }\n}\n\nnamespace {\n    Catch::Registrar reg1("Bubble Sort works", test_bubble_sort);\n}',
    },
    'catch.hpp': {
      name: 'catch.hpp',
      language: 'cpp',
      value:
        '#ifndef CATCH_HPP_INCLUDED\n#define CATCH_HPP_INCLUDED\n#include <iostream>\n#include <string>\n#include <exception>\n#include <sstream>\n#include <vector>\n\nnamespace Catch {\n    struct Test {\n        std::string name;\n        void (*func)();\n    };\n\n    inline std::vector<Test>& tests() {\n        static std::vector<Test> instance;\n        return instance;\n    }\n\n    struct Registrar {\n        Registrar(const std::string& name, void (*func)()) {\n            tests().push_back({name, func});\n        }\n    };\n\n    struct AssertionException : public std::exception {\n        std::string msg;\n        AssertionException(std::string m) : msg(m) {}\n        const char* what() const noexcept override { return msg.c_str(); }\n    };\n}\n\n#define TEST_CASE(name, tags) \\\n    static void UNIQUE_TEST_FN_##__LINE__(); \\\n    namespace { Catch::Registrar UNIQUE_TEST_REG_##__LINE__(name, UNIQUE_TEST_FN_##__LINE__); } \\\n    static void UNIQUE_TEST_FN_##__LINE__()\n\n#define REQUIRE(cond) \\\n    do { if (!(cond)) { \\\n        std::ostringstream oss; \\\n        oss << "REQUIRE FAILED: " << #cond << " at " << __FILE__ << ":" << __LINE__; \\\n        throw Catch::AssertionException(oss.str()); \\\n    }} while (0)\n\n#endif',
    },
    'function.h': {
      name: 'function.h',
      language: 'cpp',
      value:
        '#ifndef FUNCTION_H\n#define FUNCTION_H\n\nnamespace Function {\n    void swap(int& a, int& b);\n    void bubbleSort(int arr[], int size);\n    void printArray(const int arr[], int size);\n}\n\n#endif',
    },
    'function.cpp': {
      name: 'function.cpp',
      language: 'cpp',
      value:
        '#include "function.h"\n#include <iostream>\nusing namespace std;\n\nnamespace Function {\n    void swap(int& a, int& b) {\n        int temp = a;\n        a = b;\n        b = temp;\n    }\n\n    void bubbleSort(int arr[], int size) {\n        for (int i = 0; i < size-1; i++) {\n            for (int j = 0; j < size-i-1; j++) {\n                if (arr[j] > arr[j+1]) {\n                    swap(arr[j], arr[j+1]);\n                }\n            }\n        }\n    }\n\n    void printArray(const int arr[], int size) {\n        for (int i = 0; i < size; i++) {\n            cout << arr[i] << " ";\n        }\n        cout << endl;\n    }\n}',
    },
  };

  const originalFiles = {
    'test_runner_main.cpp': {
      name: 'test_runner_main.cpp',
      language: 'cpp',
      value: `#include <iostream>
#include "catch.hpp"
#include "bst.h"
using namespace std;

int main() {
    int passed = 0, failed = 0;
    for (auto& t : Catch::tests()) {
        try {
            t.func();
            cout << "[PASS] " << t.name << endl;
            passed++;
        } catch (const exception& ex) {
            cout << "[FAIL] " << t.name << " -> " << ex.what() << endl;
            failed++;
        }
    }

    cout << "\\nTests Passed: " << passed
         << "  Failed: " << failed << endl;

    return failed == 0 ? 0 : 1;
}`,
    },

    'main.cpp': {
      name: 'main.cpp',
      language: 'cpp',
      value: `#include "bst.h"
#include <iostream>
using namespace std;

int main() {
    BST tree;

    tree.insert(50);
    tree.insert(30);
    tree.insert(70);
    tree.insert(20);
    tree.insert(40);
    tree.insert(60);
    tree.insert(80);

    cout << "Before Delete: ";
    tree.printInorder();

    tree.deleteKey(50); // faulty delete will misbehave

    cout << "After Delete: ";
    tree.printInorder();

    return 0;
}`,
    },

    'testcase.cpp': {
      name: 'testcase.cpp',
      language: 'cpp',
      value: `#include "catch.hpp"
#include "bst.h"

// Convert BST inorder traversal into vector<int>
void collectInorder(Node* node, std::vector<int>& out) {
    if (!node) return;
    collectInorder(node->left, out);
    out.push_back(node->data);
    collectInorder(node->right, out);
}

void test_insert_bst() {
    BST tree;
    tree.insert(50);
    tree.insert(30);
    tree.insert(70);
    tree.insert(20);

    std::vector<int> result;
    collectInorder(tree.root, result);

    std::vector<int> expected = {20, 30, 50, 70};
    REQUIRE(result == expected);
}

void test_delete_faulty() {
    BST tree;
    tree.insert(50);
    tree.insert(30);
    tree.insert(70);
    tree.insert(20);
    tree.insert(40);
    tree.insert(60);
    tree.insert(80);

    tree.deleteKey(50); // faulty delete → inconsistent behavior expected

    std::vector<int> result;
    collectInorder(tree.root, result);

    // The expected result is WRONG on purpose because delete is faulty.
    // We just check structure is still a BST-ish increasing sequence.
    REQUIRE(result.size() == 6); // one element removed
    REQUIRE(result[0] == 20);
}

namespace {
    Catch::Registrar reg1("BST Insert Works", test_insert_bst);
    Catch::Registrar reg2("BST Faulty Delete Test", test_delete_faulty);
}`,
    },

    'catch.hpp': {
      name: 'catch.hpp',
      language: 'cpp',
      value: `#ifndef CATCH_HPP_INCLUDED
#define CATCH_HPP_INCLUDED
#include <iostream>
#include <string>
#include <exception>
#include <sstream>
#include <vector>

namespace Catch {
    struct Test {
        std::string name;
        void (*func)();
    };

    inline std::vector<Test>& tests() {
        static std::vector<Test> instance;
        return instance;
    }

    struct Registrar {
        Registrar(const std::string& name, void (*func)()) {
            tests().push_back({name, func});
        }
    };

    struct AssertionException : public std::exception {
        std::string msg;
        AssertionException(std::string m) : msg(m) {}
        const char* what() const noexcept override { return msg.c_str(); }
    };
}

#define TEST_CASE(name, tags) \
    static void UNIQUE_TEST_FN_##__LINE__(); \
    namespace { Catch::Registrar UNIQUE_TEST_REG_##__LINE__(name, UNIQUE_TEST_FN_##__LINE__); } \
    static void UNIQUE_TEST_FN_##__LINE__()

#define REQUIRE(cond) \
    do { if (!(cond)) { \
        std::ostringstream oss; \
        oss << "REQUIRE FAILED: " << #cond \
            << " at " << __FILE__ << ":" << __LINE__; \
        throw Catch::AssertionException(oss.str()); \
    }} while (0)

#endif`,
    },

    'bst.h': {
      name: 'bst.h',
      language: 'cpp',
      value: `#ifndef BST_H
#define BST_H

class Node {
public:
    int data;
    Node* left;
    Node* right;

    Node(int val);
};

class BST {
public:
    Node* root;

    BST();
    Node* insert(Node* node, int val);
    void insert(int val);
    Node* deleteNode(Node* node, int key);
    void deleteKey(int key);
    void inorder(Node* node);
    void printInorder();
};

#endif`,
    },
    'bst.cpp': {
      name: 'bst.cpp',
      language: 'cpp',
      value: `#include "bst.h"
#include <iostream>
using namespace std;

Node::Node(int val) {
    data = val;
    left = right = nullptr;
}

BST::BST() {
    root = nullptr;
}

Node* BST::insert(Node* node, int val) {
    if (node == nullptr)
        return new Node(val);

    if (val < node->data)
        node->left = insert(node->left, val);
    else
        node->right = insert(node->right, val);

    return node;
}

void BST::insert(int val) {
    root = insert(root, val);
}

Node* BST::deleteNode(Node* node, int key) {
    if (!node) return nullptr;

    if (key < node->data) {
        deleteNode(node->left, key);
    }
    else if (key > node.data) {
        deleteNode(node.right, key);
    }
    else {
        return node;
    }

    return node;
}

void BST::deleteKey(int key) {
    root = deleteNode(root, key);
}

void BST::inorder(Node* node) {
    if (!node) return;
    inorder(node->left);
    cout << node->data << " ";
    inorder(node->right);
}

void BST::printInorder() {
    inorder(root);
    cout << endl;
}`,
    },
  };

  // ✅ Show warning modal function - IMPORTANT FIX
  const showWarningModal = (reason) => {
    // Prevent multiple modals
    if (warningModal.open || isModalBlocking.current) return;
    isModalBlocking.current = true;
    console.log(`⚠️ Showing warning modal for: ${reason}`);
    setWarningModal({
      open: true,
      reason: reason,
      countdown: 10,
    });
    let timeLeft = 10;
    clearInterval(warningTimerRef.current);
    warningTimerRef.current = setInterval(() => {
      timeLeft--;
      setWarningModal(prev => ({
        ...prev,
        countdown: timeLeft,
      }));
      if (timeLeft <= 0) {
        clearInterval(warningTimerRef.current);
        handleCancelQuiz(reason);
      }
    }, 1000);
  };

  // ✅ Handle cancel quiz
  const handleCancelQuiz = (reason) => {
    clearInterval(warningTimerRef.current);
    isModalBlocking.current = false;
    setWarningModal({ open: false, reason: '', countdown: 10 });

    // End quiz logic
    setSelectedComponent('quiz-listing');
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(console.error);
    }
    const participantDetails = {
      quizId: quizData?.subComponentStartedPayload?.quizId || 0,
      participant: {
        urdd: userSelectedRole.user_role_designation_department_id || 0,
        role: userSelectedRole.role_name,
        name:
          currentUser.first_name + ' ' + currentUser.last_name ||
          'Unknown Student',
        email: currentUser.email || 'N/A',
      },
      reason: `Quiz cancelled due to ${reason}`,
    };
    if (emit) {
      emit('block-user', participantDetails);
    }
    if (disconnect) {
      disconnect();
    }
    handleQuizCancelledToast(`Quiz cancelled due to ${reason}`);
  };
  // ✅ Handle continue quiz - FIXED
  const handleContinueQuiz = async () => {
    clearInterval(warningTimerRef.current);
    setWarningModal({ open: false, reason: '', countdown: 10 });
    // Wait for modal to close visually before restoring fullscreen
    setTimeout(async () => {
      isModalBlocking.current = false;
      const elem = quizRef.current;
      if (elem) {
        try {
          if (!document.fullscreenElement &&
            !document.webkitFullscreenElement &&
            !document.msFullscreenElement) {
            if (elem.requestFullscreen) {
              await elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
              await elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
              await elem.msRequestFullscreen();
            }
          }
        } catch (err) {
          console.error('❌ Fullscreen failed:', err);
        }
      }
    }, 120);
  };

  // ✅ ADD: Helper to unescape string values
  const unescapeStringValue = str => {
    if (typeof str !== 'string') return str;

    return str
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\t/g, '\t')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
  };

  // ✅ ADD: Helper to unescape all file values
  const unescapeFiles = filesObj => {
    if (!filesObj || typeof filesObj !== 'object') return filesObj;

    const unescaped = {};
    Object.entries(filesObj).forEach(([fileName, fileData]) => {
      unescaped[fileName] = {
        ...fileData,
        value: unescapeStringValue(fileData?.value),
      };
    });
    return unescaped;
  };

  // ✅ ADD: Robust JSON parser (same as Assignment.jsx)
  const safeJSONParse = jsonString => {
    if (!jsonString || typeof jsonString !== 'string') {
      console.warn('Invalid input to safeJSONParse:', typeof jsonString);
      return {};
    }

    // If already an object, return it
    if (typeof jsonString === 'object' && jsonString !== null) {
      return jsonString;
    }

    try {
      // Try direct parse first
      return JSON.parse(jsonString);
    } catch (e1) {
      console.log(
        '⚠️ First parse failed, attempting character-by-character repair...',
      );

      try {
        // Character-by-character state machine to fix unescaped quotes
        let result = '';
        let i = 0;
        let inValueField = false;

        while (i < jsonString.length) {
          const char = jsonString[i];
          const lookAhead = jsonString.substring(i, i + 10);

          // Check if we're entering a "value" field
          if (!inValueField && lookAhead.startsWith('"value":"')) {
            result += '"value":"';
            i += 9;
            inValueField = true;

            // Now process the value content until we find the proper closing quote
            let valueContent = '';
            let braceDepth = 0;
            let escapeNext = false;

            while (i < jsonString.length) {
              const c = jsonString[i];
              const next = jsonString[i + 1];

              // Handle escape sequences
              if (c === '\\' && !escapeNext) {
                escapeNext = true;
                valueContent += c;
                i++;
                continue;
              }

              if (escapeNext) {
                escapeNext = false;
                valueContent += c;
                i++;
                continue;
              }

              // Track nested braces
              if (c === '{') braceDepth++;
              if (c === '}') braceDepth--;

              // Check if this quote ends the value (not escaped, depth 0, followed by } or ,)
              if (c === '"' && braceDepth === 0) {
                if (next === '}' || next === ',' || next === undefined) {
                  // This is the closing quote for the value field
                  break;
                }
              }

              valueContent += c;
              i++;
            }

            // Properly escape the value content
            const escaped = valueContent
              .replace(/\\/g, '\\\\')
              .replace(/"/g, '\\"')
              .replace(/\n/g, '\\n')
              .replace(/\r/g, '\\r')
              .replace(/\t/g, '\\t');

            result += escaped + '"';
            inValueField = false;
            i++; // Skip the closing quote
            continue;
          }

          // Normal character processing
          result += char;
          i++;
        }

        console.log(
          '🔧 Repaired JSON (first 300 chars):',
          result.substring(0, 300),
        );
        return JSON.parse(result);
      } catch (e2) {
        console.error('❌ Character-by-character repair failed:', e2);
        console.error('Failed at position:', e2.message);

        // Return safe default
        return {
          pre: { style: '' },
          code: {},
          post: { style: '' },
        };
      }
    }
  };

  useEffect(() => {
    if (!quizStarted) return;

    const elem = quizRef.current;
    if (!elem) {
      console.error('Quiz container element not found');
      return;
    }

    let isQuizActive = true;
    let leaveTimer;

    const enterFullscreen = async () => {
      try {
        if (elem.requestFullscreen) await elem.requestFullscreen();
        else if (elem.webkitRequestFullscreen)
          await elem.webkitRequestFullscreen();
        else if (elem.msRequestFullscreen) await elem.msRequestFullscreen();
        else throw new Error('Fullscreen not supported');
      } catch (error) {
        console.error('Fullscreen error:', error);
        throw error;
      }
    };

    const handleMouseMove = e => {
      clearTimeout(leaveTimer);
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const threshold = -2;

      const nearEdge =
        e.clientX <= threshold ||
        e.clientX >= viewportWidth - threshold ||
        e.clientY <= threshold ||
        e.clientY >= viewportHeight - threshold;

      if (nearEdge) {
        leaveTimer = setTimeout(() => {
          showWarningModal('mouse left the quiz area');
        }, 500);
      }
    };

    const handleFullscreenChange = () => {
      if (
        !document.fullscreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement
      ) {
        showWarningModal('exited fullscreen mode');
      }
    };



    const handleVisibilityChange = () => {
      if (document.hidden) {
        showWarningModal('tab/window was hidden');
      }
    };

    // ✅ UPDATED: Proper blocked keys handling
    const handleKeyDown = e => {
      if (isModalBlocking.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // ✅ Define blocked keys with proper names
      const blockedKeys = {
        'Escape': 'Escape key',
        'F1': 'F1 key',
        'F2': 'F2 key',
        'F3': 'F3 key',
        'F4': 'F4 key',
        'F5': 'F5 key',
        'F6': 'F6 key',
        'F7': 'F7 key',
        'F8': 'F8 key',
        'F9': 'F9 key',
        'F10': 'F10 key',
        'F11': 'F11 key',
        'F12': 'F12 key',
        'Alt': 'Alt key',
        'OS': 'Windows key',
      };

      // ✅ Check for blocked keys FIRST
      if (blockedKeys[e.key]) {
        e.preventDefault();
        e.stopPropagation();
        console.log(`🚫 Blocked key pressed: ${e.key}`);
        showWarningModal(`forbidden key pressed: ${blockedKeys[e.key]}`);
        return;
      }

      // ✅ Check for Shift combinations
      if (e.shiftKey && e.key !== 'Shift') {
        // Allow specific Shift combinations (like Shift for typing capital letters)
        // But block Shift + Tab (reverse tab)
        if (e.key === 'Tab') {
          e.preventDefault();
          e.stopPropagation();
          showWarningModal('forbidden key combination: Shift+Tab');
          return;
        }
      }

      // ✅ Check for Cmd/Ctrl + Shift combinations
      if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
        e.preventDefault();
        e.stopPropagation();
        showWarningModal(`forbidden key combination: ${e.ctrlKey ? 'Ctrl' : 'Cmd'}+Shift+${e.key}`);
        return;
      }

      // ✅ Check for developer tools shortcuts
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'))) {
        e.preventDefault();
        e.stopPropagation();
        showWarningModal('developer tools access attempted');
        return;
      }



      // ✅ Check for Ctrl/Cmd combinations
      if (e.ctrlKey || e.metaKey) {
        // Allow specific Ctrl combinations
        if (allowedCtrlCombinations[e.key]) {
          if (e.key === 's') {
            e.preventDefault(); // Prevent save
          }
          return; // Allow these combinations
        }

        // Block all other Ctrl combinations
        e.preventDefault();
        e.stopPropagation();
        showWarningModal(`forbidden key combination: ${e.ctrlKey ? 'Ctrl' : 'Cmd'}+${e.key}`);
        return;
      }

      // ✅ Check for Alt combinations
      if (e.altKey && e.key !== 'Alt') {
        e.preventDefault();
        e.stopPropagation();
        showWarningModal(`forbidden key combination: Alt+${e.key}`);
        return;
      }
    };

    const isDevToolsOpen = () => {
      const widthThreshold =
        Math.abs(window.outerWidth - window.innerWidth) > 160;
      const heightThreshold =
        Math.abs(window.outerHeight - window.innerHeight) > 160;
      return widthThreshold || heightThreshold;
    };

    const initializeQuiz = async () => {
      try {
        if (typeof detectExternalScreens === 'function')
          await detectExternalScreens();

        if (isDevToolsOpen()) {
          showWarningModal('Developer Tools opened');
          return () => { };
        }

        try {
          await enterFullscreen();
          if (typeof detectExternalScreens === 'function')
            detectExternalScreens();
        } catch (error) { }

        // Event listeners
        const events = [
          {
            target: document,
            type: 'fullscreenchange',
            handler: handleFullscreenChange,
          },
          {
            target: document,
            type: 'webkitfullscreenchange',
            handler: handleFullscreenChange,
          },
          {
            target: document,
            type: 'msfullscreenchange',
            handler: handleFullscreenChange,
          },
          { target: window, type: 'blur', },
          {
            target: document,
            type: 'visibilitychange',
            handler: handleVisibilityChange,
          },
          { target: document, type: 'keydown', handler: handleKeyDown },
          { target: document, type: 'mousemove', handler: handleMouseMove },
        ];

        events.forEach(({ target, type, handler }) => {
          target.addEventListener(type, handler, { capture: true });
        });

        return () => {
          events.forEach(({ target, type, handler }) => {
            target.removeEventListener(type, handler, { capture: true });
          });
          clearTimeout(leaveTimer);
          clearInterval(warningTimerRef.current);
          isModalBlocking.current = false;
        };
      } catch (error) {
        console.error('Error initializing quiz:', error);
        showWarningModal('Error initializing quiz');
      }
    };

    const devToolsInterval = setInterval(() => {
      if (isModalBlocking.current) return;

      if (isDevToolsOpen()) {
        showWarningModal('Developer Tools opened');
      }
    }, 1000);

    const cleanup = initializeQuiz();



    return () => {
      isQuizActive = false;
      clearTimeout(leaveTimer);
      clearInterval(warningTimerRef.current);
      clearInterval(devToolsInterval);
      isModalBlocking.current = false;
      if (cleanup) cleanup.then(fn => fn?.());
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(console.error);
      }
    };
  }, [quizStarted]);

  const shuffleArray = array => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const [questions] = useState(() => {
    const sourceQuestions =
      quizData?.subComponentStartedPayload?.allQuestions || [];
    console.log('Source Questions:', sourceQuestions);
    const parsedQuestions = sourceQuestions.map(q => {
      // ✅ MODIFIED: Use safeJSONParse instead of JSON.parse
      const parsedDescription = safeJSONParse(q.description);

      return {
        id: q.question_id,
        type: q.config[0]?.type?.value || '',
        duration: q.config[0]?.duration || [],
        description: {
          pre: parsedDescription?.pre?.style || '',
          // code: parsedDescription?.code || '',
          code: unescapeFiles(parsedDescription?.code || {}), // ✅ Unescape code
          post: parsedDescription?.post?.style || '',
        },
        options: q.options || [],
      };
    });

    const randomized = shuffleArray(parsedQuestions).map(q => {
      if (q.type === 'mcq' && q.options) {
        return { ...q, options: shuffleArray(q.options) };
      }
      return q;
    });

    return randomized;
  });

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  console.log('Current Question:', currentQuestion);
  const timePercentage = currentQuestion?.duration
    ? (countdown / currentQuestion?.duration) * 100
    : 100;

  let timeLeftColor = '#4CAF50';

  if (timePercentage <= 20) {
    timeLeftColor = '#E53935';
  } else if (timePercentage <= 50) {
    timeLeftColor = '#FFD54F';
  } else {
    timeLeftColor = '#4CAF50';
  }

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  useEffect(() => {
    codeRef.current = codeAnswer;
  }, [codeAnswer]);

  useEffect(() => {
    testResultsRef.current = testOutput;
  }, [testOutput]);

  useEffect(() => {
    timerRef.current = countdown;
  }, [countdown]);

  const handleNext = () => {
    handleSubmit();
  };

  const handleSubmit = () => {
    const currentQ = questions[currentIndex];
    const userAnswer = answersRef.current[currentQ?.id];

    const answerValue =
      currentQ?.type === 'mcq'
        ? userAnswer?.optionNumber ?? -1
        : currentQ?.type === 'code'
          // ? userAnswer?.code || ''
          ? codeAnswer || codeRef.current || ''
          : userAnswer?.text || (userAnswer === undefined ? -1 : userAnswer);

    const answerData = {
      event: 'submit-answer',
      data: {
        quizId: quizData?.subComponentStartedPayload?.quizId || 0,
        answer: answerValue,
        type: currentQ?.type,
        participant: {
          urdd: userSelectedRole.user_role_designation_department_id || 0,
          role: userSelectedRole.role_name,
          name:
            currentUser.first_name + ' ' + currentUser.lastName ||
            'Unknown Student',
          email: currentUser.email || 'N/A',
        },
        selectedOptionText:
          currentQ?.type === 'mcq'
            ? userAnswer?.description ||
            (userAnswer === undefined ? 'No Answer' : '')
            : currentQ?.type === 'code'
              ? 'Code Answer'
              : 'Text Answer',
        totalQuestions: questions.length,
        courseId: course.CourseId || 0,
        questionId: currentQ?.id,
        shuffledQuestionData: {
          shuffledQuestion: {
            question_id: currentQ?.id,
            description: currentQ?.description?.pre || '',
            options: currentQ?.options || [],
            config: currentQ?.config || [{ duration: countdown }],
          },
        },
        testResults: testOutput || testResultsRef.current,
        correctOption:
          currentQ?.type === 'mcq'
            ? !!currentQ?.options?.find(
              opt =>
                opt.optionNumber === userAnswer?.optionNumber &&
                opt.correct,
            )
            : null,
      },
      timestamp: new Date().toISOString(),
      hasShuffledData: true,
      testResults: testOutput || testResultsRef.current,
      hasCorrectOption:
        currentQ?.options?.some(opt => opt.correct === true) || false,
    };

    console.log(
      'Emitting final answer payload before submission:',
      answerData.data,
    );

    if (isConnected && emit) {
      emit('submit-answer', answerData.data);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      const completedData = {
        quizId: quizData?.subComponentStartedPayload?.quizId || 0,
        participant: {
          urdd: userSelectedRole.user_role_designation_department_id || 0,
          role: userSelectedRole.role_name,
          name:
            currentUser.first_name + ' ' + currentUser.lastName ||
            'Unknown Student',
          email: currentUser.email || 'N/A',
        },
        totalQuestions: questions.length,
        completedAt: new Date().toISOString(),
      };

      console.log('✅ Emitting quiz-completed event:', completedData);

      if (isConnected && emit) {
        // emit('quiz-completed', completedData);
        emit('subComponent-completed', completedData);
      }
      disconnect();
      setSubmitModalOpen(false);
      setSelectedComponent('quiz-listing');
      if (timerRef.current <= 1) {
        showSuccessToast("Your quiz was automatically submitted because the time has ended.");
      }
      else {
        showSuccessToast("Quiz submitted successfully.");
      }
    }
  };

  const handleAnswerChange = (qid, value) => {
    setAnswers(prev => ({ ...prev, [qid]: value }));
    console.log('Answer updated:', { answers });
  };

  // Timer useEffect
  useEffect(() => {
    if (!quizStarted) return;

    const currentQ = questions[currentIndex];
    const questionDuration = currentQ?.duration || 0;

    setCountdown(questionDuration);

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);

          if (currentIndex < questions.length - 1) {
            handleNext();
          } else {
            handleSubmit();
          }

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, quizStarted]);


  // External screen detection
  useEffect(() => {
    const detector =
      typeof detectExternalScreens === 'function'
        ? detectExternalScreens
        : null;
    if (detector) detector();
    const onResize = () => detector && detector();
    const onVisibility = () => detector && detector();
    const onOrientation = () => detector && detector();
    const onFullscreen = () => detector && detector();

    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onOrientation);
    document.addEventListener('visibilitychange', onVisibility);
    document.addEventListener('fullscreenchange', onFullscreen);
    document.addEventListener('webkitfullscreenchange', onFullscreen);
    document.addEventListener('msfullscreenchange', onFullscreen);

    try {
      if (
        navigator.mediaDevices &&
        typeof navigator.mediaDevices.addEventListener === 'function'
      ) {
        navigator.mediaDevices.addEventListener('devicechange', detector);
      } else if (navigator.mediaDevices) {
        navigator.mediaDevices.ondevicechange = detector;
      }
    } catch (e) { }

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onOrientation);
      document.removeEventListener('visibilitychange', onVisibility);
      document.removeEventListener('fullscreenchange', onFullscreen);
      document.removeEventListener('webkitfullscreenchange', onFullscreen);
      document.removeEventListener('msfullscreenchange', onFullscreen);
      try {
        if (
          navigator.mediaDevices &&
          typeof navigator.mediaDevices.removeEventListener === 'function'
        ) {
          navigator.mediaDevices.removeEventListener('devicechange', detector);
        } else if (navigator.mediaDevices) {
          navigator.mediaDevices.ondevicechange = null;
        }
      } catch (e) { }
    };
  }, [detectExternalScreens]);

  // If external display detected
  useEffect(() => {
    if (isExternalConnected && quizStarted) {
      console.warn('External display detected during quiz — cancelling.');
      const reason = 'external display connected';
      setSelectedComponent('quiz-listing');
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(console.error);
      }
      const participantDetails = {
        quizId: quizData?.subComponentStartedPayload?.quizId || 0,
        participant: {
          urdd: userSelectedRole?.user_role_designation_department_id || 0,
          role: userSelectedRole?.role_name,
          name:
            currentUser?.first_name + ' ' + currentUser?.last_name ||
            'Unknown Student',
          email: currentUser?.email || 'N/A',
        },
        reason: `Quiz cancelled due to ${reason}`,
      };
      try {
        emit('block-user', participantDetails);
      } catch (e) {
        console.warn(e);
      }
      try {
        disconnect();
      } catch (e) { }
      handleQuizCancelledToast(`Quiz cancelled due to ${reason}`);
    }
  }, [isExternalConnected, quizStarted]);


  if (!quizStarted) {
    return (
      <Box
        ref={quizRef}
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FF 100%)',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999,
        }}
      >
        {/* {isExternalConnected && ( */}
        {isExternalConnected && externalScreens?.length > 1 && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.75)',
              zIndex: 10000,
              p: 2,
            }}
          >
            <Box
              sx={{
                width: 'min(720px,95%)',
                bgcolor: '#1e1e1e',
                color: '#fff',
                p: 3,
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" sx={{ color: '#FFD54F', mb: 1 }}>
                External Display Detected
              </Typography>
              <Typography variant="body2" sx={{ color: '#ddd', mb: 2 }}>
                An external screen has been detected. Disconnect external
                displays before starting the quiz.
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: '#999', display: 'block', mb: 2 }}
              >
                Detected screens: {externalScreens?.length || 1}
              </Typography>
              {micAvailable === false && (
                <Typography variant="caption" sx={{ color: '#ff8a80', mb: 2 }}>
                  No audio input device detected. Connect a microphone or use
                  "Continue without mic".
                </Typography>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  onClick={detectExternalScreens}
                  sx={{ bgcolor: '#4C49ED', color: '#fff' }}
                >
                  Re-check
                </Button>
              </Box>
            </Box>
          </Box>
        )}

        {micPermission !== 'granted' && !isExternalConnected && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.75)',
              zIndex: 10000,
              p: 2,
            }}
          >
            <Box
              sx={{
                width: 'min(720px,95%)',
                bgcolor: '#1e1e1e',
                color: '#fff',
                p: 3,
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" sx={{ color: '#4C49ED', mb: 1 }}>
                Microphone Permission Required
              </Typography>
              <Typography variant="body2" sx={{ color: '#ddd', mb: 2 }}>
                Please allow microphone access to proceed with the quiz.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {micAvailable === false && (
                  <Typography
                    variant="caption"
                    sx={{ color: '#ff8a80', mb: 2 }}
                  >
                    No audio input device detected. Connect a microphone or use
                    "Continue without mic".
                  </Typography>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    onClick={requestMicAccess}
                    sx={{ bgcolor: '#4C49ED', color: '#fff' }}
                  >
                    Allow Microphone
                  </Button>
                  {micAvailable === false && (
                    <Button
                      onClick={() => {
                        setMicPermission('granted');
                        setContinueWithoutMic(true);
                      }}
                      sx={{ bgcolor: '#777', color: '#fff', ml: 1 }}
                    >
                      Continue without mic
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        )}

        <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
          Ready to Start the Quiz?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setQuizStarted(true)}
          disabled={isExternalConnected || micPermission !== 'granted'}
          sx={{ px: 5, py: 2, borderRadius: '12px', fontSize: '1rem' }}
        >
          Start Quiz
        </Button>
      </Box>
    );
  }

  // Quiz Screen
  return (
    <>
      <Box
        ref={quizRef}
        sx={{
          width: '100%',
          height: '100vh',
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FF 100%)',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 2,
          overflowY: 'auto',
        }}
      >
        {/* ✅ CRITICAL FIX: Warning Modal - This should be the ONLY modal */}
        <Modal
          open={warningModal.open}
          aria-labelledby="warning-modal-title"
          aria-describedby="warning-modal-description"
          disableEscapeKeyDown
          disableAutoFocus
          disablePortal
          keepMounted
          sx={{
            zIndex: 12000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClose={() => {
            // Prevent closing via backdrop click or escape
            return;
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(500px, 90%)',
              bgcolor: '#1e1e1e',
              color: '#fff',
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              border: '2px solid #ff5252',
            }}
          >
            <Typography
              id="warning-modal-title"
              variant="h6"
              component="h2"
              sx={{
                color: '#FFD54F',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              ⚠️ Warning: Quiz Violation Detected
            </Typography>
            <Typography
              id="warning-modal-description"
              sx={{ mb: 3, color: '#ddd', fontSize: '1.1rem' }}
            >
              You have violated quiz rules: <strong>{warningModal.reason}</strong>
            </Typography>
            <Typography
              sx={{
                mb: 3,
                color: warningModal.countdown <= 3 ? '#ff5252' : '#FFD54F',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Quiz will be cancelled in {warningModal.countdown} seconds
            </Typography>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}
            >
              <Button
                variant="contained"
                onClick={handleContinueQuiz}
                sx={{
                  flex: 1,
                  bgcolor: '#4C49ED',
                  '&:hover': { bgcolor: '#3d3ac7' },
                  fontWeight: 'bold',
                  fontSize: '1rem',
                }}
              >
                Continue Quiz
              </Button>

              <Button
                variant="outlined"
                onClick={() => {
                  handleCancelQuiz(warningModal.reason);
                }}
                sx={{
                  flex: 1,
                  borderColor: '#ff5252',
                  color: '#ff5252',
                  '&:hover': {
                    borderColor: '#ff1744',
                    bgcolor: 'rgba(255, 82, 82, 0.1)',
                  },
                  fontWeight: 'bold',
                  fontSize: '1rem',
                }}
              >
                Cancel Quiz
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* Header */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ fontSize: '1.8rem' }}
            >
              {quizData?.subComponentStartedPayload?.quizName || 'Quiz Name'}
            </Typography>
            <Typography
              variant="h4"
              fontWeight="normal"
              sx={{ fontSize: '1rem' }}
            >
              {quizData?.subComponentStartedPayload?.description || 'Course Name'}
            </Typography>
          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            left: '50%',
            transform: 'translateX(-50%)',
            gap: 1,
            top: 60
          }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                fontSize: '1.1rem',
                color: timeLeftColor,
                transition: 'all 0.3s ease',
                ...(timePercentage <= 20 && {
                  animation: 'blink 1s infinite',
                }),
                '@keyframes blink': {
                  '0%, 100%': {
                    opacity: 1,
                    transform: 'scale(1)',
                  },
                  '50%': {
                    opacity: 0.5,
                    transform: 'scale(1.05)',
                  },
                },
              }}
            >
              Time Left: {formatTime(countdown)}
            </Typography>
          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ fontSize: '1.1rem', color: '#333' }}
              >
                Total Time:
              </Typography>
              <Typography variant="h5" sx={{ fontSize: '1.1rem', color: '#333' }}>
                {formatTime(currentQuestion?.duration)}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Question */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
            p: 3,
            border: '1px solid #eee',
            borderRadius: '10px',
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ fontSize: '1.2rem' }}
            dangerouslySetInnerHTML={{
              __html: `${currentIndex + 1}. ${currentQuestion?.description?.pre || ''
                }`,
            }}
          />

          {currentQuestion?.description?.post && (
            <div
              dangerouslySetInnerHTML={{
                __html: currentQuestion?.description.post,
              }}
            />
          )}

          {currentQuestion?.type === 'code' && (
            <MultiCodeFileEditor
              key={currentQuestion?.id} // ✅ Force remount on question change

              isLab={false}
              defaultCode={currentQuestion?.description?.code || ''}
              onChange={value =>
                handleAnswerChange(currentQuestion?.id, { code: value })
              }
              priviousCodeAnswers={currentQuestion?.description?.code || {}} // ✅ Use code from current question
              setTestOutput={setTestOutput}
              setCodeAnswer={setCodeAnswer}

            />
          )}

          {currentQuestion?.type === 'mcq' && (
            <FormControl component="fieldset" sx={{ width: '100%' }}>
              <RadioGroup
                name={`question-${currentQuestion?.id}`}
                value={
                  answers[currentQuestion?.id]?.optionNumber?.toString() || ''
                }
                onChange={e => {
                  const selectedOption = currentQuestion?.options.find(
                    opt => opt.optionNumber?.toString() === e.target.value,
                  );
                  handleAnswerChange(currentQuestion?.id, selectedOption);
                }}
              >
                <Grid container spacing={2}>
                  {currentQuestion?.options.map(option => (
                    <Grid item xs={12} md={6} key={option.optionNumber}>
                      <Box
                        sx={{
                          border: '1px solid #e0e0e0',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          '&:hover': {
                            borderColor: '#4C49ED',
                            backgroundColor: 'rgba(76, 73, 237, 0.08)',
                          },
                        }}
                      >
                        <FormControlLabel
                          value={option.optionNumber?.toString()}
                          control={<Radio />}
                          label={
                            <Typography sx={{ fontSize: '1rem', color: '#333' }}>
                              {option.description}
                            </Typography>
                          }
                          sx={{ width: '100%', m: 0, p: 2 }}
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
            </FormControl>
          )}

          {(currentQuestion?.type === 'textfield' || !currentQuestion?.type) && (
            <TextField
              fullWidth
              multiline
              minRows={3}
              placeholder="Write your answer here..."
              variant="outlined"
              value={answers[currentQuestion?.id]?.text || ''}
              onChange={e =>
                handleAnswerChange(currentQuestion?.id, { text: e.target.value })
              }
            />
          )}


        </Box>

        {/* Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          {!isLastQuestion ? (
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{
                backgroundColor: '#4C49ED',
                borderRadius: '10px',
                px: 4,
                py: 1,
              }}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={() => setSubmitModalOpen(true)}
              sx={{ borderRadius: '10px', px: 4, py: 1 }}
            >
              Submit
            </Button>
          )}
        </Box>
      </Box>
      {/* ✅ open modal when we press on Submit */}
      <Modal
        open={submitModalOpen}
        onClose={() => setSubmitModalOpen(false)}
        container={() => quizRef.current}
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
            Quiz Submission
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={3}>
            Are you sure you want to submit this quiz?
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
    </>
  );
};

export default QuizAttempt;