import React, { useState } from 'react';
import { Box, IconButton, Popover } from '@mui/material';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import FormatButton from './FormatButton';

const Formatting = ({
  showBold = true,
  showItalic = true,
  showUnderline = true,
  showLink = true,
  showCode = true,
  showColor = true,

  position = { bottom: 10, right: 10 },
  formatting = true,
  selectedColor,
  setSelectedColor,
  onFormat = () => {},
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  if (!formatting) return null;

  const handleToggle = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Box sx={{ zIndex: 99, position: 'absolute', ...position }}>
        <IconButton size="small" onClick={handleToggle} sx={{ color: 'black' }}>
          <FormatColorTextIcon />
        </IconButton>
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        PaperProps={{
          sx: {
            width: 'auto',
            minWidth: 'unset',
            overflow: 'visible',
            padding: '4px',
            ml: {
              xs: '-80px',  
              sm: 0         
            },
          },
        }}
        disableAutoFocus
        disableEnforceFocus
      >
        <FormatButton
          onFormat={onFormat}
          showBold={showBold}
          showItalic={showItalic}
          showUnderline={showUnderline}
          showLink={showLink}
          showCode={showCode}
          showColor={showColor}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      </Popover>
    </>
  );
};

export default Formatting;
