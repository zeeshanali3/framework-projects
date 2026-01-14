import React, { useState, useRef } from 'react'
import {
    Box,
    IconButton,
    MenuItem,
    Menu,
} from '@mui/material'
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';

const Attachment = ({
    attachment = true,
    labels = ["Attach Image File", "Attach PDF File", "Attach Word File"],
    setSelectedFile
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedAcceptType, setSelectedAcceptType] = useState('');
    const fileInputRef = useRef(null);

    const fileTypes = {
        "image": "image/*",
        "pdf": ".pdf",
        "word": ".doc,.docx",
        "file": "image/*,.pdf,.doc,.docx", // fallback
    };

    const getAcceptType = (label) => {
        const lower = label.toLowerCase();
        if (lower.includes("image")) return fileTypes.image;
        if (lower.includes("pdf")) return fileTypes.pdf;
        if (lower.includes("word")) return fileTypes.word;
        return fileTypes.file;
    };

    const onFileSelectClick = (label) => {
        const accept = getAcceptType(label);
        setSelectedAcceptType(accept);
        setAnchorEl(null);
        setTimeout(() => {
            if (fileInputRef.current) {
                fileInputRef.current.click();
            }
        }, 0);
    };

    const onFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            console.log("Selected file:", file);
        }
    };

    return (
        <>
            {attachment && (
                <Box
                    sx={{
                        ml: { xs: -4, sm: 'auto' }
                    }}
                >
                    <IconButton
                        onClick={(event) => setAnchorEl(event.currentTarget)}
                        sx={{
                            backgroundColor: '#000000',
                            color: '#FFFFFF',
                            borderRadius: '50%',
                            '&:hover': {
                                backgroundColor: '#333333',
                            },
                        }}
                    >
                        <AddCircleOutline />
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                        PaperProps={{
                            sx: {
                                backgroundColor: '#FFFFFF',
                                borderRadius: '8px',
                            },
                        }}
                    >
                        {
                            Array.isArray(labels) && labels.length > 0 ? (
                                labels.map((item, index) => (
                                    <MenuItem
                                        key={index}
                                        onClick={() => onFileSelectClick(item)}
                                    >
                                        {item}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled>No attachments found</MenuItem>
                            )
                        }
                    </Menu>

                    <input
                        type="file"
                        accept={selectedAcceptType}
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={onFileChange}
                    />
                </Box>
            )}
        </>
    )
}

export default Attachment
