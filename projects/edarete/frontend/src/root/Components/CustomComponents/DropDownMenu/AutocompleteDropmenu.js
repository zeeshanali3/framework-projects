import React from 'react';
import { Autocomplete ,TextField } from '@mui/material';
const AutocompleteDropdown = ({ label, value, options, getOptionLabel, getOptionValue, onChange, placeholder }) => (
  <Autocomplete
    options={options}
    getOptionLabel={(option) => (option ? getOptionLabel(option) : '')}
    getOptionValue={(option) => (option ? getOptionValue(option) : '')}
    value={options.find((option) => getOptionValue(option) === value) || null}
    onChange={(event, newValue) => onChange(newValue)}
    renderInput={(params) => <TextField {...params} label={label} variant="outlined" fullWidth />}
    placeholder={placeholder}
  />
);

export default AutocompleteDropdown;