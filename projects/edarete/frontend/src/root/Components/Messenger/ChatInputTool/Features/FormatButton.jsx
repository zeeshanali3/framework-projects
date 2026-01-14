import React from 'react';
import { IconButton, Box } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';

import ItalicButton from './ItalicButton';
import UnderlineButton from './UnderlineButton';
import Link from './Link';
import CodeButton from './CodeButton';
import ColorPickerButton from './ColorPickerButton';

const FormatButton = ({
    onFormat,
    showBold = true,
    showItalic = true,
    showUnderline = true,
    showLink = true,
    showCode = true,
    showColor = true,
    selectedColor,
    setSelectedColor,
}) => {
    const applyFormat = (command, value = null) => {
        document.execCommand(command, false, value);
        if (onFormat) onFormat(command, value);
    };

    const handleLinkClick = () => {
        const url = prompt('Enter URL:');
        if (url) applyFormat('createLink', url);
    };

    const handleCodeClick = () => {
        applyFormat('insertHTML', '<code>code</code>');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 0.5,
                p: 0.5,
                flexWrap: 'wrap',
                alignItems: 'center',
                width: 'auto'
            }}
        >
            {showBold && (
                <IconButton onClick={() => applyFormat('bold')} size="small">
                    <FormatBoldIcon />
                </IconButton>
            )}

            {showItalic && (
                <ItalicButton onClick={() => applyFormat('italic')} />
            )}

            {showUnderline && (
                <UnderlineButton onClick={() => applyFormat('underline')} />
            )}

            {showLink && (
                <Link onClick={handleLinkClick} />
            )}

            {showCode && (
                <CodeButton onClick={handleCodeClick} />
            )}

            {showColor && (
                <ColorPickerButton
                    applyFormat={applyFormat}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                />
            )}
        </Box>
    );
};

export default FormatButton;
