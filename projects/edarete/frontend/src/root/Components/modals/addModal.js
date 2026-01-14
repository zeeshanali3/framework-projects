import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    IconButton,
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
} from '@mui/material';
import { Close } from '@mui/icons-material';

const AddModal = ({ open, handleClose, fields, handleOnAddButton, title, selectedLeaderboardForUpdate,ButtonTitle }) => {
    console.log("selectedLeaderboardForUpdate", selectedLeaderboardForUpdate)
    React.useEffect(() => {
        if(fields && !selectedLeaderboardForUpdate)
        {
            fields.map((field) => {
                setFormValues((prevValues) => ({
                    ...prevValues,
                    [field.name]: field.defaultValue || '',
                }));
                
            })
        }
    },[fields])

    React.useEffect(() => {
        if (selectedLeaderboardForUpdate) {
            setFormValues({
                Leaderboard: selectedLeaderboardForUpdate?.LeaderboardName || '',
                LeaderboardComponents: selectedLeaderboardForUpdate?.SubComponentData?.map(sub => sub.SubComponentId) || [], // Default for multiSelect
                Status: selectedLeaderboardForUpdate?.Status || 'Draft',
                Positions: selectedLeaderboardForUpdate?.NumberOfPositions || 0,
            });
                    const percentageFields = selectedLeaderboardForUpdate?.SubComponentData?.map((sub) => {
                        const componentId = sub.SubComponentId;
                        const componentLabel = sub.ComponentName + " " + sub.SubComponentNum;
                        setFormValues((prevValues) => ({
                            ...prevValues,
                            [`Percentage_${componentId}`]: sub.SubcomponentPercentage,
                        }));

    
                    return {
                        name: `Percentage_${componentId}`,
                        label: `${componentLabel} Percentage`,
                        type: 'number',
                        defaultValue: sub.SubcomponentPercentage,
                        min: 0,
                        max: 100
                    };
                });
    
                setDynamicFields(percentageFields); // Update dynamic fields based on selected components
            
        }},[selectedLeaderboardForUpdate])
    const [formValues, setFormValues] = React.useState({
        Leaderboard: selectedLeaderboardForUpdate?.LeaderboardName || '',
        LeaderboardComponents: selectedLeaderboardForUpdate?.LeaderboardComponents || [], // Default multiSelect
        Status: selectedLeaderboardForUpdate?.Status || 'Draft', // Default select option
        Positions: selectedLeaderboardForUpdate?.NumberOfPositions || 0, // Default number input

    });


    const [dynamicFields, setDynamicFields] = React.useState([]); // State to manage dynamic percentage fields

    // Handle form field changes
    const handleChange = (name, value) => {
        if (name === 'LeaderboardComponents') {
            const percentageFields = value.map((componentId) => {
                const componentLabel = fields.find((field) => field.name === 'LeaderboardComponents')?.options
                    .find((option) => option.value === componentId)?.label;

                return {
                    name: `Percentage_${componentId}`,
                    label: `${componentLabel} Percentage`,
                    type: 'number',
                    defaultValue: 0,
                    min: 0,
                    max: 100
                };
            });

            setDynamicFields(percentageFields); // Update dynamic fields based on selected components
        }
        if (name.startsWith("Percentage_")) {
            // Use a regex to ensure only digits (whole numbers) are allowed
            const numericValue = value.replace(/.[^0-9]/g, ''); // Removes any non-digit characters

            // Parse and set the value if it's a valid integer between 0 and 100
            const parsedValue = parseInt(numericValue, 10);
            if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 100) {
                setFormValues((prevValues) => ({
                    ...prevValues,
                    [name]: parsedValue,
                }));
            } else {
                setFormValues((prevValues) => ({
                    ...prevValues,
                    [name]: '',
                }));
            }
        } else {
            setFormValues((prevValues) => ({
                ...prevValues,
                [name]: value,
            }));
        }
    };

    const handleAddClick = () => {
        handleOnAddButton(formValues);
        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            sx={{
                '& .MuiPaper-root': {
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                },
            }}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px' }}>
                <Typography sx={{ color: '#1976d2' }} variant="h6">Add New {title}</Typography>
                <IconButton onClick={handleClose}>
                    <Close sx={{ color: "red" }} />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ padding: '24px' }}>
                {fields.map((field, index) => (
                    <Box key={index} sx={{ marginBottom: '20px' }}>
                        {field.type === 'multiSelect' ? (
                            <FormControl fullWidth>
                                <InputLabel>{field.label}</InputLabel>
                                <Select
                                    label={field.label}
                                    multiple
                                    value={formValues[field.name]}  // Default values handled here
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                    renderValue={(selected) =>
                                        selected.map(id =>
                                            field.options.find(option => option.value === id)?.label
                                        ).join(', ')
                                    }
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            background: '#f8f9fa',
                                        },
                                    }}
                                >
                                    {field.options.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            <Checkbox checked={formValues[field.name]?.indexOf(option.value) > -1} />
                                            <ListItemText primary={option.label} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        ) : field.type === "Select" ? (
                            <FormControl fullWidth>
                                <InputLabel>{field.label}</InputLabel>
                                <Select
                                    label={field.label}
                                    value={formValues[field.name]}  // Default value for select
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            background: '#f8f9fa',
                                        },
                                    }}
                                >
                                    {field.options.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        ) : field.type === "number" ? (
                            <TextField
                                label={field.label}
                                variant="outlined"
                                size="medium"
                                fullWidth
                                type="number"
                                value={formValues[field.name]}  // Default value for number input
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                inputProps={{ min: field.min, max: field.max }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        background: '#f8f9fa',
                                    },
                                }}
                            />
                        ) : (
                            <TextField
                                label={field.label}
                                variant="outlined"
                                size="medium"
                                fullWidth
                                value={formValues[field.name]}  // Default value for text input
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        background: '#f8f9fa',
                                    },
                                }}
                            />
                        )}
                    </Box>
                ))}

                {/* Render dynamic percentage fields */}
                {dynamicFields?.length > 0 && (
                    <>
                        <Typography variant="h6" sx={{ marginBottom: '16px', color: '#1976d2' }}>
                            Set Percentages for Selected Components
                        </Typography>
                        {dynamicFields.map((field, index) => (
                            <Box key={index} sx={{ marginBottom: '20px' }}>
                                <TextField
                                    label={field.label}
                                    variant="outlined"
                                    size="medium"
                                    fullWidth
                                    type="number"
                                    value={formValues[field.name] || ''}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                    inputProps={{ min: field.min, max: field.max }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            background: '#f8f9fa',
                                        },
                                    }}
                                />
                            </Box>
                        ))}
                    </>
                )}

            </DialogContent>
            <DialogActions sx={{ padding: '16px 24px' }}>
                <Button
                    onClick={handleAddClick}
                    variant="contained"
                    sx={{
                        width: '100px',
                        backgroundColor: '#4CAF50',
                        '&:hover': {
                            backgroundColor: '#45A049',
                        },
                        borderRadius: '8px',
                        padding: '10px 20px',
                    }}
                >
                    {ButtonTitle}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddModal;
