import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Box, Button, Typography } from '@mui/material';
import MultiCodeFileEditor from '../Quiz/MultiCodeFileEditor';

export default function Assignment({ setSelectedComponent, requestMicAccess, handleAssignmentCancelledToast, externalScreens, micAvailable, quizzes, detectExternalScreens, quizData, emit, on, isConnected, isExternalConnected, micPermission, setMicPermission }) {
    const containerRef = useRef(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isFullscreenReady, setIsFullscreenReady] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [cancelReason, setCancelReason] = useState('');
    const [cancelCountdown, setCancelCountdown] = useState(20);
    const [submitModalOpen, setSubmitModalOpen] = useState(false);
    const sourceQuestions = quizData?.subComponentStartedPayload?.allQuestions || [];
    console.log("Assignment component quizzes data:", { sourceQuestions });

    // Total duration across all questions (sum of config[].duration per question)
    const totalDurationSeconds = useMemo(() => {
        if (!Array.isArray(sourceQuestions)) return 0;
        return sourceQuestions.reduce((sum, q) => {
            if (!Array.isArray(q?.config)) return sum;
            const qDur = q.config.reduce((acc, cfg) => acc + (parseInt(cfg?.duration, 10) || 0), 0);
            return sum + qDur;
        }, 0);
    }, [sourceQuestions]);

    // Save in state for countdown
    const [quizTotalSeconds, setQuizTotalSeconds] = useState(0);
    const [countdownSeconds, setCountdownSeconds] = useState(0);
    const countdownTimerRef = useRef(null);
    const labTimerRef = useRef(null);

    const timePercentage = useMemo(() => {
        if (!quizTotalSeconds || quizTotalSeconds === 0) return 0;
        return Math.round((countdownSeconds / quizTotalSeconds) * 100);
    }, [countdownSeconds, quizTotalSeconds]);

    const timerStyles = useMemo(() => {
        if (timePercentage >= 51) {
            return {
                bgcolor: '#2E7D32', // green
                animation: 'none',
            };
        }

        if (timePercentage >= 21) {
            return {
                bgcolor: '#F9A825', // yellow
                animation: 'none',
            };
        }

        // 0% – 20%
        return {
            bgcolor: '#C62828', // red
            animation: 'heartbeat 1s infinite',
        };
    }, [timePercentage]);


    useEffect(() => {
        setQuizTotalSeconds(totalDurationSeconds);
        // Preload countdown with total while not started
        if (!isFullscreenReady) setCountdownSeconds(totalDurationSeconds);
    }, [totalDurationSeconds, isFullscreenReady]);

    useEffect(() => {
        return () => {
            if (countdownTimerRef.current) {
                clearInterval(countdownTimerRef.current);
                countdownTimerRef.current = null;
            }
        };
    }, []);

    const formatDuration = (secs) => {
        const h = Math.floor(secs / 3600);
        const m = Math.floor((secs % 3600) / 60);
        const s = secs % 60;
        if (h > 0) return `${h}h ${m}m ${s}s`;
        if (m > 0) return `${m}m ${s}s`;
        return `${s}s`;
    };

    useEffect(() => {
        console.log("Total quiz duration:", {
            seconds: totalDurationSeconds,
            formatted: formatDuration(totalDurationSeconds),
        });
        console.log("Countdown seconds (state):", countdownSeconds);
    }, [totalDurationSeconds, countdownSeconds]);

    // Safely parse previousAnswer with null/undefined check
    const defaultCodeFiles = {

    };



    // ✅ FINAL FIX: Robust JSON repair using character-by-character parsing (same as UnifiedCodeRichEditor)
    const safeJSONParse = (jsonString) => {
        if (!jsonString || typeof jsonString !== 'string') {
            console.warn("Invalid input to safeJSONParse:", typeof jsonString);
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
            console.log('⚠️ First parse failed, attempting character-by-character repair...');

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

                console.log('🔧 Repaired JSON (first 300 chars):', result.substring(0, 300));
                return JSON.parse(result);
            } catch (e2) {
                console.error('❌ Character-by-character repair failed:', e2);
                console.error('Failed at position:', e2.message);

                // Return safe default
                return {
                    pre: { style: "" },
                    code: {},
                    post: { style: "" }
                };
            }
        }
    };

    // ✅ ADD: Helper to unescape string values (same as QuizAttempt)
    const unescapeStringValue = (str) => {
        if (typeof str !== 'string') return str;

        return str
            .replace(/\\n/g, '\n')
            .replace(/\\r/g, '\r')
            .replace(/\\t/g, '\t')
            .replace(/\\"/g, '"')
            .replace(/\\\\/g, '\\');
    };

    // ✅ ADD: Helper to unescape all file values
    const unescapeFiles = (filesObj) => {
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

    const parsedQuestions = sourceQuestions.map((q) => {
        // ✅ MODIFIED: Use safeJSONParse instead of JSON.parse
        const parsedDescription = safeJSONParse(q.description);

        return {
            id: q.question_id,
            type: q.config[0]?.type?.value || "",
            description: {
                pre: parsedDescription?.pre?.style || "",
                code: unescapeFiles(parsedDescription?.code || {}), // ✅ Unescape code
                post: parsedDescription?.post?.style || "",
            },
            options: q.options || [],
        };
    });


    const currentQuestion = parsedQuestions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === parsedQuestions.length - 1;

    const handleNext = () => {
        if (currentQuestionIndex < parsedQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };
    const priviousCodeAnswers = (() => {
        try {
            const previousAnswer = quizData?.subComponentStartedPayload?.previousAnswer;

            // ✅ FIX: Check if previousAnswer exists and is valid
            if (previousAnswer && previousAnswer !== 'undefined') {
                try {
                    const parsed = JSON.parse(previousAnswer);
                    if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
                        console.log('✅ Using saved answer from previousAnswer');
                        return unescapeFiles(parsed);
                    }
                } catch (parseErr) {
                    console.warn('Failed to parse previousAnswer, falling back to question code');
                }
            }

            // ✅ FIX: Use question code if it exists
            if (currentQuestion?.description?.code &&
                typeof currentQuestion.description.code === 'object' &&
                Object.keys(currentQuestion.description.code).length > 0) {
                console.log('✅ Using code from currentQuestion');
                return unescapeFiles(currentQuestion.description.code);
            }

            // ✅ Final fallback to empty object
            console.log('⚠️ No code found, using empty default');
            return {};

        } catch (err) {
            console.error("Error in priviousCodeAnswers:", err);
            // ✅ Fallback to question code if error occurs
            if (currentQuestion?.description?.code) {
                return unescapeFiles(currentQuestion.description.code);
            }
            return {};
        }
    })();

    useEffect(() => {
        labTimerRef.current = countdownSeconds;
    }, [countdownSeconds]);

    console.log("Previous code answers for current question:", { priviousCodeAnswers, currentQuestion, parsedQuestions });
    useEffect(() => {
        // call shared detector if provided
        const detector = typeof detectExternalScreens === 'function' ? detectExternalScreens : null;
        if (detector) detector();
        const onResize = () => detector && detector();
        window.addEventListener('resize', onResize);
        document.addEventListener('visibilitychange', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
            document.removeEventListener('visibilitychange', onResize);
        };
    }, [detectExternalScreens]);
    useEffect(() => {
        if (!on) return;

        // Listen for current-query event (query raised successfully)
        const handleSubComponentEnded = (data) => {
            console.log('current-query event received:', data.message);
            if (data?.success) {
                setSelectedComponent("quiz-listing");
                console.log('Query raised successfully with ID:', data);
            }
        };


        on('subComponent-ended', handleSubComponentEnded);


        // Cleanup listeners
        return () => {
            try {
                if (typeof on === 'function' && typeof on.off === 'function') {
                    on.off('subComponent-ended', handleSubComponentEnded);
                }
            } catch (e) {
                console.warn('Error cleaning up socket listeners:', e);
            }
        };
    }, [on]);
    useEffect(() => {
        if (!isFullscreenReady) return; // Wait for user to trigger fullscreen

        const elem = containerRef.current;
        if (!elem) {
            console.error("Assignment container element not found");
            return;
        }

        let isAssignmentActive = true;
        let leaveTimer;

        // 1️⃣ Enter fullscreen
        const enterFullscreen = async () => {
            try {
                if (elem.requestFullscreen) await elem.requestFullscreen();
                else if (elem.webkitRequestFullscreen) await elem.webkitRequestFullscreen();
                else if (elem.msRequestFullscreen) await elem.msRequestFullscreen();
                else throw new Error("Fullscreen not supported");
                console.log("✅ Fullscreen entered successfully");
            } catch (error) {
                console.error("Fullscreen error:", error);
                // Don't throw - just log and continue
            }
        };

        // 2️⃣ End assignment safely
        const endAssignment = (reason) => {
            if (!isAssignmentActive) return;
            console.warn(`Assignment cancellation requested: ${reason}`);
            // Show confirmation modal instead of direct cancellation
            setCancelReason(reason);
            setShowCancelModal(true);
        };

        // Actual cancellation function
        const confirmCancellation = (reason) => {
            isAssignmentActive = false;
            setSelectedComponent("quiz-listing");
            if (document.fullscreenElement) {
                document.exitFullscreen().catch(console.error);
            }
            handleAssignmentCancelledToast(`Assignment cancelled due to ${reason}`);
        };

        // 3️⃣ Enhanced mouse leave detection
        const handleMouseMove = (e) => {
            // no modal/pending state — cancel immediately on violation
            clearTimeout(leaveTimer);

            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const threshold = -2; // pixels from edge

            const nearEdge =
                e.clientX <= threshold ||
                e.clientX >= viewportWidth - threshold ||
                e.clientY <= threshold ||
                e.clientY >= viewportHeight - threshold;

            if (nearEdge) {
                leaveTimer = setTimeout(() => {
                    endAssignment("mouse left the assignment area");
                }, 500);
            }
        };

        // 4️⃣ Fullscreen change handler
        const handleFullscreenChange = () => {
            if (
                !document.fullscreenElement &&
                !document.webkitFullscreenElement &&
                !document.msFullscreenElement
            ) {
                endAssignment("exited fullscreen mode");
            }
        };

        // 5️⃣ Visibility and focus handlers
        const handleBlur = () => {
            if (document.visibilityState === "visible") {
                endAssignment("window lost focus");
            }
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                endAssignment("tab/window was hidden");
            }
        };

        // 6️⃣ Keyboard shortcuts
        const handleKeyDown = (e) => {
            const allowedCtrlCombinations = {
                a: true,
                z: true,
                y: true,
                c: true,
                v: true,
                x: true,
                s: true,
                f: true,
                g: true,
                h: true,
                d: true,
                k: true,
                l: true,
                "/": true,
                "]": true,
                "[": true,
                ArrowUp: true,
                ArrowDown: true,
                Home: true,
                End: true,
                PageUp: true,
                PageDown: true,
                Control: true,
                Meta: true,
            };

            const blockedKeys = {
                Escape: true,
                F1: true,
                F2: true,
                F3: true,
                F4: true,
                F5: true,
                F6: true,
                F7: true,
                F8: true,
                F9: true,
                F10: true,
                F11: true,
                F12: true,
                Alt: false,
            };

            if (e.key.startsWith("F") && !isNaN(parseInt(e.key.slice(1)))) {
                e.preventDefault();
                endAssignment(`forbidden key pressed: ${e.key}`);
                return;
            }

            if (e.ctrlKey || e.metaKey) {
                if (allowedCtrlCombinations[e.key]) {
                    if (e.key === "s") e.preventDefault();
                    return;
                }
                e.preventDefault();
                endAssignment(
                    `forbidden key combination: ${e.ctrlKey ? "Ctrl" : "Cmd"}+${e.key}`
                );
                return;
            }

            if (blockedKeys[e.key]) {
                e.preventDefault();
                endAssignment(`forbidden key pressed: ${e.key}`);
            }

            if (
                e.key === "F12" ||
                (e.ctrlKey &&
                    e.shiftKey &&
                    (e.key === "I" || e.key === "J" || e.key === "C"))
            ) {
                e.preventDefault();
                endAssignment("developer tools access attempted");
            }
        };

        const isDevToolsOpen = () => {
            const widthThreshold =
                Math.abs(window.outerWidth - window.innerWidth) > 160;
            const heightThreshold =
                Math.abs(window.outerHeight - window.innerHeight) > 160;

            const consoleCheck = () => {
                const threshold = 160;
                const widthThreshold =
                    window.outerWidth - window.innerWidth > threshold;
                const heightThreshold =
                    window.outerHeight - window.innerHeight > threshold;
                return widthThreshold || heightThreshold;
            };

            const isChromeDevTools = widthThreshold || heightThreshold;
            const isFirefoxDevTools =
                window.console &&
                (window.console.firebug ||
                    (window.console.exception && window.console.table));
            const isSafariDevTools =
                navigator.userAgent.includes("Safari") &&
                !navigator.userAgent.includes("Chrome") &&
                window.console._commandLineAPI;

            return (
                isChromeDevTools || isFirefoxDevTools || isSafariDevTools || consoleCheck()
            );
        };

        const initializeAssignment = async () => {
            try {
                // Enter fullscreen (already triggered by user gesture)
                await enterFullscreen();

                const events = [
                    { target: document, type: "fullscreenchange", handler: handleFullscreenChange },
                    { target: document, type: "webkitfullscreenchange", handler: handleFullscreenChange },
                    { target: document, type: "msfullscreenchange", handler: handleFullscreenChange },
                    { target: window, type: "blur", handler: handleBlur },
                    { target: document, type: "visibilitychange", handler: handleVisibilityChange },
                    { target: document, type: "keydown", handler: handleKeyDown },
                    { target: document, type: "mousemove", handler: handleMouseMove },
                    { target: window, type: "devtoolschange", handler: isDevToolsOpen },
                ];

                events.forEach(({ target, type, handler }) => {
                    target.addEventListener(type, handler);
                });

                return () => {
                    events.forEach(({ target, type, handler }) => {
                        target.removeEventListener(type, handler);
                    });
                    clearTimeout(leaveTimer);
                };
            } catch (error) {
                console.error("Error initializing quiz:", error);
                endAssignment("error initializing quiz");
            }
        };

        const cleanup = initializeAssignment();

        return () => {
            isAssignmentActive = false;
            clearTimeout(leaveTimer);
            if (cleanup) cleanup.then((fn) => fn?.());
            if (document.fullscreenElement) {
                document.exitFullscreen().catch(console.error);
            }
        };
    }, [isFullscreenReady]);

    // Handle "Start Assignment" button click
    const handleStartAssignment = () => {
        setIsFullscreenReady(true); // Trigger fullscreen initialization

        // Start countdown from current or total
        if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
        setCountdownSeconds(prev => (prev > 0 ? prev : totalDurationSeconds));
        countdownTimerRef.current = setInterval(() => {
            setCountdownSeconds(prev => {
                if (prev <= 1) {
                    clearInterval(countdownTimerRef.current);
                    countdownTimerRef.current = null;
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // Times-up trigger for child auto-submit
    const [timesUp, setTimesUp] = useState(false);
    const timesUpFiredRef = useRef(false);

    useEffect(() => {
        // Fire only once when timer reaches 0 after start
        if (isFullscreenReady && countdownSeconds === 0 && !timesUpFiredRef.current) {
            timesUpFiredRef.current = true;
            setTimesUp(true);
        }
    }, [isFullscreenReady, countdownSeconds]);

    // Auto-cancel timer effect
    useEffect(() => {
        if (!showCancelModal) {
            setCancelCountdown(20); // Reset countdown when modal closes
            return;
        }

        const timer = setInterval(() => {
            setCancelCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleConfirmCancel(); // Auto-cancel when countdown reaches 0
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [showCancelModal]);

    // Handle user confirming cancellation
    const handleConfirmCancel = () => {
        setShowCancelModal(false);
        emit("leave-subComponent", { subComponentId: 2 });
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(console.error);
        }
        handleAssignmentCancelledToast(`Assignment cancelled due to ${cancelReason}`);
        setSelectedComponent('quiz-listing');
    };

    // Handle user continuing assignment
    const handleContinueAssignment = async () => {
        setShowCancelModal(false);
        setCancelReason('');
        // Re-enter fullscreen if exited
        const elem = containerRef.current;
        if (elem && !document.fullscreenElement) {
            try {
                if (elem.requestFullscreen) await elem.requestFullscreen();
                else if (elem.webkitRequestFullscreen) await elem.webkitRequestFullscreen();
                else if (elem.msRequestFullscreen) await elem.msRequestFullscreen();
            } catch (error) {
                console.error("Failed to re-enter fullscreen:", error);
            }
        }
    };

    return (
        <Box
            ref={containerRef}
            sx={{
                width: '100vw',
                minHeight: '100vh',
                overflow: 'hidden',
                backgroundColor: '#0f0f1e',
                display: 'flex',
            }}
        >
            {/* Cancellation Confirmation Modal */}
            {showCancelModal && (
                <Box
                    sx={{
                        position: 'fixed',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.85)',
                        zIndex: 20000,
                        p: 2,
                    }}
                >
                    <Box
                        sx={{
                            width: 'min(600px,95%)',
                            bgcolor: '#1e1e2f',
                            color: '#fff',
                            p: 4,
                            borderRadius: 3,
                            border: '2px solid #667eea',
                            boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)',
                        }}
                    >
                        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: '#FFD54F' }}>
                            ⚠️ Assignment Violation Detected
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1, color: '#e0e0e0' }}>
                            The assignment was interrupted due to:
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                mb: 3,
                                p: 2,
                                bgcolor: 'rgba(255, 213, 79, 0.1)',
                                borderRadius: 2,
                                borderLeft: '4px solid #FFD54F',
                                fontWeight: 'bold',
                                color: '#FFD54F',
                            }}
                        >
                            "{cancelReason}"
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: '#b0b0c0' }}>
                            Do you want to cancel the assignment or continue?
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                mb: 3,
                                color: '#FF6B6B',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                fontSize: '1.1rem'
                            }}
                        >
                            Auto-cancelling in {cancelCountdown} seconds...
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={handleContinueAssignment}
                                sx={{
                                    borderColor: '#667eea',
                                    color: '#667eea',
                                    fontWeight: 'bold',
                                    px: 3,
                                    py: 1,
                                    '&:hover': {
                                        borderColor: '#667eea',
                                        bgcolor: 'rgba(102, 126, 234, 0.1)',
                                    },
                                }}
                            >
                                Continue Assignment
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleConfirmCancel}
                                sx={{
                                    bgcolor: '#E53935',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    px: 3,
                                    py: 1,
                                    '&:hover': {
                                        bgcolor: '#C62828',
                                    },
                                }}
                            >
                                Cancel Assignment ({cancelCountdown}s)
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
                                    No audio input device detected. Connect a microphone or
                                    use "Continue without mic".
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
            {/* Show start screen if not ready */}
            {!isFullscreenReady ? (
                <Box
                    sx={{
                        position: 'fixed',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.9)',
                        zIndex: 10000,
                    }}
                >
                    <Box sx={{ textAlign: 'center', color: '#fff' }}>
                        <Typography variant="h4" sx={{ mb: 3 }}>
                            Ready to Start {quizzes?.componentName}?
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={handleStartAssignment}
                            sx={{
                                bgcolor: '#667eea',
                                px: 5,
                                py: 2,
                                fontSize: '1.1rem',
                                '&:hover': { bgcolor: '#764ba2' },
                            }}
                        >
                            Start {quizzes?.componentName}
                        </Button>
                    </Box>
                </Box>
            ) : null}

            {/* Left Side - Question Display */}
            <Box
                sx={{
                    width: '30%',
                    background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
                    borderRight: '2px solid #4C49ED',
                    p: 4,
                    pt: 8,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    boxShadow: '4px 0 20px rgba(76, 73, 237, 0.15)',
                }}
            >
                {quizTotalSeconds > 0 && (
                    <Box
                        sx={{
                            ml: 1,
                            px: 3,
                            py: 1.5,
                            borderRadius: 2,
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            textAlign: 'center',
                            minHeight: '40px',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            letterSpacing: '0.05em',
                            bgcolor: timerStyles.bgcolor,
                            animation: timerStyles.animation,
                            gap: '10px', // <-- Add gap between text and timer

                        }}
                        aria-label="time-remaining"
                    >
                        <span style={{ fontSize: '1.2rem', marginBottom: '2px' }}>Time Remaining</span>
                        {formatDuration(countdownSeconds)}
                    </Box>
                )}



                {/* Question Header */}
                <Box
                    sx={{
                        p: 2,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: 2,
                        color: 'white',
                        boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                >
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 0.5, color: 'white', }}>
                        Question {currentQuestionIndex + 1} of {parsedQuestions.length}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                            sx={{
                                px: 1.5,
                                py: 0.5,
                                bgcolor: 'rgba(255,255,255,0.25)',
                                borderRadius: 1,
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                backdropFilter: 'blur(10px)',
                            }}
                        >
                            {currentQuestion?.type?.toUpperCase() || 'CODE'}
                        </Box>
                        <Box sx={{ flex: 1 }} />
                        <Typography variant="caption" sx={{ opacity: 0.9 }}>
                            {Math.round(((currentQuestionIndex + 1) / parsedQuestions.length) * 100)}% Complete
                        </Typography>

                    </Box>
                </Box>

                {/* Question Content */}
                <Box
                    sx={{
                        flex: 1,
                        bgcolor: '#1e2a3f',
                        borderRadius: 2,
                        p: 3,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        border: '1px solid rgba(76, 73, 237, 0.2)',
                    }}
                >
                    {/* PRE - Question Text */}
                    {currentQuestion?.description?.pre && (
                        <Box
                            sx={{
                                mb: 3,
                                '& p': {
                                    fontSize: '1.05rem',
                                    lineHeight: 1.7,
                                    color: '#ffffff',
                                    margin: 0,
                                },
                                '& strong': {
                                    color: '#ffffff',
                                    fontWeight: 600,
                                },
                                '& ul, & li': {
                                    color: '#ffffff',
                                },
                            }}
                            dangerouslySetInnerHTML={{
                                __html: currentQuestion.description.pre,
                            }}
                        />
                    )}

                    {/* POST - Additional Info */}
                    {currentQuestion?.description?.post && (
                        <Box
                            sx={{
                                mt: 2,
                                p: 2.5,
                                bgcolor: 'rgba(102, 126, 234, 0.1)',
                                borderRadius: 2,
                                borderLeft: '4px solid #667eea',
                                position: 'relative',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(102, 126, 234, 0.2)',
                                '&::before': {
                                    position: 'absolute',
                                    top: 8,
                                    left: 8,
                                    fontSize: '1.2rem',
                                },
                                pl: 5,
                                '& p': {
                                    fontSize: '0.95rem',
                                    lineHeight: 1.6,
                                    color: '#ffffff',
                                    margin: 0,
                                },
                                '& ul, & li': {
                                    color: '#ffffff',
                                },
                            }}
                            dangerouslySetInnerHTML={{
                                __html: currentQuestion.description.post,
                            }}
                        />
                    )}
                </Box>

                {/* Navigation Buttons */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 2,
                        pt: 2,
                    }}
                >
                    <Button
                        variant="outlined"
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                        sx={{
                            flex: 1,
                            py: 1.2,
                            borderColor: '#667eea',
                            color: '#667eea',
                            fontWeight: 'bold',
                            borderWidth: 2,
                            borderRadius: 2,
                            textTransform: 'none',
                            backdropFilter: 'blur(10px)',
                            backgroundColor: 'rgba(102, 126, 234, 0.05)',
                            '&:hover': {
                                borderColor: '#667eea',
                                borderWidth: 2,
                                bgcolor: 'rgba(102, 126, 234, 0.15)',
                            },
                            '&:disabled': {
                                borderColor: '#3a3a4a',
                                color: '#5a5a6a',
                            },
                        }}
                    >
                        ← Previous
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={isLastQuestion}
                        sx={{
                            flex: 1,
                            py: 1.2,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            fontWeight: 'bold',
                            borderRadius: 2,
                            textTransform: 'none',
                            boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                                boxShadow: '0 8px 24px rgba(118, 75, 162, 0.5)',
                                transform: 'translateY(-2px)',
                            },
                            '&:disabled': {
                                background: '#3a3a4a',
                                color: '#6a6a7a',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        {isLastQuestion ? 'Last Question' : 'Next →'}
                    </Button>
                </Box>
            </Box>

            {/* Right Side - Code Editor */}
            <Box
                sx={{
                    width: '70%',
                    height: '100%',
                    overflowY: 'auto',
                    bgcolor: '#1e1e1e',
                }}
            >
                <MultiCodeFileEditor
                    isLab={true}
                    quizzes={quizzes}
                    emit={emit}
                    on={on}
                    setSelectedComponent={setSelectedComponent}
                    isConnected={isConnected}
                    priviousCodeAnswers={priviousCodeAnswers}
                    currentQuestion={currentQuestion}
                    questionIndex={currentQuestionIndex}
                    submitTrigger={timesUp}
                    isTestCaseFileEnabled={false}
                    key={currentQuestionIndex} // ✅ ADD: Force re-mount when question changes
                    containerRef={containerRef}
                    submitModalOpen={submitModalOpen}
                    setSubmitModalOpen={setSubmitModalOpen}
                    labTimerRef={labTimerRef.current}
                />
            </Box>
        </Box>
    );
}