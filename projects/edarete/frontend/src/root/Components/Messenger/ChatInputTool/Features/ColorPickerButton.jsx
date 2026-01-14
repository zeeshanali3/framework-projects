import React, { useState } from 'react';
import { IconButton, Box } from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';
import { ChromePicker } from 'react-color';

const ColorPickerButton = ({ applyFormat, selectedColor, setSelectedColor }) => {
    const [showColorPicker, setShowColorPicker] = useState(false);

    const toggleColorPicker = () => {
        setShowColorPicker((prev) => !prev);
    };

    const handleColorChange = (color) => {
        applyFormat('foreColor', color.hex);
        if (setSelectedColor) setSelectedColor(color.hex);
        setShowColorPicker(false);
    };

    return (
        <>
            <IconButton onClick={toggleColorPicker} size="small" sx={{ ml: 'auto' }}>
                <PaletteIcon />
            </IconButton>

            {showColorPicker && (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 120,
                        zIndex: 1500,
                        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                        borderRadius: 1,
                        backgroundColor: 'white',
                    }}
                >
                    <ChromePicker
                        color={selectedColor}
                        onChangeComplete={handleColorChange}
                    />
                </Box>
            )}
        </>
    );
};

export default ColorPickerButton;
