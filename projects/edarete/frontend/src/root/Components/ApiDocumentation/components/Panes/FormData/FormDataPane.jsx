import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    TextField,
    Select,
    MenuItem,
    Button,
    Typography,
    InputLabel,
    FormControl,
} from '@mui/material';

const FormDataPane = ({ paneValue, setPaneValue }) => {
    const [newKey, setNewKey] = useState('');
    const [newValue, setNewValue] = useState('');
    const [newType, setNewType] = useState('text');
    const [fileInputKey, setFileInputKey] = useState(Date.now());

    useEffect(() => {
        console.groupCollapsed('🔄 FormDataPane State Update');
        console.groupEnd();
    }, [paneValue, newKey, newValue, newType]);

    const handleAddPair = () => {
        if (!newKey.trim()) return;

        const newPair = {
            id: Date.now(),
            key: newKey,
            value: newType === 'file' ? null : newValue,
            type: newType,
            file: newType === 'file' ? newValue : null,
        };

        setPaneValue([...paneValue, newPair]);
        setNewKey('');
        setNewValue('');
        setNewType('text');
        setFileInputKey(Date.now());
    };

    const handleRemovePair = (id) => {
        setPaneValue(paneValue.filter((item) => item.id !== id));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setNewValue(file);
    };

    const handleTextValueChange = (id, newVal) => {
        setPaneValue(
            paneValue?.map((item) =>
                item.id === id ? { ...item, value: newVal } : item
            )
        );
    };

    const handleFileValueChange = (id, file) => {
        setPaneValue(
            paneValue?.map((item) =>
                item.id === id ? { ...item, file: file } : item
            )
        );
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Form Data
            </Typography>

            {/* Input Row */}
            <Grid container spacing={2} mb={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        label="Key"
                        fullWidth
                        value={newKey}
                        onChange={(e) => setNewKey(e.target.value)}
                        size="small"
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={newType}
                            onChange={(e) => setNewType(e.target.value)}
                            label="Type"
                        >
                            <MenuItem value="text">Text</MenuItem>
                            <MenuItem value="file">File</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    {newType === 'file' ? (
                        <input
                            key={fileInputKey}
                            type="file"
                            onChange={handleFileChange}
                            accept="*"
                            style={{ width: '100%' }}
                        />
                    ) : (
                        <TextField
                            label="Value"
                            fullWidth
                            value={newValue}
                            onChange={(e) => setNewValue(e.target.value)}
                            size="small"
                        />
                    )}
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleAddPair}
                        color="primary"
                    >
                        Add
                    </Button>
                </Grid>
            </Grid>

            {/* Data Table */}
            {paneValue.length > 0 && (
                <Box border={1} borderColor="grey.300" borderRadius={1}>
                    <Grid container sx={{ bgcolor: 'grey.100', p: 2 }}>
                        <Grid item xs={12} sm={4}>
                            <Typography fontWeight="bold">Key</Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography fontWeight="bold">Type</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography fontWeight="bold">Value</Typography>
                        </Grid>
                        <Grid item xs={12} sm={1}>
                            <Typography fontWeight="bold">Action</Typography>
                        </Grid>
                    </Grid>

                    {paneValue?.map((item) => (
                        <Grid
                            container
                            spacing={2}
                            key={item.id}
                            sx={{ p: 2, borderTop: '1px solid #ddd' }}
                            alignItems="center"
                        >
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    value={item.key}
                                    onChange={(e) =>
                                        handleTextValueChange(item.id, e.target.value)
                                    }
                                    size="small"
                                />
                            </Grid>

                            <Grid item xs={12} sm={3}>
                                <Typography>{item.type === 'file' ? 'File' : 'Text'}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                {item.type === 'file' ? (
                                    <Box display="flex" alignItems="center" gap={1}>
                                        {item.file ? (
                                            <>
                                                <Typography noWrap>{item.file.name}</Typography>
                                                <input
                                                    type="file"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) handleFileValueChange(item.id, file);
                                                    }}
                                                    accept="*"
                                                    style={{ flexGrow: 1 }}
                                                />
                                            </>
                                        ) : (
                                            <Typography>No file chosen</Typography>
                                        )}
                                    </Box>
                                ) : (
                                    <TextField
                                        fullWidth
                                        value={item.value || ''}
                                        onChange={(e) =>
                                            handleTextValueChange(item.id, e.target.value)
                                        }
                                        size="small"
                                    />
                                )}
                            </Grid>

                            <Grid item xs={12} sm={1}>
                                <Button
                                    color="error"
                                    onClick={() => handleRemovePair(item.id)}
                                    size="small"
                                >
                                    Remove
                                </Button>
                            </Grid>
                        </Grid>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default FormDataPane;
