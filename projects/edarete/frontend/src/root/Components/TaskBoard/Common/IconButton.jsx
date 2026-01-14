import React from 'react'
import {
    IconButton
} from '@mui/material'
import {
    Edit,
    Close,
    MoreVert,
    ExpandMore,
    ExpandLess,
} from '@mui/icons-material'

const IconButtonComponent = ({ fontSize = 20, color = '#666', type = '', handleClick }) => {
    return (
        <IconButton onClick={handleClick}>
            {
                type === "Edit" && (
                    <Edit
                        sx={{
                            fontSize,
                            color
                        }}
                    />
                )
            }
            {
                type === "Close" && (
                    <Close
                        sx={{
                            fontSize,
                            color
                        }}
                    />
                )
            }
            {
                type === "MoreVert" && (
                    <MoreVert
                        sx={{
                            fontSize,
                            color
                        }}
                    />
                )
            }
            {
                type === "ExpandMore" && (
                    <ExpandMore
                        sx={{
                            fontSize,
                            color
                        }}
                    />
                )
            }
            {
                type === "ExpandLess" && (
                    <ExpandLess
                        sx={{
                            fontSize,
                            color
                        }}
                    />
                )
            }
        </IconButton>
    )
}

export default IconButtonComponent