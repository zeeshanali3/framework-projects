import React from 'react'
import {
    InputLabel,
    MenuItem,
    FormControl,
    Select,
} from '@mui/material'

const SelectComponent = ({
    id = "select",
    label = "",
    value = "",
    defaultValue = "",
    isRequired = false,
    variant = "outlined",
    size = "small",
    isFullWidth = true,
    handleChange,
    fontSize = "17px",
    fontWeight = 500,
    padding = "",
    borderRadius = "",
    borderColor = "",
    hideOutline = false,
    options = []
}) => {

    return (
        <FormControl fullWidth={isFullWidth} variant={variant} size={size}>
            {label && <InputLabel id={`${id}-label`}>{label}</InputLabel>}
            <Select
                labelId={`${id}-label`}
                id={id}
                value={value}
                defaultValue={defaultValue}
                label={label}
                onChange={handleChange}
                required={isRequired}
                sx={{
                    fontSize,
                    fontWeight,
                    borderRadius,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: hideOutline ? 'transparent' : borderColor
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: hideOutline ? 'transparent' : borderColor
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: hideOutline ? 'transparent' : borderColor
                    },
                    '& .MuiSelect-select': {
                        padding
                    }
                }}
            >
                {
                    options && options.length > 0 ? (
                        options.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>No options found</MenuItem>
                    )
                }
            </Select>

        </FormControl>
    )
}

export default SelectComponent