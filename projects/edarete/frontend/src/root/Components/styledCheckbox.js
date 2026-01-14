import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  display: 'none',
  '& + span': {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '8px 16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
    textAlign: 'center',
    minWidth: '100px',
  },
  '&:checked + span': {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    borderColor: theme.palette.primary.main,
  },
}));

const CheckboxButton = ({ label, checked, onChange }) => {
  return (
    <FormControlLabel
      control={<StyledCheckbox checked={checked} onChange={onChange} />}
      label={label}
      componentsProps={{
        typography: {
          component: 'span',
        },
      }}
    />
  );
};

export default CheckboxButton;
