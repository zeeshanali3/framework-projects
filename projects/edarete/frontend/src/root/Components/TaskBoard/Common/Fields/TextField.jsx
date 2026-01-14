import React from 'react'
import {
    TextField,
} from '@mui/material'

const TextFieldComponent = ({
    id = "textField",
    label = "",
    placeholder = "",
    value = "",
    defaultValue = "",
    isRequired = false,
    variant = "outlined",
    size = "small",
    isFullWidth = true,
    autoFocus = false,
    handleChange,
    handleBlur,
    handleKeyDown,
    fontSize = "17px",
    fontWeight = 500,
    padding = "",
    borderRadius = "",
    borderColor = "",
    hideOutline = false
}) => {
    return (
        <TextField
            fullWidth={isFullWidth}
            id={id}
            label={label}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            variant={variant}
            size={size}
            autoFocus={autoFocus}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            required={isRequired}
            sx={{
                '& .MuiInputBase-root': {
                    fontSize,
                    fontWeight,
                    padding,
                    borderRadius,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: hideOutline ? 'transparent' : borderColor
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: hideOutline ? 'transparent' : borderColor
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: hideOutline ? 'transparent' : borderColor
                    }
                },
                '& input': {
                    padding,
                }
            }}
        />
    )
}

export default TextFieldComponent