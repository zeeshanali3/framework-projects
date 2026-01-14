import React, { useEffect, useMemo, useState } from "react";
import devtoolsDetect from 'devtools-detect';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PsychologyIcon from '@mui/icons-material/Psychology';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import Modal from '@mui/material/Modal';
const PROCTORING_RESTRICTIONS = [
  'Stay in fullscreen; Escape or F11/F10 exits are blocked.',
  'Do not open other tabs, windows, or minimize the exam window.',
  'Avoid developer tools shortcuts (F12, Ctrl/Cmd+Shift+I/J/C,Alt).',
  'Skip Alt/Cmd+Tab switching to other apps.',
  'Only basic clipboard keys are allowed (copy/paste/select all).',
  'Keep the pointer inside the exam window and disconnect extra displays.',
];

const Waiting = ({
  setSelectedComponent,
  quizParameters,
  isConnected,
  emit,
  on,
  setQuizData,
  requestMicAccess,
  micAvailable,
  detectExternalScreens,
  isExternalConnected,
  micPermission,
  setMicPermission,
  externalScreens = [],
  setExternalScreens,
  setIsExternalConnected,
  continueWithoutMic = false,
  setContinueWithoutMic,
  windowPermission = 'unknown',
  refreshWindowPermission,
  onPreQuizViolation,
  autoDownloadPermission = 'prompt',
  requestAutoDownloadPermission,
  refreshAutoDownloadPermission,
  confirmAutoDownloadPermission,
}) => {
  const {
    quizId,
    courseId,
    courseName,
    quizName,
    quizDescription,
    startTime,
    endTime,
  } = quizParameters || {};

  const [violation, setViolation] = useState(null);
  const [proctoringResetKey, setProctoringResetKey] = useState(0);
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(devtoolsDetect.isOpen);
  
  // Local state - user must confirm auto-download permission each time they enter waiting screen
  const [localAutoDownloadConfirmed, setLocalAutoDownloadConfirmed] = useState(false);
  
  // Show modal if not locally confirmed
  const showAutoDownloadModal = !localAutoDownloadConfirmed;

  const handleConfirmAutoDownload = () => {
    setLocalAutoDownloadConfirmed(true);
    confirmAutoDownloadPermission?.();
  };

  const handleProctoringRefresh = () => {
    setViolation(null);
    setProctoringResetKey(prev => prev + 1);
    detectExternalScreens?.();
    refreshWindowPermission?.();
    refreshAutoDownloadPermission?.();
  };

  const permissionChecklist = useMemo(() => {
    const items = [];

    let micStatus = 'pending';
    let micDetail = 'Awaiting microphone permission inside your browser.';
    if (continueWithoutMic) {
      micStatus = 'complete';
      micDetail = 'Proceeding without microphone after manual confirmation.';
    } else if (micPermission === 'granted') {
      micStatus = 'complete';
      micDetail = 'Microphone permission granted.';
    } else if (micPermission === 'denied') {
      micStatus = 'action';
      micDetail = 'Permission denied. Enable microphone access in browser settings.';
    }
    if (micAvailable === false && !continueWithoutMic && micPermission !== 'granted') {
      micStatus = 'action';
      micDetail = 'No audio input detected. Connect a microphone or continue without mic.';
    }
    items.push({
      id: 'microphone-access',
      label: 'Microphone access',
      status: micStatus,
      detail: micDetail,
    });

    const permissionState = windowPermission || 'unknown';
    let windowStatus = 'pending';
    let windowDetail = 'Awaiting access to manage or view connected displays.';
    if (permissionState === 'granted') {
      windowStatus = 'complete';
      windowDetail = 'Window management permission granted.';
    } else if (permissionState === 'denied') {
      windowStatus = 'action';
      windowDetail = 'Permission denied. Allow “Window management” from your browser site settings.';
    } else if (permissionState === 'unsupported') {
      windowStatus = 'pending';
      windowDetail = 'Browser does not expose window management permission. Using heuristic detection.';
    } else if (permissionState === 'heuristic') {
      windowStatus = 'pending';
      windowDetail = 'Permission unavailable; relying on heuristic screen detection.';
    } else if (permissionState === 'error') {
      windowStatus = 'action';
      windowDetail = 'Unable to verify window management permission.';
    }

    items.push({
      id: 'window-permission',
      label: 'Window management access',
      status: windowStatus,
      detail: windowDetail,
    });

  

    if (violation) {
      items.push({
        id: 'proctoring-violation',
        label: 'Secure environment ready',
        status: 'action',
        detail: `Violation detected: ${violation}. Resolve before continuing.`,
      });
    }

    const externalCount = Array.isArray(externalScreens)
      ? externalScreens.length
      : undefined;
    const hasExternal = Boolean(isExternalConnected);
    items.push({
      id: 'external-screens',
      label: 'External displays disconnected',
      status: hasExternal ? 'action' : 'complete',
      detail: hasExternal
        ? `Detected ${externalCount ?? 'multiple'} displays. Disconnect external screens before continuing.`
        : 'Only a single display is currently active.',
    });

    items.push({
      id: 'server-connection',
      label: 'Connected to exam server',
      status: isConnected ? 'complete' : 'pending',
      detail: isConnected
        ? 'Socket connection established successfully.'
        : 'Waiting for a stable connection to the exam server.',
    });

    return items;
  }, [
    micPermission,
    micAvailable,
    continueWithoutMic,
    isExternalConnected,
    externalScreens,
    isConnected,
    windowPermission,
    localAutoDownloadConfirmed,
    violation,
  ]);




  const statusMeta = useMemo(
    () => ({
      complete: {
        icon: (
          <CheckCircleOutlineIcon
            fontSize="small"
            sx={{ color: '#43a047' }}
          />
        ),
        label: 'Complete',
        color: '#43a047',
      },
      pending: {
        icon: (
          <HourglassBottomIcon
            fontSize="small"
            sx={{ color: '#fb8c00' }}
          />
        ),
        label: 'Pending',
        color: '#fb8c00',
      },
      action: {
        icon: (
          <ErrorOutlineIcon
            fontSize="small"
            sx={{ color: '#e53935' }}
          />
        ),
        label: 'Action required',
        color: '#e53935',
      },
    }),
    []
  );

  useEffect(() => {
    if (!isConnected) {
      console.log('Socket not connected, reconnecting...');
      return;
    }

    const handleQuizStarted = data => {
      console.log('quiz-started event received with data:', data);
      if (data) {
        setQuizData(data);
        if (data.subComponent?.toLowerCase() === 'quiz') {
          setSelectedComponent('quiz-attempt');
        } else {
          setSelectedComponent('assignment');
        }
      }
    };

    on('subComponent-started', handleQuizStarted);
    // best-effort cleanup if `off` exists
    return () => {
      try {
        if (typeof on === 'function' && typeof on.off === 'function')
          on.off('subComponent-started', handleQuizStarted);
      } catch (e) { }
    };
  }, [on]);

  // local fallback detection (used only if no shared detectExternalScreens prop)
  const localDetectExternalScreens = async () => {
    try {
      if (typeof window.getScreenDetails === 'function') {
        const details = await window.getScreenDetails();
        const screens = details?.screens || [];
        setExternalScreens?.(screens);
        setIsExternalConnected?.(screens.length > 1);
        return;
      }
      if (typeof window.getScreens === 'function') {
        const res = await window.getScreens();
        const screens = res?.screens || [];
        setExternalScreens?.(screens);
        setIsExternalConnected?.(screens.length > 1);
        return;
      }
      const heuristic =
        window.screen &&
        (window.screen.width > window.innerWidth ||
          window.screen.height > window.innerHeight);
      setIsExternalConnected?.(Boolean(heuristic));
      setExternalScreens?.([
        {
          label: 'Primary (heuristic)',
          width: window.screen.width,
          height: window.screen.height,
        },
      ]);
    } catch (err) {
      console.warn('detectExternalScreens error', err);
    }
  };

  useEffect(() => {
    const detector =
      typeof detectExternalScreens === 'function'
        ? detectExternalScreens
        : localDetectExternalScreens;
    detector();
    const onResize = () => detector();
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    document.addEventListener('visibilitychange', onResize);
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
      window.removeEventListener('orientationchange', onResize);
      document.removeEventListener('visibilitychange', onResize);
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
  }, []);

  // Developer tools detection
  useEffect(() => {
    const handleChange = event => {
      setIsDevToolsOpen(event.detail.isOpen);
    };

    window.addEventListener('devtoolschange', handleChange);

    return () => {
      window.removeEventListener('devtoolschange', handleChange);
    };
  }, []);

  return (
    <Box
      sx={{
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '77.8vh',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FF 100%)',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.05)',
        borderRadius: '10px',
        boxSizing: 'border-box',
      }}
    >
      {/* Overlays */}
      {windowPermission === 'denied' && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.75)',
            zIndex: 1700,
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
            <Typography variant="h6" sx={{ color: '#FFB300', mb: 1 }}>
              Screen Permission Needed
            </Typography>
            <Typography variant="body2" sx={{ color: '#ddd', mb: 2 }}>
              Enable “Window management” permission from your browser&apos;s site settings so we can detect additional displays.
            </Typography>
            <Typography variant="caption" sx={{ color: '#999', display: 'block', mb: 2 }}>
              In Chrome: select the lock icon → set Window management to Allow → Re-open this page if prompted.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                onClick={handleProctoringRefresh}
                sx={{ bgcolor: '#4C49ED', color: '#fff' }}
              >
                Re-check
              </Button>
            </Box>
          </Box>
        </Box>
      )}
   
      {isExternalConnected && externalScreens?.length > 1 && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)',
            zIndex: 1600,
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
              An external screen has been detected. For exam security please
              disconnect any external displays before continuing.
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: '#999', display: 'block', mb: 2 }}
            >
              Detected screens: {externalScreens?.length || 1}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                onClick={handleProctoringRefresh}
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
                <Typography variant="caption" sx={{ color: '#ff8a80', mb: 2 }}>
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
                      setContinueWithoutMic?.(true);
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

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          <PsychologyIcon
            sx={{
              color: '#4C49ED',
              fontSize: 70,
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            {quizName || 'Quiz'}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            {quizDescription || 'Description'}
          </Typography>
        </Box>
      </Box>
      <Modal
        open={isDevToolsOpen}
        onClose={() => { }} // Prevent manual closing - modal closes automatically when dev tools are closed
        disableEscapeKeyDown
        disableBackdropClick
        sx={{ zIndex: 1600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box sx={{ bgcolor: '#1e1e1e', color: '#fff', p: 3, borderRadius: 2, minWidth: 320, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: '#FFD54F', mb: 1 }}>
            ⚠️ Developer Tools Detected
          </Typography>
          <Typography variant="body2" sx={{ color: '#ddd' }}>
            Please close Developer Tools / Inspect to continue the secure exam.
          </Typography>
        </Box>
      </Modal>
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          height: 24,
          '& > div': {
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
            animation: 'bounce 1.4s infinite ease-in-out both',
            '&:nth-of-type(1)': { animationDelay: '0.32s' },
            '&:nth-of-type(2)': { animationDelay: '0.16s' },
          },
          '@keyframes bounce': {
            '0%, 80%, 100%': {
              transform: 'translateY(0)',
            },
            '40%': {
              transform: 'translateY(-6px)',
            },
          },
        }}
      >
        <Box sx={{ mx: 0.5 }} />
        <Box sx={{ mx: 0.5 }} />
        <Box sx={{ mx: 0.5 }} />
      </Box>
      <Box
        sx={{
          width: '100%',
          maxWidth: 480,
          mt: 4,
          bgcolor: '#fff',
          borderRadius: 2,
          boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
          p: 2.5,
        }}
      >
        {violation && (
          <Box
            sx={{
              mb: 2,
              p: 1.5,
              borderRadius: 1,
              bgcolor: 'rgba(230,57,53,0.1)',
              border: '1px solid rgba(230,57,53,0.4)',
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: '#e53935', fontWeight: 600, mb: 0.5 }}
            >
              Security warning detected
            </Typography>
            <Typography variant="caption" sx={{ color: '#b71c1c' }}>
              {violation}. Resolve this issue before starting the quiz.
            </Typography>
          </Box>
        )}
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 600, mb: 1.5, color: '#4C49ED' }}
        >
          Requirements checklist
        </Typography>
        <Box
          sx={{
            mb: 1.5,
            p: 1.5,
            borderRadius: 1,
            bgcolor: 'rgba(76,73,237,0.05)',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              textTransform: 'uppercase',
              letterSpacing: 0.6,
              fontWeight: 600,
              color: '#4C49ED',
            }}
          >
            Proctoring restrictions
          </Typography>
          <Box component="ul" sx={{ m: 0, mt: 1, pl: 2 }}>
            {PROCTORING_RESTRICTIONS.map(rule => (
              <Typography
                component="li"
                variant="caption"
                key={rule}
                sx={{ color: 'text.secondary', mb: 0.5 }}
              >
                {rule}
              </Typography>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.5 }}>
            <Button
              size="small"
              onClick={handleProctoringRefresh}
              sx={{ textTransform: 'none', fontWeight: 600, color: '#4C49ED' }}
            >
              Re-run security checks
            </Button>
          </Box>
        </Box>
        <List disablePadding>
          {permissionChecklist.map(item => {
            const meta = statusMeta[item.status] || statusMeta.pending;
            return (
              <ListItem
                key={item.id}
                sx={{
                  alignItems: 'flex-start',
                  py: 1.25,
                  '&:not(:last-of-type)': {
                    borderBottom: '1px solid rgba(0,0,0,0.08)',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>{meta.icon}</ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ fontWeight: 600, variant: 'body1' }}
                  primary={item.label}
                  secondary={
                    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 0.5 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: meta.color,
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: 0.4,
                        }}
                      >
                        {meta.label}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: 'text.secondary', mt: 0.25 }}
                      >
                        {item.detail}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: '0.9rem',
          }}
        >
          Please wait while we set everything up
        </Typography>
      </Box>
    </Box>
  );
};

export default Waiting;