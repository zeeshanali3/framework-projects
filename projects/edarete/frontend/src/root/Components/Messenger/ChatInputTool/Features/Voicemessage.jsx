import React, { useState, useRef } from 'react';
import { IconButton, Box } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';

const VoiceMessage = ({ onVoiceRecorded, onRecordingStatusChange, voice = true }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioChunks, setAudioChunks] = useState([]);
    const mediaRecorderRef = useRef(null);

    const handleMicClick = async () => {
        if (isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            onRecordingStatusChange?.(false);
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            setAudioChunks([]);

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    setAudioChunks((prev) => [...prev, e.data]);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(audioChunks, { type: 'audio/webm' });
                const url = URL.createObjectURL(blob);
                onVoiceRecorded?.(blob, url);
                onRecordingStatusChange?.(false);
            };

            mediaRecorder.start();
            setIsRecording(true);
            onRecordingStatusChange?.(true);
        } catch (err) {
            console.error("Microphone access error:", err);
        }
    };

    // If `show` is false, don't render anything
    if (!voice) return null;

    return (
        <Box>
            <IconButton
                onClick={handleMicClick}
                sx={{
                    color: isRecording ? 'red' : 'black',
                }}
            >
                <MicIcon />
            </IconButton>
        </Box>
    );
};

export default VoiceMessage;
