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
import UserRole from './UserRole'

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

const UserDropdown = ({ selectedUser, setSelectedUser, selectedrole, setSelectedRole }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const servercommunication = {
            requestType: "GET",
            apiUrl: constants.users + constants.dropDown + constants.version,
            body: {},
            metaData: true,
            onSuccess: (res) => {
                console.log("On Success", res);
                const usersList = res.return.map((user) => ({
                    id: user.value,
                    name: user.label
                }));
                setUsers(usersList);
                setLoading(false);
            },
            onFailure: (res) => {
                console.log("On Failure", res);
            },
        }
        getServerResponse(servercommunication);

        // --------------- State Cleanup When Unmount ---------------
        return () => {
            setLoading(false);
        }
    }, []);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedUser(value);
    };

    // --------------- Logs ---------------
    useEffect(() => {
        console.log("All Users", users);
    }, [users]);

    useEffect(() => {
        console.log("Selected User", selectedUser);
    }, [selectedUser]);
    // --------------- Logs ---------------

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: 'center',
                backgroundColor: "white",
                borderRadius: '8px',
                padding: '15px 30px'
            }}
        >
            <FormControl sx={{ width: "35%" }}>
                <InputLabel id="user-label">Users</InputLabel>
                <Select
                    labelId="user-label"
                    id="user"
                    value={selectedUser}
                    onChange={handleChange}
                    input={<OutlinedInput label="Users" />}
                    renderValue={(selected) => formatUserName(selected.name)}
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
                                users.map((user) => (
                                    <MenuItem key={user.id} value={user} sx={{ paddingX: 2, paddingY: 1.5 }}>
                                        <ListItemText primary={formatUserName(user.name)} />
                                    </MenuItem>
                                ))
                            )
                    }
                </Select>
            </FormControl>
            {
                selectedUser && Object.entries(selectedUser).length > 0 &&
                <UserRole
                    selectedUser={selectedUser}
                    selectedrole={selectedrole}
                    setSelectedRole={setSelectedRole}
                />
            }
        </Box>
    )
}

export default UserDropdown