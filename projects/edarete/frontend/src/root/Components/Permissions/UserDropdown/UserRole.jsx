import React, { useState, useEffect } from 'react'
import {
    Box,
    OutlinedInput,
    InputLabel,
    MenuItem,
    FormControl,
    ListItemText,
    Select,
    CircularProgress
} from '@mui/material'
import constants from "../../../Common/Constants"
import { getServerResponse } from '../../Helpers/getServerResponse'
import { formatUserName } from '../index'
import { text } from '../index'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const UserRole = ({ selectedUser, selectedrole, setSelectedRole }) => {
    const [selectedUserRoles, setSelectedUserRoles] = useState([]);
    const [userRoles, setUserRoles] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setSelectedRole('');

        const servercommunication = {
            requestType: "GET",
            apiUrl: '/user/role/permission/array' + constants.version + '&userId=' + selectedUser.id,
            body: {},
            metaData: true,
            onSuccess: (res) => {
                console.log("On Success", res);
                const fetchedRoles = res.return;
                setSelectedUserRoles(fetchedRoles);

                if (fetchedRoles && fetchedRoles.length > 0) {
                    const initialRoles = {};

                    fetchedRoles.forEach(role => {
                        const { user_role_designation_department_id, role_id, role_name, permissions } = role;

                        initialRoles[role_id] = {
                            userId: selectedUser.id,
                            userRoleDesignationDepartmentId: user_role_designation_department_id,
                            id: role_id,
                            rolename: role_name,
                            isChecked: true,
                            permissions: {},
                        };

                        permissions.forEach(prm => {
                            let preference = '';

                            if (prm.include_ids?.length === 1 && prm.include_ids.includes('*')) {
                                preference = 'created-by';
                            } else if (
                                (!prm.include_ids || prm.include_ids.length === 0) &&
                                (!prm.exclude_ids || prm.exclude_ids.length === 0)
                            ) {
                                preference = 'all';
                            } else {
                                preference = '';
                            }

                            initialRoles[role_id].permissions[prm.permission_id] = {
                                permissionid: prm.permission_id,
                                permissionname: prm.permission_name,
                                isChecked: true,
                                include_ids: prm.include_ids,
                                exclude_ids: prm.exclude_ids,
                                includeLoaded: false,
                                excludeLoaded: false,
                                preference: preference
                            };
                        });
                    });
                    setUserRoles(initialRoles);
                } else {
                    setUserRoles({});
                }
                setLoading(false);
            },
            onFailure: (res) => {
                console.log("On Failure", res);
                setUserRoles({});
            },
        };
        getServerResponse(servercommunication);

        return () => {
            setLoading(false);
        };
    }, [selectedUser]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedRole(value);
    };

    // --------------- Logs ---------------
    useEffect(() => {
        console.log("Selected User Roles", selectedUserRoles);
    }, [selectedUserRoles]);

    useEffect(() => {
        console.log("Selected User Roles Object", userRoles);
    }, [userRoles]);

    useEffect(() => {
        console.log("Selected Role Through Roles Dropdown", selectedrole);
    }, [selectedrole]);
    // --------------- Logs ---------------

    return (
        <FormControl sx={{ width: '35%' }}>
            <InputLabel id="role-label">Roles</InputLabel>
            <Select
                labelId="role-label"
                id="role"
                value={selectedrole}
                onChange={handleChange}
                input={<OutlinedInput label="Roles" />}
                renderValue={(selected) => formatUserName(selected.rolename)}
                MenuProps={MenuProps}
                sx={{ borderRadius: '8px' }}
            >
                {
                    loading ?
                        (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    minHeight: '25vh'
                                }}
                            >
                                <CircularProgress size="30px" color="inherit" />
                            </Box >
                        )
                        :
                        (
                            userRoles && Object.keys(userRoles).length > 0 ? (
                                Object.entries(userRoles).map(([roleId, role]) => (
                                    <MenuItem key={roleId} value={role} sx={{ paddingX: 2, paddingY: 1.5 }}>
                                        <ListItemText primary={formatUserName(role.rolename)} />
                                    </MenuItem>
                                ))
                            ) : (
                                <Box sx={{ padding: '5px 10px' }}>
                                    {text("No results found", "h2", 500, "0px")}
                                </Box>
                            )
                        )
                }
            </Select>
        </FormControl>
    )
}

export default UserRole