
const data={
    "tableCounts": {
        "devices": 5,
        "groups": 5,
        "permissiongroups": 0,
        "permissions": 4, //newPermissionsAdded Today/last/recent days whatever?
        //permissionsTableData: [
    //       {
    //         RoleName: "Edit Marks",
    //         permissions: 150,
    //         users: 250
    //       },
    //       {
    //         RoleName: "Student Info",
    //         permissions: 150,
    //         users: 250
    //       },
          
    //     ]
    //   }
    //permission given to each role(e.g:HR or any role)  number of permissions to that role:(e.g:HR has 25 permissions)
        "platforms": 5,
        "platformversions": 1,
        "roles": 3,//newRoleAdded Today/last/recent days whatever?   //number of permissions assigned to this role   //number of users assigned to this role
        // rolesTableData: [
        //     {
        //       RoleName: "Hr",
        //       permissions: 25,
        //       users: 120
        //     },
        //     {
        //       RoleName: "Examiner",
        //       permissions: 25,
        //       users: 500
        //     },
        //   ]
        // count and labels of all type of roles //e.g:pendingRoles,InactiveRoles,ActiveRoles
        "useractivity": 167,
        "userdevices": 6,
        "userroles": 6,
        "userrolespermissiongroups": 0,
        "users": 27, //newUserAdded Today/last/recent days whatever?  //number of permissions assigned to each user 
    //     usersTableData: [
    //     {
    //       UserName: "Hamad",
    //       permissions: 2000,
    //       users: 18335
    //     },
    //     {
    //       UserName: "Noor",
    //       permissions: 2000,
    //       users: 18335
    //     },
        
    //   ]
    // Active,InactiveUser count
        "versions": 5
    },
    "permissionsPerGroup": [
        {
            "group_id": 6,
            "group_name": "Admin Group",
            "permission_count": 0
        },
        {
            "group_id": 7,
            "group_name": "User Group",
            "permission_count": 0
        },
        {
            "group_id": 8,
            "group_name": "Guest Group",
            "permission_count": 0
        },
        {
            "group_id": 9,
            "group_name": "Support Group",
            "permission_count": 0
        },
        {
            "group_id": 10,
            "group_name": "Developer Group",
            "permission_count": 0
        }
    ],
    "overlappingPermissions": [],
    "unassignedPermissions": [
        {
            "unassigned_permissions_count": 4
        }
    ],
    "activeUsers": [
        {
            "active_users_count": 27
        }
    ],
    "inactiveUsers": [
        {
            "inactive_users_count": 0
        }
    ],
    "securityDbTableCounts": [
        {
            "table_name": "crash_log",
            "record_count": 16,
            //status_wise crash logs[e.g: new:10,pending:20,resolved:10]
        },
        {
            "table_name": "email_log",
            "record_count": 23
            //categorywise email logs[e.g: sent:20,failed:10]
        },
        {
            //eventLogs e.g activitylogs
            //e.g categorywisecount with their labels
            //number OfEmailSents:30
            //number reports generated:20
            //number of filesUploaded:10
        },
        {
            "table_name": "error_log",
            "record_count": 174
            //categorywise error logs[e.g: 404:10,500:20]
        },
        {
            "table_name": "security_log",
            "record_count": 0,
            //categorywise crash logs[e.g: FailedLgin:20,IpBlocked:10]

        }
    ],
    "usersPerPermissionGroup": []
}