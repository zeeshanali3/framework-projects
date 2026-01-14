import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';

const UpdateAutocompleteDropdown = ({
  label,
  value,
  options,
  getOptionLabel,
  getOptionValue,
  onChange,
  placeholder,
  initialValue,
}) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(initialValue || '');
  }, [initialValue]);

  // Filter out null or undefined values from options array
  const filteredOptions = options.filter((option) => option !== null && option !== undefined);

  return (
    <Autocomplete
      options={filteredOptions}
      getOptionLabel={(option) => (option ? getOptionLabel(option) : '')}
      getOptionValue={(option) => (option ? getOptionValue(option) : '')}
      value={value || null}
      onChange={(event, newValue) => onChange(newValue)}
      renderInput={(params) => <TextField {...params} label={label} variant="outlined" fullWidth />}
      placeholder={placeholder}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        if (newInputValue === '') {
          // Clear inputValue and trigger onChange with null when input is empty
          onChange(null);
        }
      }}
      // Add a filterOptions prop to handle case sensitivity
      filterOptions={(options, { inputValue }) =>
        options.filter(
          (option) =>
            option &&
            option.toLowerCase().includes(inputValue.toLowerCase())
        )
      }
      // Clear inputValue when the value is null (cancellation)
      onHighlightChange={(event, newInputValue) => {
        if (newInputValue === null) {
          setInputValue('');
        }
      }}
    />
  );
};

export default UpdateAutocompleteDropdown;
