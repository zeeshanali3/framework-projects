import React, { useState } from 'react'
import {
    Grid,
    Typography,
    FormControlLabel,
    Checkbox
} from '@mui/material'
import UserDropdown from './UserDropdown/'
import GridItemLeft from './GridLeft'
import GridItemRight from './GridRight'

// Typography
export const text = (title, variant, fontWeight, marginBottom) => {
    return (
        <Typography
            variant={variant}
            component={variant}
            sx={{
                fontSize: '17px',
                fontWeight,
                margin: 0,
                marginBottom,
                color: '#333'
            }}
        >
            {title}
        </Typography>
    )
}

// CheckBox
export const checkBox = (label, isChecked, isIndeterminate, onCheckChange) => {
    return (
        <FormControlLabel
            label={label}
            control={
                <Checkbox
                    checked={isChecked}
                    indeterminate={isIndeterminate}
                    onChange={onCheckChange}
                />
            }
        />
    )
}

// --------------- Format User Name ---------------
export const formatUserName = (name) => {
    if (!name || typeof name !== "string") return name;
    const formattedName = name.includes(" ")
        ? name.replace(/\b\w/g, char => char.toUpperCase())
        : name.includes("-") ?
            name.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
            : name.includes("_")
                ? name.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
                : name.replace(/\b\w/g, char => char.toUpperCase());
    return formattedName;
}

// --------------- Format Permission Name ---------------
export const formatPermissionName = (name) => {
    if (!name || typeof name !== "string") return name;

    // If it contains space, dash, or underscore
    if (name.includes(" ") || name.includes("-") || name.includes("_")) {
        return name
            .replace(/[-_]/g, ' ') // replace - and _ with space
            .replace(/\b\w/g, char => char.toUpperCase()); // capitalize each word
    }

    // If it's a single word: only capitalize the first letter
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

const PermissionManager = () => {
    // ---------- UserDropdown States ----------
    const [selectedUser, setSelectedUser] = useState({});
    const [selectedrole, setSelectedRole] = useState({});
    // ---------- GridLeft States ----------
    const [loading, setLoading] = useState(true);
    const [selectedRolePermissions, setSelectedRolePermissions] = useState({});

    return (
        <>
            {text("Permissions", "h2", 700, "15px")}
            <Grid container>
                <Grid item xs={12} data-testid="dropdown-container">
                    <UserDropdown
                        selectedUser={selectedUser}
                        setSelectedUser={setSelectedUser}
                        selectedrole={selectedrole}
                        setSelectedRole={setSelectedRole}
                    />
                </Grid>
                {
                    selectedrole && Object.entries(selectedrole).length > 0 && (
                        <Grid
                            item
                            xs={12}
                            sx={{
                                mt: 2,
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                padding: '12px 30px',
                                minHeight: '450.3px'
                            }}
                        >
                            <Grid container>
                                <Grid item xs={12} md={6} sx={{ paddingRight: '30px', paddingY: '10px' }}>
                                    <GridItemLeft
                                        selectedrole={selectedrole}
                                        setSelectedRole={setSelectedRole}
                                        selectedRolePermissions={selectedRolePermissions}
                                        setSelectedRolePermissions={setSelectedRolePermissions}
                                        loading={loading}
                                        setLoading={setLoading}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sx={{ paddingY: '10px' }}>
                                    <GridItemRight
                                        selectedrole={selectedrole}
                                        setSelectedRole={setSelectedRole}
                                        setSelectedRolePermissions={setSelectedRolePermissions}
                                        loading={loading}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                }
            </Grid>
        </>
    )
}

export default PermissionManager