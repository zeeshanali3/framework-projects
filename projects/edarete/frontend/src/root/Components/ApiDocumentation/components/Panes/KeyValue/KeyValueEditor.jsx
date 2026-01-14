import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export default function KeyValueEditor({
  keyPair,
  setKeyPair,
  onKeyPairRemove,
}) {
  const [keyValue, setKeyValue] = useState(keyPair);
  const [debouncedKeyValue, setDebouncedKeyValue] = useState(keyValue);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedKeyValue(keyValue);
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [keyValue]);

  useEffect(() => {
    setKeyPair(debouncedKeyValue);
    // eslint-disable-next-line
  }, [debouncedKeyValue]);

  const handleOnChange = (e) => {
    setKeyValue((prevState) => ({
      ...prevState,
      id: keyValue.id,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
     <Box sx={{ display: 'flex', mb: 3 }}>
  <TextField
    size="small"
    placeholder="Key"
    name="keyItem"
    onChange={(e) => handleOnChange(e)}
    sx={{
      width: '100%',
      '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
          borderColor: 'primary.main', // hover:border-blue-500
        },
        '&.Mui-focused fieldset': {
          borderColor: 'primary.main', // focus:outline-blue-500
        },
      },
    }}
  />
  
  <TextField
    size="small"
    placeholder="Value"
    name="valueItem"
    onChange={(e) => handleOnChange(e)}
    sx={{
      width: '100%',
      ml: 3, // ml-3
      '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
          borderColor: 'primary.main',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'primary.main',
        },
      },
    }}
  />
  
  <Button
    variant="outlined"
    color="primary"
    onClick={() => onKeyPairRemove(keyPair)}
    sx={{
      ml: 4, // ml-4
      px: 4, // px-4
      borderRadius: '6px', // rounded-md
      color: 'primary.main', // text-blue-500
      borderColor: 'primary.light', // border-blue-300
      '&:hover': {
        backgroundColor: 'primary.50', // hover:bg-blue-100
        borderColor: 'primary.main',
      },
    }}
  >
    Remove
  </Button>
</Box>
    </>
  );
}
