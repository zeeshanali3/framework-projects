import React from 'react';
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  styled
} from '@mui/material';

const requestMethods = [
  { slug: 'get', method: 'GET' },
  { slug: 'post', method: 'POST' },
  { slug: 'put', method: 'PUT' },
  { slug: 'patch', method: 'PATCH' },
  { slug: 'delete', method: 'DELETE' },
];

const GradientButton = styled(Button)({
  background: 'linear-gradient(to right, #3b82f6, #2563eb)',
  color: 'white',
  fontWeight: 'bold',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    background: 'linear-gradient(to right, #2563eb, #1d4ed8)',
  },
});

export default function UrlEditor({
  url,
  setUrl,
  reqMethod,
  setReqMethod,
  onInputSend,
}) {
  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onInputSend(e);
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        bgcolor: 'white',
        border: '1px solid',
        borderColor: 'rgba(147, 197, 253, 0.5)',
        borderRadius: 4,
        p: 2,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Request Method */}
      <Select
        value={reqMethod}
        onChange={(e) => setReqMethod(e.target.value)}
        sx={{
          minWidth: 100,
          bgcolor: 'rgba(219, 234, 254, 0.5)',
          border: '1px solid',
          borderColor: 'rgba(191, 219, 254, 0.7)',
          borderRadius: 2,
          '& .MuiSelect-select': {
            py: 1.25,
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#1e40af',
          },
          '&:hover': {
            borderColor: 'rgba(147, 197, 253, 1)',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        }}
      >
        {requestMethods.map((option) => (
          <MenuItem key={option.slug} value={option.method}>
            {option.method}
          </MenuItem>
        ))}
      </Select>

      {/* URL Input */}
      <TextField
        fullWidth
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter request URL"
        sx={{
          '& .MuiOutlinedInput-root': {
            bgcolor: 'rgba(219, 234, 254, 0.3)',
            borderRadius: 2,
            '& fieldset': {
              borderColor: 'rgba(191, 219, 254, 0.7)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(147, 197, 253, 1)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'rgba(59, 130, 246, 1)',
              boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)',
            },
          },
          '& .MuiInputBase-input': {
            py: 1.25,
            fontSize: '0.875rem',
            color: '#374151',
            '&::placeholder': {
              color: '#9ca3af',
              opacity: 1,
            },
          },
        }}
      />

      {/* Send Button */}
      <GradientButton
        type="submit"
        variant="contained"
        sx={{
          px: 3,
          py: 1.25,
          fontSize: '0.875rem',
          textTransform: 'none',
          borderRadius: 2,
        }}
      >
        Send
      </GradientButton>
    </Box>
  );
}