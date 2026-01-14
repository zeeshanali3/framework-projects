const {projectDB} = require("../../../../../Services/Integrations/Database/projectDb.js");
const { executeQuery } = require("../../../../../Services/Integrations/Database/queryExecution.js");

async function getuserrolepermissionsarray(req, decryptedPayload) {
    const userId = req.query.userId;


    const rolePermissionsQuery = `
        SELECT DISTINCT
            r.role_id,
            r.role_name,
            urdd.user_role_designation_department_id,
            p.permission_id,
            p.permission_name,
            urdp.included_id,
            urdp.excluded_id
        FROM users u
        INNER JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
        INNER JOIN roles_designations_department rdd ON urdd.role_designation_department_id = rdd.role_designation_department_id
        INNER JOIN roles r ON rdd.role_id = r.role_id
        INNER JOIN user_role_designation_permissions urdp ON urdd.user_role_designation_department_id = urdp.user_role_designation_department_id
        INNER JOIN permissions p ON urdp.permission_id = p.permission_id
        WHERE u.user_id = ?
        AND urdd.status != 'inactive'
        ORDER BY r.role_name, p.permission_name
    `;

    const connection = await projectDB();
    const results = await executeQuery(rolePermissionsQuery, [userId], connection);

    // Transform the flat results into nested structure
    const rolesMap = new Map();

    results.forEach(row => {
        if (!rolesMap.has(row.role_id)) {
            rolesMap.set(row.role_id, {
                role_id: row.role_id,
                role_name: row.role_name,
                user_role_designation_department_id: row.user_role_designation_department_id,
                permissions: []
            });
        }

        const role = rolesMap.get(row.role_id);
        role.permissions.push({
            permission_id: row.permission_id,
            permission_name: row.permission_name,
            permission_description: row.permission_description,
            permission_group: row.permission_group,
            permission_type: row.permission_type,
            status: row.permission_status,
            created_at: row.permission_created_at,
            updated_at: row.permission_updated_at,
            include_ids: row.included_id ? JSON.parse(row.included_id) : [],   // safely defaulting to [] if undefined
            exclude_ids: row.excluded_id ? JSON.parse(row.excluded_id) : []
        });
    });

    // Convert Map to array
    const response = Array.from(rolesMap.values());

    return {
        return: response,
        message: "User roles and permissions retrieved successfully"
    };
}

global.UserRolePermissionArray_object = {
    versions: {
        versionData: [
            {
                "*": {
                    steps: [
                        {
                            config: {
                                features: {
                                    multistep: false,
                                    parameters: true,
                                    pagination: true,
                                },
                                communication: {
                                    encryption: {
                                        platformEncryption: true,
                                        accessToken: true,
                                    },
                                },
                                verification: {
                                    otp: false,
                                    accessToken: false,
                                },
                            },
                            data: {
                                parameters: null,
                                apiInfo: {
                                    query: {
                                        queryNature: null,
                                        preProcessFunction: [],
                                        queryPayload: null
                                    },
                                    utilityFunctions: {
                                        callbackFunction: null,
                                        payloadFunction: [],
                                        crudFunction: null,
                                    },
                                    postProcessFunction: getuserrolepermissionsarray,
                                },
                                requestMetaData: {
                                    requestMethod: "GET",
                                    permission: null,
                                    pagination: null,
                                },
                            },
                            response: {
                                successMessage: "User roles and permissions retrieved successfully!",
                                errorMessage: "Unable to load user roles and permissions. Please check your access rights and try again.",
                            },
                        },
                    ],
                },
            },
        ],
    },
};

module.exports = { UserRolePermissionArray_object }


// /* CRUD Objects for table: users */
// const projectDB = require("../../../Database/projectDb");
// const { executeQuery } = require("../../../Database/queryExecution");

// async function getuserrolepermissionsarray(req, decryptedPayload) {
//     const userId = req.query.userId;

//     // Get roles with permissions in a single query
//     // const rolePermissionsQuery = `
//     //     SELECT DISTINCT
//     //         r.role_id,
//     //         r.role_name,
//     //         p.permission_id,
//     //         p.permission_name
//     //     FROM users u
//     //     INNER JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
//     //     INNER JOIN roles_designations_department rdd ON urdd.role_designation_department_id = rdd.role_designation_department_id
//     //     INNER JOIN roles r ON rdd.role_id = r.role_id
//     //     INNER JOIN user_role_designation_permissions urdp ON urdd.user_role_designation_department_id = urdp.user_role_designation_department_id
//     //     INNER JOIN permissions p ON urdp.permission_id = p.permission_id
//     //     WHERE u.user_id = ?
//     //     AND urdd.status != 'inactive'
//     //     ORDER BY r.role_name, p.permission_name
//     // `;

//     // From ChatGpt
//     const rolePermissionsQuery = `
//         SELECT DISTINCT
//             r.role_id,
//             r.role_name,
//             p.permission_id,
//             p.permission_name,
//             urdp.*  -- This includes all columns from the urdp table
//         FROM users u
//         INNER JOIN user_roles_designations_department urdd 
//             ON u.user_id = urdd.user_id
//         INNER JOIN roles_designations_department rdd 
//             ON urdd.role_designation_department_id = rdd.role_designation_department_id
//         INNER JOIN roles r 
//             ON rdd.role_id = r.role_id
//         INNER JOIN user_role_designation_permissions urdp 
//             ON urdd.user_role_designation_department_id = urdp.user_role_designation_department_id
//         INNER JOIN permissions p 
//             ON urdp.permission_id = p.permission_id
//         WHERE u.user_id = ?
//         AND urdd.status != 'inactive'
//         ORDER BY r.role_name, p.permission_name;
//     `;

//     const results = await executeQuery(rolePermissionsQuery, [userId], projectDB());
//     console.log("results user role permissions", results)
//     // Transform the flat results into nested structure
//     const rolesMap = new Map();

//     results.forEach(row => {
//         if (!rolesMap.has(row.role_id)) {
//             rolesMap.set(row.role_id, {
//                 role_id: row.role_id,
//                 role_name: row.role_name,
//                 permissions: []
//             });
//         }

//         const role = rolesMap.get(row.role_id);
//         role.permissions.push({
//             permission_id: row.permission_id,
//             permission_name: row.permission_name,
//             permission_description: row.permission_description,
//             permission_group: row.permission_group,
//             permission_type: row.permission_type,
//             status: row.permission_status,
//             created_at: row.permission_created_at,
//             updated_at: row.permission_updated_at,
//             include_ids: row.included_id ? JSON.parse(row.included_id) : [],   // safely defaulting to [] if undefined
//             exclude_ids: row.excluded_id ? JSON.parse(row.excluded_id) : []
//             // include_ids: row.include_ids || [],
//             // exclude_ids: row.exclude_ids || []
//         });
//     });

//     // Convert Map to array
//     const response = Array.from(rolesMap.values());

//     return {
//         return: response,
//         message: "User roles and permissions retrieved successfully"
//     };
// }

// global.UserRolePermissionArray_object = {
//     versions: {
//         versionData: [
//             {
//                 "*": {
//                     steps: [
//                         {
//                             config: {
//                                 features: {
//                                     multistep: false,
//                                     parameters: true,
//                                     pagination: true,
//                                 },
//                                 communication: {
//                                     encryption: {
//                                         platformEncryption: true,
//                                     },
//                                 },
//                                 verification: {
//                                     otp: false,
//                                     accessToken: false,
//                                 },
//                             },
//                             data: {
//                                 parameters: null,
//                                 apiInfo: {
//                                     query: {
//                                         queryNature: null,
//                                         preProcessFunction: [],
//                                         queryPayload: null
//                                     },
//                                     utilityFunctions: {
//                                         callbackFunction: null,
//                                         payloadFunction: [],
//                                         crudFunction: null,
//                                     },
//                                     postProcessFunction: getuserrolepermissionsarray,
//                                 },
//                                 requestMetaData: {
//                                     requestMethod: "GET",
//                                     permission: null,
//                                     pagination: null,
//                                 },
//                             },
//                             response: {
//                                 successMessage: "User roles and permissions retrieved successfully!",
//                                 errorMessage: "Failed to retrieve user roles and permissions.",
//                             },
//                         },
//                     ],
//                 },
//             },
//         ],
//     },
// };

// module.exports = { UserRolePermissionArray_object }