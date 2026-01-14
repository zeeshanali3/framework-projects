import React, { useState } from 'react';
import FileUpload from '../../Components/FileEditor/FileUpload';
import TextArea from '../../Components/FileEditor/TextArea';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const FileEditor = () => {
    const [editableText, setEditableText] = useState("");

    // ---------- Logs ----------
    console.log("Editable Text", editableText);

    return (
        <Stack
            direction={"column"}
            spacing={"15px"}
        >
            <Typography variant="h1" fontSize={"17px"} fontWeight={700}>File Editor</Typography>
            <Stack
                direction={"column"}
                spacing={4}
                sx={{
                    paddingX: 3,
                    paddingY: 2,
                    borderRadius: "12px",
                    boxSizing: "border-box",
                    backgroundColor: "#FFFFFF",
                }}
            >
                <Stack
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: editableText ? "auto" : "calc(100vh - 218.64px)",
                    }}
                >
                    <Box sx={{ width: "40%" }}>
                        <FileUpload
                            editableText={editableText}
                            setEditableText={setEditableText}
                        />
                    </Box>
                </Stack>
                <Box>
                    {
                        editableText && (
                            <TextArea
                                editableText={editableText}
                                setEditableText={setEditableText}
                            />
                        )
                    }
                </Box>
            </Stack>
        </Stack>
    )
}

export default FileEditor;