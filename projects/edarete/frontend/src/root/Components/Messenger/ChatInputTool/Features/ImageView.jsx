import React from 'react';
import { Typography, Box, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

function ImageView({ selectedFile, onRemove, imageView }) {
  if (!selectedFile || !imageView) return null;

  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        flexGrow: 1,
        boxShadow: '0 0 5px rgba(0,0,0,0.05)',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          marginTop: '15px',
          borderRadius: '12px',
          border: '1px solid #ddd',
          display: 'inline-block',
          position: 'relative',
        }}
      >
        <IconButton
          size="small"
          onClick={onRemove}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 1,
            backgroundColor: '#fff',
            borderRadius: '50%',
            boxShadow: 1,
            color: 'black',
            '&:hover': {
              backgroundColor: '#fff',
              boxShadow: 1,
            },
          }}
        >
          <Close fontSize="small" />
        </IconButton>

        {selectedFile.type.startsWith("image/") ? (
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="preview"
            style={{
              height: '140px',
              width: '150px',
              borderRadius: '8px',
              objectFit: 'cover',
            }}
          />
        ) : selectedFile.type === "application/pdf" ? (
          <Box
            sx={{
              width: '150px',
              height: '140px',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#fff',
            }}
          >
            <iframe
              src={URL.createObjectURL(selectedFile)}
              title="PDF Preview"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                transform: 'scale(1.3)',
                transformOrigin: 'top left',
              }}
              scrolling="no"
            />
          </Box>
        ) : selectedFile.name.endsWith(".doc") || selectedFile.name.endsWith(".docx") ? (
          <Box
            sx={{
              height: '140px',
              width: '150px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#eee',
              borderRadius: '8px',
              textAlign: 'center',
              padding: '10px',
            }}
          >
            <Typography variant="body2">
              Word Document<br />
              ({selectedFile.name})
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '140px',
              width: '150px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              textAlign: 'center',
              padding: '10px',
            }}
          >
            <Typography variant="body2">
              📄 {selectedFile.name}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ImageView;
