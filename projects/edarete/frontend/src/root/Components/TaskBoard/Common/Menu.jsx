import React from 'react'
import {
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material"

const MenuComponent = ({ anchorEl = null, actions = [], handleMenuClose, fontSize = '17px' }) => {
    const open = Boolean(anchorEl);

    const handleActionClick = (action) => {
        if (action.onClick) action.onClick();
        handleMenuClose();
    };

    // ---------- Logs ----------
    console.log("Menu Actions", actions);

    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            autoFocus={false}
            MenuListProps={{ autoFocus: false }}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
        >
            {actions.length > 0 ? (
                actions.map((action, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => handleActionClick(action)}
                    >
                        {action.icon && (
                            <ListItemIcon sx={{ marginRight: '-5px' }}>
                                {action.icon}
                            </ListItemIcon>
                        )}
                        <ListItemText
                            primary={action.label}
                            primaryTypographyProps={{ fontSize }}
                        />
                    </MenuItem>
                ))
            ) : (
                <MenuItem disabled>
                    <ListItemText
                        primary="No items available"
                        primaryTypographyProps={{ fontSize }}
                    />
                </MenuItem>
            )}
        </Menu>
    )
}

export default MenuComponent