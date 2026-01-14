import React from 'react'
import {
    Button
} from '@mui/material'

const ButtonComponent = ({ type = '', variant = 'contained', label = 'Click Here', handleClick }) => {
    return (
        <Button
            type={type}
            variant={variant}
            onClick={handleClick}
        >
            {label}
        </Button>
    )
}

export default ButtonComponent