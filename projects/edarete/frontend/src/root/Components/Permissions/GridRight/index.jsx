import React, { useEffect, useState } from 'react'
import {
    Grid,
    Box,
    IconButton,
    Typography,
    Collapse,
    Grow,
    Button,
    CircularProgress,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Paper,
    InputBase
} from '@mui/material'
import { KeyboardArrowRightRounded, KeyboardArrowDownRounded, Search } from '@mui/icons-material'
import { checkBox } from '../index'
import { text } from '../index'
import { formatPermissionName } from '../index'
import constants from "../../../Common/Constants"
import { getServerResponse } from '../../Helpers/getServerResponse'
import { useSelector } from 'react-redux'
import { showSuccessToast, showErrorToast } from "../../../Common/ToastUtils";

const GridItemRight = ({ selectedrole, setSelectedRole, setSelectedRolePermissions, loading }) => {
    const mainData = useSelector((state) => state.main);
    const [expanded, setExpanded] = useState(false);
    const [expandedPermissionId, setExpandedPermissionId] = useState(null);
    const [loadingPermissions, setLoadingPermissions] = useState(true);
    const [disabledDuringLoading, setDisabledDuringLoading] = useState(false);
    const [filterPermissions, setFilterPermissions] = useState("");
    const filteredPermissions = Object.entries(selectedrole?.permissions || {})
        .filter(([permissionId, permissionItem]) =>
            permissionItem.permissionname &&
            permissionItem.permissionname.toLowerCase().includes(filterPermissions.toLowerCase().replace(/\s+/g, "_")));
    const [submitting, setSubmitting] = useState(false);

    const handleExpand = () => {
        setExpanded(prev => !prev);
        setExpandedPermissionId(null);
    };

    const handlePermissionExpand = (permissionId) => {
        setExpandedPermissionId(prev => (
            prev === permissionId ? null : permissionId
        ));
    };

    const handlePermissionCollapse = () => {
        setExpandedPermissionId(null);
    };

    const extractEndpoint = (permissionname) => {
        const keywords = ["list", "add", "update", "delete"];
        const lower = permissionname.toLowerCase();
        for (let keyword of keywords) {
            const keywordIndex = lower.indexOf(keyword + "_");
            if (keywordIndex !== -1) {
                // Extract everything after the keyword and underscore
                return permissionname.slice(keywordIndex + keyword.length + 1);
            }
        }
        // If no keyword is found, return original
        return permissionname;
    };

    const handlePreference = (event, permissionId, permissionname) => {
        const selectedPreference = event.target.value;

        // ✅ First update the preference in selectedRole
        setSelectedRole(prev => {
            const updatedPermissions = { ...prev.permissions };
            const targetPermission = updatedPermissions[permissionId];

            if (targetPermission) {
                updatedPermissions[permissionId] = {
                    ...targetPermission,
                    preference: selectedPreference  // ✅ Add preference here
                };
            }

            return {
                ...prev,
                permissions: updatedPermissions
            };
        });

        if (selectedPreference === 'all' || selectedPreference === 'created-by') return;

        // Skip if already loaded
        const targetPermission = selectedrole?.permissions?.[permissionId];
        if (
            (selectedPreference === 'include' && targetPermission?.includeLoaded) ||
            (selectedPreference === 'exclude' && targetPermission?.excludeLoaded)
        ) {
            return;
        }

        setLoadingPermissions(true);
        setDisabledDuringLoading(true);

        // Extract the endpoint from the permission name
        const permissionTableAPIEndpoint = extractEndpoint(permissionname);

        const servercommunication = {
            requestType: "GET",
            apiUrl: constants.crud + '/' + permissionTableAPIEndpoint,
            body: {},
            metaData: true,
            onSuccess: (res) => {
                console.log("On Success", res);
                const data = res.return;
                if (selectedPreference === 'include' || selectedPreference === 'exclude') {
                    setSelectedRole(prev => {
                        const updatedPermissions = { ...prev.permissions };
                        const targetPermission = updatedPermissions[permissionId];
                        if (targetPermission) {
                            const alreadyIncluded = Array.isArray(targetPermission.include_ids)
                                ? targetPermission.include_ids
                                : [];
                            const alreadyExcluded = Array.isArray(targetPermission.exclude_ids)
                                ? targetPermission.exclude_ids
                                : [];

                            const updatedIncludeIds = data.map(item => {
                                const id = item.id;

                                // Try to find a name-like field
                                const nameKey = Object.keys(item).find(key =>
                                    key.toLowerCase().includes("name") ||
                                    key.toLowerCase().includes("title") ||
                                    key.toLowerCase().includes("first_name")
                                );

                                let nameValue = nameKey ? item[nameKey] : "";
                                // ✅ Remove file extension like .png, .jpg, .jpeg, .pdf etc.
                                nameValue = nameValue?.replace(/\.[^/.]+$/, "");

                                return {
                                    id: id,
                                    name: nameValue,
                                    isChecked: alreadyIncluded.includes(id)
                                };
                            });

                            const updatedExcludeIds = data.map(item => {
                                const id = item.id;

                                // Try to find a name-like field
                                const nameKey = Object.keys(item).find(key =>
                                    key.toLowerCase().includes("name") ||
                                    key.toLowerCase().includes("title") ||
                                    key.toLowerCase().includes("first_name")
                                );

                                let nameValue = nameKey ? item[nameKey] : "";
                                // ✅ Remove file extension like .png, .jpg, .jpeg, .pdf etc.
                                nameValue = nameValue?.replace(/\.[^/.]+$/, "");

                                return {
                                    id: id,
                                    name: nameValue,
                                    isChecked: alreadyExcluded.includes(id)
                                };
                            });

                            updatedPermissions[permissionId] = {
                                ...targetPermission,
                                include_ids: updatedIncludeIds,
                                includeLoaded: true,
                                exclude_ids: updatedExcludeIds,
                                excludeLoaded: true,
                            };
                        }

                        return {
                            ...prev,
                            permissions: updatedPermissions
                        };
                    });
                }
                setLoadingPermissions(false);
                setDisabledDuringLoading(false);
            },
            onFailure: (res) => {
                console.log("On Failure", res);
                setLoadingPermissions(false);
                setDisabledDuringLoading(false);
            },
        }
        getServerResponse(servercommunication);
    };

    const isIndeterminate = () => {
        const permissions = selectedrole?.permissions;
        if (!permissions || Object.keys(permissions).length === 0) return false;

        const values = Object.values(permissions).map(p => p.isChecked);
        const hasChecked = values.some(val => val === true);
        const hasUnchecked = values.some(val => val === false);

        return hasChecked && hasUnchecked;
    };

    const handleRightAllPermissionsCheck = (rolename) => {
        if (selectedrole.permissions && Object.keys(selectedrole.permissions).length > 0) {
            // 1. Update selectedRolePermissions
            setSelectedRolePermissions(prev => {
                const roleData = prev[rolename] || {};
                const currentGroup = roleData.permissions || {};
                const updatedGroup = { ...currentGroup };

                Object.entries(selectedrole.permissions).forEach(([permissionid, permission]) => {
                    if (!updatedGroup[permissionid]) {
                        updatedGroup[permissionid] = {
                            permissionid: permission.permissionid,
                            permissionname: permission.permissionname,
                            isChecked: false,
                            include_ids: [],
                            exclude_ids: [],
                            includeLoaded: false,
                            excludeLoaded: false,
                            preference: 'all'
                        };
                    }
                });

                return {
                    ...prev,
                    [rolename]: {
                        ...roleData,
                        groupname: rolename,
                        isChecked: roleData.isChecked ?? false,
                        permissions: updatedGroup,
                    }
                };
            });

            // 2. Clear selectedRole Permissions
            setSelectedRole(prev => {
                return {
                    ...prev,
                    isChecked: false,
                    permissions: {},
                };
            });
            setExpandedPermissionId(null);
            setFilterPermissions("");
        }
    }

    const handleRightIndividualPermissionCheck = (rolename, permissionid, permissionname) => {
        // 1. Re-add it to selectedRolePermissions (left side)
        setSelectedRolePermissions(prev => {
            const roleData = prev[rolename] || {};

            return {
                ...prev,
                [rolename]: {
                    ...roleData,
                    groupname: rolename,
                    isChecked: roleData.isChecked ?? false,
                    permissions: {
                        ...(roleData.permissions || {}),
                        [permissionid]: {
                            permissionid: permissionid,
                            permissionname: permissionname,
                            isChecked: false,
                            include_ids: [],
                            exclude_ids: [],
                            includeLoaded: false,
                            excludeLoaded: false,
                            preference: 'all'
                        }
                    }
                }
            };
        });

        // 2. Remove from selectedRole (right side)
        setSelectedRole(prev => {
            const updatedPermissions = { ...prev.permissions };
            delete updatedPermissions[permissionid];
            return {
                ...prev,
                permissions: updatedPermissions,
            }
        });
        setExpandedPermissionId(null);
    }

    const handleInclude = (permissionId, prmTableId) => {
        setSelectedRole(prev => {
            const updatedPermissions = { ...prev.permissions };
            const permission = updatedPermissions[permissionId];

            if (!permission || !Array.isArray(permission.include_ids)) return prev;

            const index = permission.include_ids.findIndex(item => item.id === prmTableId);
            if (index === -1) return prev;

            const updatedIncludeIds = [...permission.include_ids];
            updatedIncludeIds[index] = {
                ...updatedIncludeIds[index],
                isChecked: !updatedIncludeIds[index].isChecked
            };

            return {
                ...prev,
                permissions: {
                    ...prev.permissions,
                    [permissionId]: {
                        ...permission,
                        include_ids: updatedIncludeIds
                    }
                }
            };
        });
    };

    const handleExclude = (permissionId, prmTableId) => {
        setSelectedRole(prev => {
            const updatedPermissions = { ...prev.permissions };
            const permission = updatedPermissions[permissionId];

            if (!permission || !Array.isArray(permission.exclude_ids)) return prev;

            const index = permission.exclude_ids.findIndex(item => item.id === prmTableId);
            if (index === -1) return prev;

            const updatedExcludeIds = [...permission.exclude_ids];
            updatedExcludeIds[index] = {
                ...updatedExcludeIds[index],
                isChecked: !updatedExcludeIds[index].isChecked
            };

            return {
                ...prev,
                permissions: {
                    ...prev.permissions,
                    [permissionId]: {
                        ...permission,
                        exclude_ids: updatedExcludeIds
                    }
                }
            };
        });
    };

    const handleSubmit = () => {
        setSubmitting(true);

        const checkedPermissions = Object.values(selectedrole.permissions || {}).filter(
            perm => perm.isChecked !== false
        );

        const finalPermissionsToSubmit = {
            [selectedrole.rolename]: {
                permissions: checkedPermissions.map(perm => {
                    let include_ids = [];
                    let exclude_ids = [];

                    switch (perm.preference) {
                        case "all":
                            include_ids = [];
                            exclude_ids = [];
                            break;

                        case "created-by":
                            include_ids = ["*"];
                            exclude_ids = [];
                            break;

                        case "include":
                            include_ids = perm.include_ids.filter(obj => obj.isChecked).map(obj => obj.id);
                            exclude_ids = [];
                            break;

                        case "exclude":
                            include_ids = [];
                            exclude_ids = perm.exclude_ids.filter(obj => obj.isChecked).map(obj => obj.id);
                            break;
                    }

                    return {
                        permission_id: perm.permissionid,
                        permission_name: perm.permissionname,
                        // metadata: perm.metadata || {},
                        include_ids: include_ids,
                        exclude_ids: exclude_ids
                    };
                })
            }
        };

        const serverCommunication = {
            requestType: "POST",
            apiUrl: `/assignPermissions`,
            body: {
                user_id: selectedrole?.userId,
                urdd_id: selectedrole?.userRoleDesignationDepartmentId,
                permissions: finalPermissionsToSubmit,
                actionPerformerURDD: mainData.userSelectedRole.user_role_designation_department_id
            },
            onSuccess: (res) => {
                setSubmitting(false);
                const { assignPermissionsToUser } = res;
                showSuccessToast(assignPermissionsToUser.message);
                setTimeout(() => {
                    window.location.reload();
                }, 3500);
                console.log("Permissions Updated Successfully", res);
            },
            onFailure: (err) => {
                setSubmitting(false);
                showErrorToast(err.message);
                console.log("Error Updating Permissions", err);
            },
        };

        console.log("Redux Data", mainData);
        console.log("Permissions To Submit", checkedPermissions);
        console.log("Final Permissions To Submit", finalPermissionsToSubmit);
        console.log("Server Request Body", serverCommunication.body);
        getServerResponse(serverCommunication);
    };

    // --------------- Logs ---------------
    useEffect(() => {
        console.log("Filtered Permissions", filteredPermissions);
    }, [filterPermissions, filteredPermissions]);

    useEffect(() => {
        console.log("Selected Role", selectedrole);
    }, [selectedrole]);
    // --------------- Logs ---------------

    return (
        <Box>
            {text("Assigned Permissions", "h2", 700, "15px")}
            {
                selectedrole && Object.values(selectedrole).length > 0 && !loading &&
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        minHeight: '370.9px'
                    }}
                >
                    <Box>
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
                                <Typography
                                    component="span"
                                    sx={{ textTransform: 'capitalize' }}
                                >
                                    {selectedrole.rolename}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display:
                                        Object.keys(selectedrole.permissions).length === 0 ?
                                            'none' :
                                            'block'
                                }}
                            >
                                {
                                    checkBox(
                                        null,
                                        selectedrole.isChecked,
                                        isIndeterminate(),
                                        () => handleRightAllPermissionsCheck(selectedrole.rolename)
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
                                        selectedrole.permissions && Object.keys(selectedrole.permissions).length > 0 ?
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
                                                            backgroundColor: 'background.paper',
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
                                                                    Array.isArray(filteredPermissions) &&
                                                                        filteredPermissions.length > 0 ?
                                                                        (
                                                                            filteredPermissions.map(([prmId, prm]) => {
                                                                                return (
                                                                                    <Grid item xs={12} key={prmId}>
                                                                                        <Grow
                                                                                            in={expanded}
                                                                                            timeout={400}
                                                                                            style={{
                                                                                                transformOrigin: 'center',
                                                                                            }}
                                                                                        >
                                                                                            <Box>
                                                                                                <Box
                                                                                                    sx={{
                                                                                                        display: 'flex',
                                                                                                        flexDirection: 'row',
                                                                                                        justifyContent: 'space-between',
                                                                                                        transition: 'all 0.2s ease',
                                                                                                        opacity: 1,
                                                                                                        paddingY: 0.5
                                                                                                    }}
                                                                                                >
                                                                                                    <Box
                                                                                                        sx={{
                                                                                                            display: 'flex',
                                                                                                            flexDirection: 'row',
                                                                                                            alignItems: 'center',
                                                                                                        }}
                                                                                                    >
                                                                                                        <IconButton onClick={() =>
                                                                                                            expandedPermissionId === prm.permissionid
                                                                                                                ? handlePermissionCollapse()
                                                                                                                : handlePermissionExpand(prm.permissionid)}>
                                                                                                            {
                                                                                                                expandedPermissionId === prm.permissionid ?
                                                                                                                    <KeyboardArrowDownRounded /> :
                                                                                                                    <KeyboardArrowRightRounded />
                                                                                                            }
                                                                                                        </IconButton>
                                                                                                        <Typography
                                                                                                            sx={{
                                                                                                                wordBreak: 'break-word',
                                                                                                                whiteSpace: 'normal',
                                                                                                                overflowWrap: 'break-word',
                                                                                                            }}
                                                                                                            component="span"
                                                                                                        >
                                                                                                            {formatPermissionName(prm.permissionname)}
                                                                                                        </Typography>
                                                                                                    </Box>
                                                                                                    <Box
                                                                                                        sx={{
                                                                                                            display: 'flex',
                                                                                                            alignItems: 'center',
                                                                                                        }}
                                                                                                    >
                                                                                                        {
                                                                                                            checkBox(
                                                                                                                null,
                                                                                                                prm.isChecked,
                                                                                                                false,
                                                                                                                () => handleRightIndividualPermissionCheck(
                                                                                                                    selectedrole.rolename,
                                                                                                                    prm.permissionid,
                                                                                                                    prm.permissionname
                                                                                                                )
                                                                                                            )
                                                                                                        }
                                                                                                    </Box>
                                                                                                </Box>
                                                                                                {expandedPermissionId === prm.permissionid && (
                                                                                                    <Grow
                                                                                                        in={expandedPermissionId === prm.permissionid}
                                                                                                        timeout={400}
                                                                                                        style={{
                                                                                                            transformOrigin: 'center',
                                                                                                        }}
                                                                                                    >
                                                                                                        <Box
                                                                                                            sx={{
                                                                                                                mt: 1,
                                                                                                                mx: 0.5,
                                                                                                                px: 2,
                                                                                                                py: 2,
                                                                                                                backgroundColor: '#F9F9F9',
                                                                                                                border: '1px solid #EFEFEF',
                                                                                                                transition: 'all 0.2s ease',
                                                                                                                opacity: 1
                                                                                                            }}
                                                                                                        >
                                                                                                            <FormControl fullWidth>
                                                                                                                <FormLabel
                                                                                                                    id="preference-radio-buttons-group"
                                                                                                                >
                                                                                                                    Select a Preference
                                                                                                                </FormLabel>
                                                                                                                <RadioGroup
                                                                                                                    row
                                                                                                                    aria-labelledby="preference-radio-buttons-group"
                                                                                                                    name="radio-buttons-group"
                                                                                                                    value={prm.preference}
                                                                                                                    onChange={(event) =>
                                                                                                                        handlePreference(
                                                                                                                            event,
                                                                                                                            prm.permissionid,
                                                                                                                            prm.permissionname
                                                                                                                        )
                                                                                                                    }
                                                                                                                    sx={{ width: '100%' }}
                                                                                                                >
                                                                                                                    <Grid container>
                                                                                                                        <Grid item xs={6} md={6}>
                                                                                                                            <FormControlLabel
                                                                                                                                value="all"
                                                                                                                                control={<Radio />}
                                                                                                                                label="All"
                                                                                                                            />
                                                                                                                        </Grid>
                                                                                                                        <Grid item xs={6} md={6}>
                                                                                                                            <FormControlLabel
                                                                                                                                value="created-by"
                                                                                                                                control={<Radio />}
                                                                                                                                label="Created By"
                                                                                                                            />
                                                                                                                        </Grid>
                                                                                                                        <Grid item xs={6} md={6}>
                                                                                                                            <FormControlLabel
                                                                                                                                value="include"
                                                                                                                                control={<Radio />}
                                                                                                                                label="Include"
                                                                                                                            />
                                                                                                                        </Grid>
                                                                                                                        <Grid item xs={6} md={6}>
                                                                                                                            <FormControlLabel
                                                                                                                                value="exclude"
                                                                                                                                control={<Radio />}
                                                                                                                                label="Exclude"
                                                                                                                            />
                                                                                                                        </Grid>
                                                                                                                    </Grid>
                                                                                                                </RadioGroup>
                                                                                                            </FormControl>
                                                                                                            {
                                                                                                                (prm.preference === "include" || prm.preference === "exclude") && (
                                                                                                                    <Grid
                                                                                                                        container
                                                                                                                        sx={{
                                                                                                                            pt: 2,
                                                                                                                            mt: 2,
                                                                                                                            borderTop: !loadingPermissions ?
                                                                                                                                '1px solid #EFEFEF' :
                                                                                                                                'none'
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        {
                                                                                                                            loadingPermissions ?
                                                                                                                                (
                                                                                                                                    <Box sx={{
                                                                                                                                        display: 'flex',
                                                                                                                                        justifyContent: 'center',
                                                                                                                                        alignItems: 'center',
                                                                                                                                        minHeight: '10vh',
                                                                                                                                        width: '100%'
                                                                                                                                    }}
                                                                                                                                    >
                                                                                                                                        <CircularProgress size="30px" color="inherit" />
                                                                                                                                    </Box >
                                                                                                                                )
                                                                                                                                :
                                                                                                                                (
                                                                                                                                    <>
                                                                                                                                        {
                                                                                                                                            prm.preference === "include" &&
                                                                                                                                            Array.isArray(prm.include_ids) &&
                                                                                                                                            prm.include_ids.length > 0 &&
                                                                                                                                            prm.include_ids.map((prmTable) => (
                                                                                                                                                <Grid item xs={12} md={6} key={prmTable.id}>
                                                                                                                                                    <Box
                                                                                                                                                        sx={{
                                                                                                                                                            display: 'flex',
                                                                                                                                                            flexDirection: 'row',
                                                                                                                                                            justifyContent: 'start',
                                                                                                                                                            alignItems: 'center',
                                                                                                                                                            transition: 'all 0.2s ease',
                                                                                                                                                            opacity: 1,
                                                                                                                                                        }}
                                                                                                                                                    >
                                                                                                                                                        {
                                                                                                                                                            checkBox(
                                                                                                                                                                null,
                                                                                                                                                                prmTable.isChecked,
                                                                                                                                                                false,
                                                                                                                                                                () => handleInclude(
                                                                                                                                                                    prm.permissionid,
                                                                                                                                                                    prmTable.id
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
                                                                                                                                                            {formatPermissionName(prmTable.name)}
                                                                                                                                                        </Typography>
                                                                                                                                                    </Box>
                                                                                                                                                </Grid>
                                                                                                                                            ))
                                                                                                                                        }
                                                                                                                                        {
                                                                                                                                            prm.preference === "exclude" &&
                                                                                                                                            Array.isArray(prm.exclude_ids) &&
                                                                                                                                            prm.exclude_ids.length > 0 &&
                                                                                                                                            prm.exclude_ids.map((prmTable) => (
                                                                                                                                                <Grid item xs={12} md={6} key={prmTable.id}>
                                                                                                                                                    <Box
                                                                                                                                                        sx={{
                                                                                                                                                            display: 'flex',
                                                                                                                                                            flexDirection: 'row',
                                                                                                                                                            justifyContent: 'start',
                                                                                                                                                            alignItems: 'center',
                                                                                                                                                            transition: 'all 0.2s ease',
                                                                                                                                                            opacity: 1
                                                                                                                                                        }}
                                                                                                                                                    >
                                                                                                                                                        {
                                                                                                                                                            checkBox(
                                                                                                                                                                null,
                                                                                                                                                                prmTable.isChecked,
                                                                                                                                                                false,
                                                                                                                                                                () => handleExclude(
                                                                                                                                                                    prm.permissionid,
                                                                                                                                                                    prmTable.id
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
                                                                                                                                                            {formatPermissionName(prmTable.name)}
                                                                                                                                                        </Typography>
                                                                                                                                                    </Box>
                                                                                                                                                </Grid>
                                                                                                                                            ))
                                                                                                                                        }
                                                                                                                                    </>
                                                                                                                                )
                                                                                                                        }
                                                                                                                    </Grid>
                                                                                                                )
                                                                                                            }
                                                                                                        </Box>
                                                                                                    </Grow>
                                                                                                )}
                                                                                            </Box>
                                                                                        </Grow>
                                                                                    </Grid>
                                                                                )
                                                                            })
                                                                        )
                                                                        :
                                                                        (
                                                                            <Grid item xs={12}>
                                                                                <Typography
                                                                                    variant="body1"
                                                                                    sx={{ opacity: 0.6, mt: 0.5, mx: 1 }}>
                                                                                    No permission found
                                                                                </Typography>
                                                                            </Grid>
                                                                        )
                                                                }
                                                            </>
                                                        )
                                                        :
                                                        (
                                                            Object.entries(selectedrole.permissions).map(([prmId, prm]) => {
                                                                return (
                                                                    <Grid item xs={12} key={prmId}>
                                                                        <Grow
                                                                            in={expanded}
                                                                            timeout={400}
                                                                            style={{
                                                                                transformOrigin: 'center',
                                                                            }}
                                                                        >
                                                                            <Box>
                                                                                <Box
                                                                                    sx={{
                                                                                        display: 'flex',
                                                                                        flexDirection: 'row',
                                                                                        justifyContent: 'space-between',
                                                                                        transition: 'all 0.2s ease',
                                                                                        opacity: 1,
                                                                                        paddingY: 0.5
                                                                                    }}
                                                                                >
                                                                                    <Box
                                                                                        sx={{
                                                                                            display: 'flex',
                                                                                            flexDirection: 'row',
                                                                                            alignItems: 'center',
                                                                                        }}
                                                                                    >
                                                                                        <IconButton onClick={() =>
                                                                                            expandedPermissionId === prm.permissionid
                                                                                                ? handlePermissionCollapse()
                                                                                                : handlePermissionExpand(prm.permissionid)}>
                                                                                            {
                                                                                                expandedPermissionId === prm.permissionid ?
                                                                                                    <KeyboardArrowDownRounded /> :
                                                                                                    <KeyboardArrowRightRounded />
                                                                                            }
                                                                                        </IconButton>
                                                                                        <Typography
                                                                                            sx={{
                                                                                                wordBreak: 'break-word',
                                                                                                whiteSpace: 'normal',
                                                                                                overflowWrap: 'break-word',
                                                                                            }}
                                                                                            component="span"
                                                                                        >
                                                                                            {formatPermissionName(prm.permissionname)}
                                                                                        </Typography>
                                                                                    </Box>
                                                                                    <Box
                                                                                        sx={{
                                                                                            display: 'flex',
                                                                                            alignItems: 'center',
                                                                                        }}
                                                                                    >
                                                                                        {
                                                                                            checkBox(
                                                                                                null,
                                                                                                prm.isChecked,
                                                                                                false,
                                                                                                () => handleRightIndividualPermissionCheck(
                                                                                                    selectedrole.rolename,
                                                                                                    prm.permissionid,
                                                                                                    prm.permissionname
                                                                                                )
                                                                                            )
                                                                                        }
                                                                                    </Box>
                                                                                </Box>
                                                                                {expandedPermissionId === prm.permissionid && (
                                                                                    <Grow
                                                                                        in={expandedPermissionId === prm.permissionid}
                                                                                        timeout={400}
                                                                                        style={{
                                                                                            transformOrigin: 'center',
                                                                                        }}
                                                                                    >
                                                                                        <Box
                                                                                            sx={{
                                                                                                mt: 1,
                                                                                                mx: 0.5,
                                                                                                px: 2,
                                                                                                py: 2,
                                                                                                backgroundColor: '#F9F9F9',
                                                                                                border: '1px solid #EFEFEF',
                                                                                                transition: 'all 0.2s ease',
                                                                                                opacity: 1
                                                                                            }}
                                                                                        >
                                                                                            <FormControl fullWidth>
                                                                                                <FormLabel
                                                                                                    id="preference-radio-buttons-group"
                                                                                                >
                                                                                                    Select a Preference
                                                                                                </FormLabel>
                                                                                                <RadioGroup
                                                                                                    row
                                                                                                    aria-labelledby="preference-radio-buttons-group"
                                                                                                    name="radio-buttons-group"
                                                                                                    value={prm.preference}
                                                                                                    onChange={(event) =>
                                                                                                        handlePreference(
                                                                                                            event,
                                                                                                            prm.permissionid,
                                                                                                            prm.permissionname
                                                                                                        )
                                                                                                    }
                                                                                                    sx={{ width: '100%' }}
                                                                                                >
                                                                                                    <Grid container>
                                                                                                        <Grid item xs={6} md={6}>
                                                                                                            <FormControlLabel
                                                                                                                value="all"
                                                                                                                control={<Radio />}
                                                                                                                label="All"
                                                                                                            />
                                                                                                        </Grid>
                                                                                                        <Grid item xs={6} md={6}>
                                                                                                            <FormControlLabel
                                                                                                                value="created-by"
                                                                                                                control={<Radio />}
                                                                                                                label="Created By"
                                                                                                            />
                                                                                                        </Grid>
                                                                                                        <Grid item xs={6} md={6}>
                                                                                                            <FormControlLabel
                                                                                                                value="include"
                                                                                                                control={<Radio />}
                                                                                                                label="Include"
                                                                                                            />
                                                                                                        </Grid>
                                                                                                        <Grid item xs={6} md={6}>
                                                                                                            <FormControlLabel
                                                                                                                value="exclude"
                                                                                                                control={<Radio />}
                                                                                                                label="Exclude"
                                                                                                            />
                                                                                                        </Grid>
                                                                                                    </Grid>
                                                                                                </RadioGroup>
                                                                                            </FormControl>
                                                                                            {
                                                                                                (prm.preference === "include" || prm.preference === "exclude") && (
                                                                                                    <Grid
                                                                                                        container
                                                                                                        sx={{
                                                                                                            pt: 2,
                                                                                                            mt: 2,
                                                                                                            borderTop: !loadingPermissions ?
                                                                                                                '1px solid #EFEFEF' :
                                                                                                                'none'
                                                                                                        }}
                                                                                                    >
                                                                                                        {
                                                                                                            loadingPermissions ?
                                                                                                                (
                                                                                                                    <Box sx={{
                                                                                                                        display: 'flex',
                                                                                                                        justifyContent: 'center',
                                                                                                                        alignItems: 'center',
                                                                                                                        minHeight: '10vh',
                                                                                                                        width: '100%'
                                                                                                                    }}
                                                                                                                    >
                                                                                                                        <CircularProgress size="30px" color="inherit" />
                                                                                                                    </Box >
                                                                                                                )
                                                                                                                :
                                                                                                                (
                                                                                                                    <>
                                                                                                                        {
                                                                                                                            prm.preference === "include" &&
                                                                                                                            Array.isArray(prm.include_ids) &&
                                                                                                                            prm.include_ids.length > 0 &&
                                                                                                                            prm.include_ids.map((prmTable) => (
                                                                                                                                <Grid item xs={12} md={6} key={prmTable.id}>
                                                                                                                                    <Box
                                                                                                                                        sx={{
                                                                                                                                            display: 'flex',
                                                                                                                                            flexDirection: 'row',
                                                                                                                                            justifyContent: 'start',
                                                                                                                                            alignItems: 'center',
                                                                                                                                            transition: 'all 0.2s ease',
                                                                                                                                            opacity: 1,
                                                                                                                                        }}
                                                                                                                                    >
                                                                                                                                        {
                                                                                                                                            checkBox(
                                                                                                                                                null,
                                                                                                                                                prmTable.isChecked,
                                                                                                                                                false,
                                                                                                                                                () => handleInclude(
                                                                                                                                                    prm.permissionid,
                                                                                                                                                    prmTable.id
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
                                                                                                                                            {formatPermissionName(prmTable.name)}
                                                                                                                                        </Typography>
                                                                                                                                    </Box>
                                                                                                                                </Grid>
                                                                                                                            ))
                                                                                                                        }
                                                                                                                        {
                                                                                                                            prm.preference === "exclude" &&
                                                                                                                            Array.isArray(prm.exclude_ids) &&
                                                                                                                            prm.exclude_ids.length > 0 &&
                                                                                                                            prm.exclude_ids.map((prmTable) => (
                                                                                                                                <Grid item xs={12} md={6} key={prmTable.id}>
                                                                                                                                    <Box
                                                                                                                                        sx={{
                                                                                                                                            display: 'flex',
                                                                                                                                            flexDirection: 'row',
                                                                                                                                            justifyContent: 'start',
                                                                                                                                            alignItems: 'center',
                                                                                                                                            transition: 'all 0.2s ease',
                                                                                                                                            opacity: 1
                                                                                                                                        }}
                                                                                                                                    >
                                                                                                                                        {
                                                                                                                                            checkBox(
                                                                                                                                                null,
                                                                                                                                                prmTable.isChecked,
                                                                                                                                                false,
                                                                                                                                                () => handleExclude(
                                                                                                                                                    prm.permissionid,
                                                                                                                                                    prmTable.id
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
                                                                                                                                            {formatPermissionName(prmTable.name)}
                                                                                                                                        </Typography>
                                                                                                                                    </Box>
                                                                                                                                </Grid>
                                                                                                                            ))
                                                                                                                        }
                                                                                                                    </>
                                                                                                                )
                                                                                                        }
                                                                                                    </Grid>
                                                                                                )
                                                                                            }
                                                                                        </Box>
                                                                                    </Grow>
                                                                                )}
                                                                            </Box>
                                                                        </Grow>
                                                                    </Grid>
                                                                )
                                                            })
                                                        )
                                                }
                                            </>
                                            :
                                            (
                                                <Typography
                                                    variant="body1"
                                                    sx={{ opacity: 0.6 }}
                                                >
                                                    No permission available
                                                </Typography>
                                            )
                                    }
                                </Grid>
                            </Box>
                        </Collapse >
                    </Box>
                    <Box sx={{
                        mt: 3,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderTop: '1px solid #eee',
                        pt: 2
                    }}>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={
                                disabledDuringLoading ||
                                submitting ||
                                Object.keys(selectedrole.permissions).length === 0
                            }
                            sx={{
                                minWidth: 120,
                                backgroundColor: '#1976d2',
                                borderRadius: '8px',
                                boxShadow: 'none',
                                '&:hover': {
                                    backgroundColor: '#1565c0'
                                },
                                '&.Mui-disabled': {
                                    backgroundColor: '#E0E0E0 !important',
                                    color: '#AFA6A6 !important',
                                },
                            }}
                        >
                            {
                                submitting ?
                                    <CircularProgress size={24} color="inherit" /> :
                                    'Submit'
                            }
                        </Button>
                    </Box>
                </Box>
            }
        </Box >
    )
}

export default GridItemRight