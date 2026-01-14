import React from 'react'
import {
    Typography
} from '@mui/material'

const TypographyComponent = ({ title = '', variant = 'h1', fontSize = '17px', fontWeight = 700, color = '#333', textAlign = 'left', cursor = 'default', handleClick }) => {

    return (
        <Typography
            variant={variant}
            component={variant}
            sx={{
                fontSize,
                fontWeight,
                color,
                textAlign,
                cursor,
            }}
            onClick={handleClick}
        >
            {title}
        </Typography>
    )
}

export default TypographyComponent