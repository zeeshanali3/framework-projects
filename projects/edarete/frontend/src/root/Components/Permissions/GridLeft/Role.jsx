import React, { useState, useEffect } from 'react'
import { Grid, Box, IconButton, Typography, Collapse, Grow, Paper, InputBase } from '@mui/material'
import { KeyboardArrowRightRounded, KeyboardArrowDownRounded, Search } from '@mui/icons-material'
import { checkBox } from '../index'
import { formatPermissionName } from '../index'

const DraggableRole = ({ roleName, roleCheck, rolePermissions, setSelectedRole, setSelectedRolePermissions }) => {
    const [expanded, setExpanded] = useState(false);
    const [filterPermissions, setFilterPermissions] = useState('');
    const filteredPermissions = Object.entries(rolePermissions || {})
        .filter(([permissionId, permissionItem]) =>
            permissionItem.permissionname &&
            permissionItem.permissionname.toLowerCase().includes(filterPermissions.toLowerCase().replace(/\s+/g, "_")));

    const handleExpand = () => {
        setExpanded(prev => !prev);
    };

    const handleLeftAllPermissionsCheck = (roleName) => {
        if (rolePermissions && Object.keys(rolePermissions).length > 0) {
            // 1. Update selectedRole
            setSelectedRole(prev => {
                const newPermissions = { ...prev.permissions };
                Object.entries(rolePermissions).forEach(([permissionid, permission]) => {
                    newPermissions[permissionid] = {
                        permissionid: permission.permissionid,
                        permissionname: permission.permissionname,
                        isChecked: true,
                        include_ids: permission.include_ids,
                        exclude_ids: permission.exclude_ids,
                        includeLoaded: permission.includeLoaded,
                        excludeLoaded: permission.excludeLoaded,
                        preference: permission.preference
                    };
                });

                return {
                    ...prev,
                    isChecked: true,
                    permissions: newPermissions,
                };
            });
            // 2. Remove these permissions from selectedRolePermissions (left side)
            setSelectedRolePermissions(prev => {
                const updatedPermissions = { ...prev[roleName]?.permissions };

                Object.keys(rolePermissions).forEach(permissionid => {
                    delete updatedPermissions[permissionid];
                });

                return {
                    ...prev,
                    [roleName]: {
                        ...prev[roleName],
                        permissions: updatedPermissions,
                    },
                };
            });
            // 3. Reset filter when moving all permissions
            setFilterPermissions('');
        }
    }

    const handleLeftIndividualPermissionCheck = (
        roleName,
        permissionid,
        permissionname,
        include_ids,
        exclude_ids,
        includeLoaded,
        excludeLoaded,
        preference
    ) => {
        // 1. Update selectedRole
        setSelectedRole(prev => ({
            ...prev,
            isChecked: true,
            permissions: {
                ...prev.permissions,
                [permissionid]: {
                    permissionid: permissionid,
                    permissionname: permissionname,
                    isChecked: true,
                    include_ids: include_ids,
                    exclude_ids: exclude_ids,
                    includeLoaded: includeLoaded,
                    excludeLoaded: excludeLoaded,
                    preference: preference
                }
            }
        }));
        // 2. Remove from selectedRolePermissions
        setSelectedRolePermissions(prev => {
            // Defensive check (even if rolename always exists)
            const updatedGroup = { ...prev[roleName]?.permissions };
            delete updatedGroup[permissionid];

            return {
                ...prev,
                [roleName]: {
                    ...prev[roleName],
                    permissions: updatedGroup,
                }
            };
        });
    };

    // --------------- Logs ---------------
    useEffect(() => {
        console.log("All Role Permissions", rolePermissions);
    }, [rolePermissions]);

    useEffect(() => {
        console.log("Filter Permissions", filterPermissions);
    }, [filterPermissions]);

    useEffect(() => {
        console.log("Filtered Permissions", filteredPermissions);
    }, [filterPermissions, filteredPermissions]);
    // --------------- Logs ---------------

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#F7F7F7',
                    border: '1px solid #EFEFEF',
                    padding: '10px'
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton onClick={handleExpand}>
                        {
                            expanded ? <KeyboardArrowDownRounded /> : <KeyboardArrowRightRounded />
                        }
                    </IconButton>
                    <Typography component="span" sx={{ textTransform: 'capitalize' }}>{roleName}</Typography>
                </Box>
                <Box
                    sx={{
                        display: Object.keys(rolePermissions).length === 0 ?
                            'none' :
                            'block'
                    }}
                >
                    {
                        checkBox(
                            null,
                            roleCheck,
                            false,
                            () => handleLeftAllPermissionsCheck(roleName)
                        )
                    }
                </Box>
            </Box>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Box
                    sx={{
                        border: '1px solid #EFEFEF',
                        borderTop: 'none',
                        padding: '10px',
                        minHeight: '230px',
                        maxHeight: '230px',
                        overflowY: 'auto',
                        overflowX: 'hidden'
                    }}
                >
                    <Grid container>
                        {
                            !rolePermissions || Object.keys(rolePermissions).length === 0 ?
                                (
                                    <Grid item xs={12}>
                                        <Typography variant="body1" sx={{ opacity: 0.6 }}>
                                            No permissions available
                                        </Typography>
                                    </Grid>
                                ) :
                                <>
                                    <Grid item xs={12}>
                                        <Paper
                                            variant='outlined'
                                            sx={{
                                                mt: 0.5,
                                                mb: 1,
                                                mx: 0.5,
                                                borderRadius: '8px',
                                                p: '8px',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                '&:focus-within': {
                                                    borderColor: '#000',
                                                },
                                            }}
                                        >
                                            <InputBase
                                                sx={{ ml: 1, flex: 1 }}
                                                placeholder="Search Permissions"
                                                inputProps={{ 'aria-label': 'search permissions' }}
                                                value={filterPermissions}
                                                onChange={(event) => {
                                                    setFilterPermissions(event.target.value);
                                                }}
                                            />
                                            <Search />
                                        </Paper>
                                    </Grid>
                                    {
                                        filterPermissions ?
                                            (
                                                <>
                                                    {
                                                        Array.isArray(filteredPermissions) && filteredPermissions.length > 0 ?
                                                            (
                                                                filteredPermissions.map(([prmId, prm]) => (
                                                                    <Grid item xs={12} md={6} key={prmId}>
                                                                        <Grow
                                                                            in={expanded}
                                                                            timeout={400}
                                                                            style={{
                                                                                transformOrigin: 'center',
                                                                            }}
                                                                        >
                                                                            <Box
                                                                                sx={{
                                                                                    display: 'flex',
                                                                                    flexDirection: 'row',
                                                                                    alignItems: 'center',
                                                                                    transition: 'all 0.2s ease',
                                                                                    opacity: 1,
                                                                                    padding: 0.5
                                                                                }}>
                                                                                {
                                                                                    checkBox(
                                                                                        null,
                                                                                        prm.isChecked,
                                                                                        false,
                                                                                        () => handleLeftIndividualPermissionCheck(
                                                                                            roleName,
                                                                                            prm.permissionid,
                                                                                            prm.permissionname,
                                                                                            prm.include_ids,
                                                                                            prm.exclude_ids,
                                                                                            prm.includeLoaded,
                                                                                            prm.excludeLoaded,
                                                                                            prm.preference
                                                                                        )
                                                                                    )
                                                                                }
                                                                                <Typography
                                                                                    sx={{
                                                                                        wordBreak: 'break-word',
                                                                                        whiteSpace: 'normal',
                                                                                        overflowWrap: 'break-word',
                                                                                        marginLeft: '-15px'
                                                                                    }}
                                                                                    component="span"
                                                                                >
                                                                                    {formatPermissionName(prm.permissionname)}
                                                                                </Typography>
                                                                            </Box>
                                                                        </Grow>
                                                                    </Grid>
                                                                ))
                                                            )
                                                            :
                                                            (
                                                                <Grid item xs={12}>
                                                                    <Typography
                                                                        variant="body1"
                                                                        sx={{ opacity: 0.6, mt: 0.5, mx: 1 }}
                                                                    >
                                                                        No permission found
                                                                    </Typography>
                                                                </Grid>
                                                            )
                                                    }
                                                </>
                                            )
                                            :
                                            (
                                                Object.entries(rolePermissions).map(([prmId, prm]) => (
                                                    <Grid item xs={12} md={6} key={prmId}>
                                                        <Grow
                                                            in={expanded}
                                                            timeout={400}
                                                            style={{
                                                                transformOrigin: 'center',
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                    transition: 'all 0.2s ease',
                                                                    opacity: 1,
                                                                    padding: 0.5
                                                                }}>
                                                                {
                                                                    checkBox(
                                                                        null,
                                                                        prm.isChecked,
                                                                        false,
                                                                        () => handleLeftIndividualPermissionCheck(
                                                                            roleName,
                                                                            prm.permissionid,
                                                                            prm.permissionname,
                                                                            prm.include_ids,
                                                                            prm.exclude_ids,
                                                                            prm.includeLoaded,
                                                                            prm.excludeLoaded,
                                                                            prm.preference
                                                                        )
                                                                    )
                                                                }
                                                                <Typography
                                                                    sx={{
                                                                        wordBreak: 'break-word',
                                                                        whiteSpace: 'normal',
                                                                        overflowWrap: 'break-word',
                                                                        marginLeft: '-15px'
                                                                    }}
                                                                    component="span"
                                                                >
                                                                    {formatPermissionName(prm.permissionname)}
                                                                </Typography>
                                                            </Box>
                                                        </Grow>
                                                    </Grid>
                                                ))
                                            )
                                    }
                                </>
                        }
                    </Grid>
                </Box>
            </Collapse >
        </>
    )
}

export default DraggableRole