import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from 'react-redux';
import { useSocket } from "../Socket/index";
import { constants } from "../../Common/Constants";
import QuizListing from "./QuizListing";
import QrCode from "./QrCode";
import Waiting from "./Waiting";
import QuizAttempt from "./QuizAttempt";
import Assignment from "./Assignmnet";
import { showErrorToast } from "../../Common/ToastUtils";
import { Box } from '@mui/material';
import MultiCodeFileEditor from '../Quiz/MultiCodeFileEditor';

const Quiz = ({ course }) => {
    const all_state = useSelector((state) => state.main);
    const accessToken = all_state?.accesstoken || null;
    const { currentUser, userSelectedRole } = useSelector((state) => state.main);
    const [quizzes, setQuizzes] = useState([]);
    const [codeAnswer, setCodeAnswer] = useState(''); // Add this state
    const [testOutput, setTestOutput] = useState(null); // Add this state
    const participant = {
        name: currentUser?.first_name + " " + currentUser?.last_name || 'Unknown User',
        urdd: userSelectedRole?.user_role_designation_department_id,
        email: currentUser?.email || 'unknown@example.com',
        role: userSelectedRole?.role_name
    };
    const [selectedComponent, setSelectedComponent] = useState('quiz-listing'); // 'quiquiz' | 'qrCode' | 'waiting' | 'quizAttempt' | 'assignment' | 'codeEditor'
    const [quizParameters, setQuizParameters] = useState({});
    const [quizData, setQuizData] = useState({});
    const { connect, disconnect, isConnected, emit, on } = useSocket(constants.socket_url, accessToken, participant);

    // --- mic & external-display shared state (available to all screens) ---
    const [micPermission, setMicPermission] = useState('prompt'); // 'prompt' | 'granted' | 'denied'
    const [permissionError, setPermissionError] = useState('');
    const micStreamRef = useRef(null);
    const [micAvailable, setMicAvailable] = useState(null); // null = unknown, true/false
    const [isExternalConnected, setIsExternalConnected] = useState(false);
    const [externalScreens, setExternalScreens] = useState([]);
    const [continueWithoutMic, setContinueWithoutMic] = useState(false); // Add this line
    const [windowPermission, setWindowPermission] = useState('unknown'); // window-management permission state
    const windowPermissionStatusRef = useRef(null);
    const [autoDownloadPermission, setAutoDownloadPermission] = useState('prompt'); // automatic-downloads permission state: 'prompt' | 'granted' | 'denied'
    const autoDownloadPermissionStatusRef = useRef(null);
    const pollRef = useRef(null);
  const defaultCodeFiles = {
    // ===============================================================
    // test runner main
    // ===============================================================
    // ===============================================================
    // main.cpp
    // ===============================================================
    'main.cpp': {
      name: 'main.cpp',
      language: 'cpp',
      value: `#include <iostream>
using namespace std;

void menu() {
    cout << "========= GENERAL TREE MENU =========" << endl;
    cout << "1. Insert Node" << endl;
    cout << "2. Delete Node" << endl;
    cout << "3. Print Tree (Preorder)" << endl;
    cout << "0. Exit" << endl;
    cout << "Enter your choice: ";
}

int main() {
    int choice;
    do {
        menu();
        cin >> choice;
        
        if (choice == 1) {
            int parent, value;
            cout << "Enter parent value (-1 for root): ";
            cin >> parent;  // ✅ FIX: Added missing input
            cout << "Enter node value: ";
            cin >> value;   // ✅ FIX: Added missing input
            cout << "Node inserted!" << endl;
        } else if (choice == 2) {
            int val;
            cout << "Enter node value to delete: ";
            cin >> val;     // ✅ Already present
            cout << "Node deleted!" << endl;
        } else if (choice == 3) {
            cout << "Tree (preorder): [empty]" << endl;  // ✅ FIX: Added placeholder
        } else if (choice != 0) {
            cout << "Invalid choice!" << endl;
        }
    } while (choice != 0);
    
    cout << "Exiting..." << endl;
    return 0;
}`,
    },

  };

    const refreshWindowPermission = useCallback(async () => {
       if (!navigator?.permissions || typeof navigator.permissions.query !== 'function') {
         setWindowPermission('unsupported');
         return 'unsupported';
       }
       try {
         const status = await navigator.permissions.query({ name: 'window-management' });
         setWindowPermission(status.state);

         const existing = windowPermissionStatusRef.current;
         if (existing?.status && existing.status !== status) {
           existing.status.removeEventListener?.('change', existing.handleChange);
           windowPermissionStatusRef.current = null;
         }

         if (!windowPermissionStatusRef.current) {
           const handleChange = () => setWindowPermission(status.state);
           status.addEventListener?.('change', handleChange);
           windowPermissionStatusRef.current = { status, handleChange };
         }
         return status.state;
       } catch (err) {
         console.warn('window-management permission query failed', err);
         if (err?.name === 'TypeError') {
           setWindowPermission('unsupported');
           return 'unsupported';
         }
         setWindowPermission('error');
         return 'error';
       }
    }, []);

    const refreshAutoDownloadPermission = useCallback(async () => {
      // NOTE: The Permissions API for 'automatic-downloads' is NOT reliable.
      // Chrome may report 'granted' even when the setting is actually off.
      // We do NOT trust the API - user must manually confirm they've enabled it.
      // This function only re-checks but won't auto-grant.
      // Keeping current state unless user explicitly confirms.
      return autoDownloadPermission;
    }, [autoDownloadPermission]);

    const requestAutoDownloadPermission = useCallback(async () => {
      // Trigger multiple rapid downloads to prompt the browser for automatic download permission
      // Most browsers will show a permission prompt after 2+ rapid downloads
      try {
        // First download
        const blob1 = new Blob(['Exam download permission test file 1'], { type: 'text/plain' });
        const url1 = URL.createObjectURL(blob1);
        const a1 = document.createElement('a');
        a1.href = url1;
        a1.download = 'exam-permission-test-1.txt';
        a1.style.display = 'none';
        document.body.appendChild(a1);
        a1.click();
        document.body.removeChild(a1);
        URL.revokeObjectURL(url1);

        // Second download after short delay to trigger the permission prompt
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const blob2 = new Blob(['Exam download permission test file 2'], { type: 'text/plain' });
        const url2 = URL.createObjectURL(blob2);
        const a2 = document.createElement('a');
        a2.href = url2;
        a2.download = 'exam-permission-test-2.txt';
        a2.style.display = 'none';
        document.body.appendChild(a2);
        a2.click();
        document.body.removeChild(a2);
        URL.revokeObjectURL(url2);

        // Re-check permission after a delay
        setTimeout(() => {
          refreshAutoDownloadPermission();
        }, 1000);
      } catch (err) {
        console.warn('requestAutoDownloadPermission error', err);
      }
    }, [refreshAutoDownloadPermission]);

    // Allow user to manually confirm they've enabled automatic downloads
    const confirmAutoDownloadPermission = useCallback(() => {
      setAutoDownloadPermission('granted');
    }, []);

    useEffect(() => {
      refreshWindowPermission();
      refreshAutoDownloadPermission();
      // Debug log
      console.log('Quiz/index.js useEffect - autoDownloadPermission state:', autoDownloadPermission);
      return () => {
        const watcher = windowPermissionStatusRef.current;
        if (watcher?.status && watcher?.handleChange) {
          watcher.status.removeEventListener?.('change', watcher.handleChange);
        }
        windowPermissionStatusRef.current = null;

        const autoWatcher = autoDownloadPermissionStatusRef.current;
        if (autoWatcher?.status && autoWatcher?.handleChange) {
          autoWatcher.status.removeEventListener?.('change', autoWatcher.handleChange);
        }
        autoDownloadPermissionStatusRef.current = null;
      };
    }, [refreshWindowPermission, refreshAutoDownloadPermission]);

    // helper to track polling start/stop
    const startPolling = (interval = 2000) => {
      try {
        if (pollRef.current) return; // already polling
        console.debug('startPolling -> interval', interval);
        pollRef.current = setInterval(() => {
          try {
            // always call detector; catch errors so interval continues
            detectExternalScreens().catch?.(err => console.warn('detectExternalScreens error (poll):', err));
            console.debug('poll tick - detectExternalScreens called');
          } catch (err) {
            console.warn('poll callback error:', err);
          }
        }, interval);
      } catch (e) {
        console.warn('startPolling failed', e);
      }
    };

    const stopPolling = () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
        console.debug('stopPolling');
      }
    };

    const prevExternalRef = useRef(null);
    const consecutiveFalseRef = useRef(0); // debounce counter for false negatives in fullscreen

    const detectExternalScreens = useCallback(async () => {
       try {
        // Try modern APIs first
        if (typeof window.getScreenDetails === 'function') {
          try {
            const details = await window.getScreenDetails();
            const screens = details?.screens || [];
            setExternalScreens(screens);
            setIsExternalConnected(screens.length > 1);
            setWindowPermission('granted');
            console.debug('detectExternalScreens -> getScreenDetails', screens.length);
            return;
          } catch (err) {
            if (err?.name === 'NotAllowedError') {
              setWindowPermission('denied');
            } else if (err?.name === 'NotSupportedError') {
              setWindowPermission('unsupported');
            } else {
              console.warn('getScreenDetails error', err);
            }
          }
        }
        if (typeof window.getScreens === 'function') {
          try {
            const res = await window.getScreens();
            const screens = res?.screens || [];
            setExternalScreens(screens);
            setIsExternalConnected(screens.length > 1);
            setWindowPermission('granted');
            console.debug('detectExternalScreens -> getScreens', screens.length);
            return;
          } catch (err) {
            if (err?.name === 'NotAllowedError') {
              setWindowPermission('denied');
            } else {
              console.warn('getScreens error', err);
            }
          }
        }

        // Heuristic fallback (several checks)
        const screenWidth = window.screen?.width || 0;
        const screenHeight = window.screen?.height || 0;
        const innerW = window.innerWidth || 0;
        const innerH = window.innerHeight || 0;
        const outerW = window.outerWidth || 0;
        const outerH = window.outerHeight || 0;

        const heuristic =
          screenWidth > innerW + 120 ||
          screenHeight > innerH + 120 ||
          Math.abs(outerW - innerW) > 200 ||
          Math.abs(outerH - innerH) > 200 ||
          Math.abs((window.screenX || 0)) > 50 ||
          Math.abs((window.screenY || 0)) > 50;

        let newIsExternal = Boolean(heuristic);
        // If we're in fullscreen, heuristics may return false temporarily -> debounce false negatives
        const inFullscreen = Boolean(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
        if (inFullscreen && prevExternalRef.current === true && newIsExternal === false) {
          consecutiveFalseRef.current = (consecutiveFalseRef.current || 0) + 1;
          // keep external=true until we see several consecutive false (avoid transient change)
          if (consecutiveFalseRef.current < 3) {
            newIsExternal = true;
          }
        } else {
          consecutiveFalseRef.current = 0;
        }

        setIsExternalConnected(newIsExternal);
        setExternalScreens([{ label: 'Primary (heuristic)', width: screenWidth, height: screenHeight }]);
        if (prevExternalRef.current !== newIsExternal) {
          console.debug('detectExternalScreens (heuristic) -> changed', { newIsExternal, screenWidth, innerW, outerW, inFullscreen, consecutive: consecutiveFalseRef.current });
          prevExternalRef.current = newIsExternal;
        }
         if (windowPermission !== 'denied' && windowPermission !== 'granted') {
           setWindowPermission(prev => (prev === 'unsupported' ? prev : 'heuristic'));
         }
       } catch (err) {
         console.warn('detectExternalScreens error', err);
       }
     }, [windowPermission]);

    // --- end mic/external shared logic ---

    useEffect(() => {
        return () => {
            setQuizParameters({});
            setQuizData({});
            disconnect();
        };
    }, []);

    const handleCancelledToast = (reason) => {
      console.log('Quiz/Assignment cancelled:', reason);
        showErrorToast(reason);
    };

    useEffect(() => {
      // detect on mount
      detectExternalScreens();
      // start robust polling
      startPolling(2000);

       const onResize = () => {
         console.debug('window resize -> detectExternalScreens');
         detectExternalScreens();
       };
      const onVisibility = () => {
        console.debug('visibilitychange -> detectExternalScreens');
        detectExternalScreens();
      };

      // run detection on fullscreen changes immediately
      const onFullscreenChange = () => {
        console.debug('fullscreenchange -> detectExternalScreens');
        // reset debounce when entering or exiting fullscreen
        consecutiveFalseRef.current = 0;
        detectExternalScreens();
      };
      document.addEventListener('fullscreenchange', onFullscreenChange);
      document.addEventListener('webkitfullscreenchange', onFullscreenChange);
      document.addEventListener('msfullscreenchange', onFullscreenChange);

      window.addEventListener('resize', onResize);
      window.addEventListener('orientationchange', onResize);
      document.addEventListener('visibilitychange', onVisibility);

      // listen for device changes (connect/disconnect of devices)
      try {
        if (navigator.mediaDevices && typeof navigator.mediaDevices.addEventListener === 'function') {
          navigator.mediaDevices.addEventListener('devicechange', detectExternalScreens);
        } else if (navigator.mediaDevices && typeof navigator.mediaDevices.ondevicechange !== 'undefined') {
          navigator.mediaDevices.ondevicechange = detectExternalScreens;
        }
      } catch (e) {
        console.warn('devicechange listener not supported', e);
      }

      // try to listen for multi-screen changes if browser supports the event
      try {
        window.addEventListener('screenschange', detectExternalScreens);
        window.addEventListener('screenchange', detectExternalScreens);
      } catch (e) {
        // ignore if not supported
      }

      return () => {
        window.removeEventListener('resize', onResize);
        window.removeEventListener('orientationchange', onResize);
        document.removeEventListener('visibilitychange', onVisibility);
        document.removeEventListener('fullscreenchange', onFullscreenChange);
        document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
        document.removeEventListener('msfullscreenchange', onFullscreenChange);
        try {
          window.removeEventListener('screenschange', detectExternalScreens);
          window.removeEventListener('screenchange', detectExternalScreens);
        } catch (e) {}
        try {
          if (navigator.mediaDevices && typeof navigator.mediaDevices.removeEventListener === 'function') {
            navigator.mediaDevices.removeEventListener('devicechange', detectExternalScreens);
          } else if (navigator.mediaDevices && typeof navigator.mediaDevices.ondevicechange !== 'undefined') {
            navigator.mediaDevices.ondevicechange = null;
          }
        } catch (e) {}
        stopPolling();
      };
    }, [detectExternalScreens]);

   // Re-run detection whenever visible screen/component changes so overlays update immediately
   useEffect(() => {
    // re-detect immediately when screen changes
    detectExternalScreens();
    // restart polling to ensure it's active for this screen
    stopPolling();
    startPolling(2000);
    return () => {
      stopPolling();
    };
  }, [selectedComponent, detectExternalScreens]);

    // check for available audioinput devices
    useEffect(() => {
      const checkDevices = async () => {
        try {
          if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
            setMicAvailable(null);
            return;
          }
          const devices = await navigator.mediaDevices.enumerateDevices();
          const hasInput = devices.some(d => d.kind === 'audioinput');
          setMicAvailable(Boolean(hasInput));
        } catch (err) {
          console.warn('enumerateDevices error', err);
          setMicAvailable(null);
        }
      };
      checkDevices();
    }, []);

    const requestMicAccess = async () => {
      setPermissionError('');
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setPermissionError('Browser does not support getUserMedia.');
          setMicPermission('denied');
          return false;
        }
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        micStreamRef.current = stream;
        setMicPermission('granted');
        setMicAvailable(true);
        return true;
      } catch (err) {
        console.warn('getUserMedia error:', err);
        if (err && (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError' || err.name === 'OverconstrainedError')) {
          setPermissionError('No microphone device found. Please connect a microphone and retry.');
          setMicAvailable(false);
        } else if (err && err.name === 'NotAllowedError') {
          setPermissionError('Permission denied. Allow microphone in the browser permission prompt or site settings.');
        } else {
          setPermissionError(err?.message || 'Microphone permission denied or error');
        }
        setMicPermission('denied');
        return false;
      }
    };

    useEffect(() => {
      return () => {
        if (micStreamRef.current) {
          micStreamRef.current.getTracks().forEach(t => t.stop());
          micStreamRef.current = null;
        }
      };
    }, []);

    // Protection overlay component used by multiple screens when blocking UI
const ProtectionOverlay = ({ children }) => (
  <Box
    sx={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.7)',
      zIndex: 2000,
      p: 2,
    }}
  >
    <Box sx={{ width: 'min(720px,95%)', bgcolor: '#1e1e1e', color: '#fff', p: 3, borderRadius: 2 }}>
      {children}
    </Box>
  </Box>
);

    return (
      <>
        {selectedComponent === 'quiz-listing' ? (
          <QuizListing
            course={course}
            setQuizParameters={setQuizParameters}
            setSelectedComponent={setSelectedComponent}
            connect={connect}
            isConnected={isConnected}
            disconnect={disconnect}
            quizzes={quizzes}
            setQuizzes={setQuizzes}
            handleCancelledToast={handleCancelledToast}
            // pass shared protection props
            micPermission={micPermission}
            permissionError={permissionError}
            micAvailable={micAvailable}
            requestMicAccess={requestMicAccess}
            isExternalConnected={isExternalConnected}
            externalScreens={externalScreens}
            detectExternalScreens={detectExternalScreens}
          />
        ) : selectedComponent === 'qr-code' ? (
          <QrCode
            setSelectedComponent={setSelectedComponent}
            quizParameters={quizParameters}
            isConnected={isConnected}
            emit={emit}
            on={on}
            micPermission={micPermission}
            permissionError={permissionError}
            micAvailable={micAvailable}
            requestMicAccess={requestMicAccess}
            isExternalConnected={isExternalConnected}
            externalScreens={externalScreens}
            detectExternalScreens={detectExternalScreens}
          />
        ) : selectedComponent === 'waiting' ? (
          <Waiting
            setSelectedComponent={setSelectedComponent}
            quizParameters={quizParameters}
            isConnected={isConnected}
            emit={emit}
            on={on}
            setQuizData={setQuizData}
            micPermission={micPermission}
            setMicPermission={setMicPermission}
            permissionError={permissionError}
            micAvailable={micAvailable}
            requestMicAccess={requestMicAccess}
            isExternalConnected={isExternalConnected}
            externalScreens={externalScreens}
            setIsExternalConnected={setIsExternalConnected}
            setExternalScreens={setExternalScreens}
            continueWithoutMic={continueWithoutMic}
            setContinueWithoutMic={setContinueWithoutMic}
            windowPermission={windowPermission}
            refreshWindowPermission={refreshWindowPermission}
            detectExternalScreens={detectExternalScreens}
            autoDownloadPermission={autoDownloadPermission}
            requestAutoDownloadPermission={requestAutoDownloadPermission}
            refreshAutoDownloadPermission={refreshAutoDownloadPermission}
            confirmAutoDownloadPermission={confirmAutoDownloadPermission}
          />
        ) : selectedComponent === 'quiz-attempt' ? (
          <QuizAttempt
            course={course}
            setSelectedComponent={setSelectedComponent}
            quizParameters={quizParameters}
            handleQuizCancelledToast={handleCancelledToast}
            quizData={quizData}
            isConnected={isConnected}
            emit={emit}
            on={on}
            disconnect={disconnect}
            micPermission={micPermission}
            setMicPermission={setMicPermission}
            permissionError={permissionError}
            micAvailable={micAvailable}
            requestMicAccess={requestMicAccess}
            isExternalConnected={isExternalConnected}
            externalScreens={externalScreens}
            detectExternalScreens={detectExternalScreens}
          />
        ) : selectedComponent === 'assignment' ? (
          <Assignment
            setSelectedComponent={setSelectedComponent}
            quizzes={quizParameters}
            quizData={quizData}
            handleAssignmentCancelledToast={handleCancelledToast}
            micPermission={micPermission}
            setMicPermission={setMicPermission}
            permissionError={permissionError}
            micAvailable={micAvailable}
            requestMicAccess={requestMicAccess}
            isExternalConnected={isExternalConnected}
            externalScreens={externalScreens}
            detectExternalScreens={detectExternalScreens}
            continueWithoutMic={continueWithoutMic} // Add this
            setContinueWithoutMic={setContinueWithoutMic} // Add this
            emit={emit}
            on={on}
            isConnected={isConnected}
          />
        ) : selectedComponent === 'test' ? (
          <MultiCodeFileEditor
            isLab={true}
            quizzes={quizzes}
            emit={emit}
            on={on}
            setSelectedComponent={setSelectedComponent}
            isConnected={isConnected}
            priviousCodeAnswers={defaultCodeFiles}
            setCodeAnswer={setCodeAnswer} // Add this prop
            setTestOutput={setTestOutput} // Add this prop
            onChange={value => setCodeAnswer(value)} // Add this prop
          />
        ) : null}
      </>
    );
};

export default Quiz;
