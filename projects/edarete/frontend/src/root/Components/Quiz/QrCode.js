import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import QRCode from "qrcode";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PsychologyIcon from '@mui/icons-material/Psychology';
import CircularProgress from '@mui/material/CircularProgress';
import { constants } from "../../Common/Constants";
import { getServerResponse } from "../Helpers/getServerResponse";

const QrCode = ({
    setSelectedComponent,
    quizParameters,
    isConnected,
    emit,
    on,
    // protection props from index.js
    micPermission,
    permissionError,
    micAvailable,
    requestMicAccess,
    isExternalConnected,
    externalScreens,
    detectExternalScreens,
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
    const { userSelectedRole } = useSelector((state) => state.main);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [otpFailure, setOtpFailure] = useState(false);

    useEffect(() => {
        if (!isConnected) {
            console.log('Socket not connected, reconnecting...');
            return;
        }

        const handleAttendanceSuccess = (data) => {
            console.log('attendance-success event received with data:', data);
            if (data?.success) {
                setSelectedComponent("waiting");
            }
        };

        on('attendance-success', handleAttendanceSuccess);
    }, []);

    // Ensure we detect external screens when this screen mounts and while visible
    useEffect(() => {
        if (typeof detectExternalScreens === 'function') detectExternalScreens();
        const onResize = () => { if (typeof detectExternalScreens === 'function') detectExternalScreens(); };
        const onVisibility = () => { if (typeof detectExternalScreens === 'function') detectExternalScreens(); };
        window.addEventListener('resize', onResize);
        document.addEventListener('visibilitychange', onVisibility);
        return () => {
            window.removeEventListener('resize', onResize);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, [detectExternalScreens]);

    // If protection flags indicate an issue, we show an overlay that blocks interaction.
    const ProtectionOverlay = ({ children }) => (
        <Box sx={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.75)',
            zIndex: 2000,
            p: 2,
        }}>
            <Box sx={{ width: 'min(720px,95%)', bgcolor: '#1e1e1e', color: '#fff', p: 3, borderRadius: 2 }}>
                {children}
            </Box>
        </Box>
    );

    const servercommunication = {
        requestType: "POST",
        apiUrl: constants.qrCode,
        body: {
            actionPerformerURDD: userSelectedRole?.user_role_designation_department_id,
            quizId: quizId,
        },
        metaData: true,
        onSuccess: (res) => {
            console.log("On Success", res);
        },
        onFailure: (res) => {
            console.log("On Failure", res);
        },
    };

    const fetchCode = async (qrCode) => {
        const url = await QRCode.toDataURL(qrCode, {
            width: 250,
            color: {
                dark: "#000000",
                light: "#FFFFFF",
            },
        });
        setQrCodeUrl(url);
        setIsLoading(false);
        setOtpFailure(false);
    };

    const handleQRCode = () => {
        setIsLoading(true);
        setOtpFailure(false);
        const onSuccess = (res) => {
            console.log("On Success QR Code", res);
            fetchCode(res?.qrCode);
        }
        const onFailure = (err) => {
            console.log("On Failure QR Code", err);
            setIsLoading(false);
            setOtpFailure(true);
        }
        if (servercommunication.onSuccess) {
            servercommunication.onSuccess = onSuccess;
        }
        if (servercommunication.onFailure) {
            servercommunication.onFailure = onFailure;
        }
        getServerResponse(servercommunication);
    };

    return (
        <Box
            sx={{
                padding: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: 'space-between',
                alignItems: 'center',
                minHeight: '77.8vh',
                background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FF 100%)',
                boxShadow: '0px 4px 12px rgba(0,0,0,0.05)',
                borderRadius: "10px",
                boxSizing: "border-box",
            }}
        >
            

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    alignItems: "center",
                }}
            >
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
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <Button
                        sx={{
                            backgroundColor: "#4C49ED",
                            border: "1px solid #4C49ED",
                            paddingY: 1,
                            paddingX: 2,
                            color: "#FFFFFF",
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                                color: "#4C49ED",
                                borderColor: '#4C49ED',
                                backgroundColor: '#FFFFFF'
                            }
                        }}
                        onClick={handleQRCode}
                        disabled={isLoading}
                    >
                        Generate QR Code
                    </Button>
                    {
                        isLoading ? (
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mt: 11,
                            }}
                            >
                                <CircularProgress color="inherit" size={30} />
                            </Box >
                        ) : (
                            <>
                                {
                                    qrCodeUrl && (
                                        <Box
                                            component="img"
                                            src={qrCodeUrl}
                                            alt="QR Code"
                                            sx={{
                                                width: 200,
                                                height: 200
                                            }}
                                        />
                                    )
                                }
                                {
                                    otpFailure && (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                textAlign: 'center',
                                                mt: 8,
                                            }}
                                        >
                                            <Typography variant="h5" component="h4" gutterBottom>
                                                OTP Failure
                                            </Typography>
                                            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                                                Please try again
                                            </Typography>
                                        </Box>
                                    )
                                }
                            </>
                        )
                    }
                </Box>
            </Box>
        </Box>
    );
};

export default QrCode;