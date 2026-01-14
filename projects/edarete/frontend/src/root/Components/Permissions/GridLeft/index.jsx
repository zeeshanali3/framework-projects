import React, { useState, useEffect } from 'react'
import { Box, CircularProgress } from '@mui/material'
import constants from "../../../Common/Constants"
import { getServerResponse } from '../../Helpers/getServerResponse'
import DraggableRole from './Role'
import { text } from '../index'

// Format permissions response by grouping permissions with same group name
const formatPermissionsResponse = (permissionsArray) => {
    // Create an object to store grouped permissions
    const groupedPermissions = {};

    // Group permissions by group name
    permissionsArray.forEach(permission => {
        const groupName = permission.permission_groups_groupName;

        // Format individual permission object
        const formattedPermission = {
            permission_id: permission.permissionGroupsPermissions_permissionId,
            permission_name: permission.permissions_permissionName,
            status: permission.permissionGroupsPermissions_status,
            created_at: permission.permissionGroupsPermissions_createdAt,
            updated_at: permission.permissionGroupsPermissions_updatedAt,
            created_by: permission.permissionGroupsPermissions_createdBy,
            updated_by: permission.permissionGroupsPermissions_updatedBy,
            group_permission_id: permission.permissionGroupsPermissions_id
        };

        // If group doesn't exist, create it
        if (!groupedPermissions[groupName]) {
            groupedPermissions[groupName] = {
                group_name: groupName,
                permissions: []
            };
        }

        // Add permission to its group
        groupedPermissions[groupName].permissions.push(formattedPermission);
    });

    // Convert object to array
    return Object.values(groupedPermissions);
};

const GridItemLeft = ({
    selectedrole,
    setSelectedRole,
    selectedRolePermissions,
    setSelectedRolePermissions,
    loading,
    setLoading
}) => {
    const [urdd, setURDD] = useState([]);

    // User Role Designation Permissions API
    const servercommunication = {
        requestType: "GET",
        apiUrl: constants.crud + constants.permission_groups_permissions + constants.version,
        body: {},
        metaData: true,
        onSuccess: (res) => {
            console.log("On Success", res);
        },
        onFailure: (res) => {
            console.log("On Failure", res);
        },
    }

    // Get Server Response
    useEffect(() => {
        setLoading(true);
        setSelectedRolePermissions({});
        const onSuccess = (res) => {
            console.log("On Success", res.return);
            const formattedPermissions = formatPermissionsResponse(res.return);
            setURDD(formattedPermissions);
            if (formattedPermissions && formattedPermissions.length > 0) {
                const initialPermissions = {};

                const matchedGroup = formattedPermissions.find(
                    group => group.group_name === selectedrole.rolename
                );

                if (matchedGroup) {
                    const { group_name, permissions } = matchedGroup;

                    initialPermissions[group_name] = {
                        groupname: group_name,
                        isChecked: false,
                        permissions: {},
                    };
                    console.log("Number of Permissions Available Before Excluding", permissions.length);
                    permissions.forEach(prm => {
                        if (!selectedrole?.permissions?.hasOwnProperty(prm.permission_id)) {
                            initialPermissions[group_name].permissions[prm.permission_id] = {
                                permissionid: prm.permission_id,
                                permissionname: prm.permission_name,
                                isChecked: false,
                                include_ids: [],
                                exclude_ids: [],
                                includeLoaded: false,
                                excludeLoaded: false,
                                preference: 'all'
                            };
                        }
                    });
                    console.log("Permissions Added (Excluding Already Present In Selected Role):",
                        Object.keys(initialPermissions[group_name].permissions).length
                    );
                }
                setSelectedRolePermissions(initialPermissions);
            }
            else {
                setSelectedRolePermissions({});
            }
            setLoading(false);
        }
        const onFailure = (err) => {
            console.log("On Failure", err);
        }
        if (servercommunication.onSuccess) {
            servercommunication.onSuccess = onSuccess;
        }
        if (servercommunication.onFailure) {
            servercommunication.onFailure = onFailure;
        }
        getServerResponse(servercommunication);

        // State Cleanup When Unmount
        return () => {
            setLoading(false);
            setSelectedRolePermissions({});
        }
    }, [selectedrole.id]);

    // --------------- Logs ---------------
    useEffect(() => {
        console.log("User Role Designation Permissions API", urdd);
    }, [urdd]);

    useEffect(() => {
        console.log("Selected User Role Permissions Group", selectedRolePermissions);
    }, [selectedRolePermissions]);

    useEffect(() => {
        console.log("Number Of Permissions Available In The Selected Role:", Object.entries(selectedrole.permissions).length);
    }, [selectedrole]);
    // --------------- Logs ---------------

    return (
        <>
            {text("Unassigned Permissions", "h2", 700, "15px")}
            {
                loading ?
                    (
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '50vh'
                        }}
                        >
                            <CircularProgress color="inherit" />
                        </Box >
                    )
                    : selectedRolePermissions && Object.keys(selectedRolePermissions).length > 0 ?
                        (
                            Object.entries(selectedRolePermissions)
                                .map(([groupName, groupData]) => {
                                    return (
                                        <DraggableRole
                                            key={groupName}
                                            roleName={groupData.groupname}
                                            roleCheck={groupData.isChecked}
                                            rolePermissions={groupData.permissions}
                                            setSelectedRole={setSelectedRole}
                                            setSelectedRolePermissions={setSelectedRolePermissions}
                                        />
                                    )
                                })
                        )
                        :
                        (
                            text("No results found", "h2", 500, "0px")
                        )
            }
        </>
    )
}

export default GridItemLeft