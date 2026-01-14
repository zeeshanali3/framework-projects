const logMessage = require("../../../../../Services/SysFunctions/LogFunctions/consoleLog.js");
const otpVerif = require("../../../../../Services/SysFunctions/otpVerif");
const { executeQuery } = require("../../../../../Services/Integrations/Database/queryExecution");
const { signUpVerif } = require("../../../../HelperFunctions/PreProcessingFunctions/signUpVerif")
const generatePayload=require("../../../../../Services/SysFunctions/generatePayload")
const generateToken = require('../../../../../Services/SysFunctions/jwtUtils');

async function insertEntries(req, decryptedPayload) {
    const signUpPayload = decryptedPayload["signUpVerif"];  
    logMessage(["decrypted payload ============================" , signUpPayload]);
    logMessage([global.isValidDomain(signUpPayload)])
    if (await global.isValidDomain(signUpPayload) != true) {
        throw new Error("Domain not allowed");
    }

    let user = await executeQuery(
        `SELECT user_id FROM users WHERE email = ? OR username = ?`,
        [signUpPayload.email, signUpPayload.name]
    );

    let user_id;
    if (user.length > 0) {
        user_id = user[0].user_id;
    } else {
        user_id = (
            await executeQuery(
                `INSERT INTO users (email, username, first_name, last_name, created_by, updated_by) 
                 VALUES (?, ?, ?, ?, 1, 1)`,
                [
                    signUpPayload.email,
                    signUpPayload.name,
                    signUpPayload.first_name,
                    signUpPayload.last_name,
                ]
            )
        ).insertId;
    }

    let designation_id = (
        await executeQuery(
            `SELECT designation_id FROM designations WHERE designation_name = 'User'`
        )
    )[0].designation_id;

    let role_id = (
        await executeQuery(
            `SELECT role_id FROM roles WHERE role_name = 'Student'`
        )
    )[0].role_id;

    let department_id = (
        await executeQuery(
            `SELECT department_id FROM departments WHERE department_name = 'Engineering'`
        )
    )[0].department_id;

    let rdd = await executeQuery(
        `SELECT role_designation_department_id  FROM roles_designations_department 
         WHERE role_id = ? AND designation_id = ? AND department_id = ?`,
        [role_id, designation_id, department_id]
    );

    let rdd_id;
    if (rdd.length > 0) {
        rdd_id = rdd[0].role_designation_department_id;
    } else {
        rdd_id = (
            await executeQuery(
                `INSERT INTO roles_designations_department (role_id, designation_id, department_id) 
                 VALUES (?, ?, ?)`,
                [role_id, designation_id, department_id]
            )
        ).insertId;
    }


    let urdd = await executeQuery(
        `SELECT user_role_designation_department_id  FROM user_roles_designations_department 
         WHERE user_id = ? AND role_designation_department_id = ?`,
        [user_id, rdd_id]
    );

    let urdd_id;
    if (urdd.length > 0) {
        urdd_id = urdd[0].user_role_designation_department_id;
    } else {
        urdd_id = (
            await executeQuery(
                `INSERT INTO user_roles_designations_department (user_id, role_designation_department_id) 
                 VALUES (?, ?)`,
                [user_id, rdd_id]
            )
        ).insertId;
    }

    return urdd_id;
}

async function returnAccessToken(req, decryptedPayload) {
    let deviceId; 
    let device_name = decryptedPayload["device_name"];
    let urdd_id = decryptedPayload["insertEntries"];
    const userQuery = `
        SELECT u.*, a.attachment_link as user_image 
        FROM users u  
        LEFT JOIN attachments a ON u.image_attachment_id = a.attachment_id
        JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
        WHERE urdd.user_role_designation_department_id = ?`;
    logMessage([decryptedPayload.insertId]);
    const userResult = await executeQuery(userQuery, [decryptedPayload.insertEntries]);

    if (userResult.length === 0) {
        throw new Error("User not found with email ");
    }

    const userId = userResult[0].user_id;

     const deviceIdQuery = `
      SELECT * 
      FROM user_devices 
      WHERE user_id = ?
    `;
    
    const deviceResult = await executeQuery(deviceIdQuery, [userId]);
    logMessage([deviceResult]);
    if (deviceResult.length === 0) {
        const insertDeviceQuery = `
            INSERT INTO user_devices (user_id, device_token, device_name, platform_version_id, os_version)
            VALUES (?, ?, ?, ?, ?)
        `;
        
        // const insertDeviceResult = await executeQuery(insertDeviceQuery, [userId, null,  device_name, 1, device_name + " " + os_version]);
        const insertDeviceResult = await executeQuery(insertDeviceQuery, [userId, null,  device_name, 1, device_name]);

        deviceId = insertDeviceResult.insertId;

      
    } 

    const userDeviceDataQuery = `
        SELECT ud.*
        FROM users u 
        INNER JOIN user_devices ud ON u.user_id = ud.user_id
        WHERE u.user_id = ?
    `;
    const user_device = await executeQuery(userDeviceDataQuery, [userId]);


    
    const userDeviceNotificationDataQuery = `
        SELECT n.*
        FROM users u 
        INNER JOIN user_devices ud ON u.user_id = ud.user_id
        INNER JOIN user_device_notifications udn ON ud.user_device_id = udn.user_device_id 
        INNER JOIN notifications n ON udn.notification_id = n.notification_id
        WHERE u.user_id = ?
    `;
    const user_device_notification = await executeQuery(userDeviceNotificationDataQuery, [userId]);


    const userRoleDataQuery = `
        SELECT  r.*
        FROM users u
        INNER JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
        INNER JOIN roles_designations_department rdd ON urdd.role_designation_department_id = rdd.role_designation_department_id
        INNER JOIN roles r ON rdd.role_id = r.role_id
        WHERE u.user_id = ?
    `;
    user_role = await executeQuery(userRoleDataQuery, [userId])

    const userRolesDesignationsDepartmentDataQuery = `
        SELECT  urdd.*
        FROM users u
        INNER JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
        WHERE u.user_id = ?
    `;
    const user_roles_designations_department = await executeQuery(userRolesDesignationsDepartmentDataQuery, [userId])


    const userPermissionDataQuery = `
        SELECT *
        FROM users u
        INNER JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
        INNER JOIN user_role_designation_permissions urdp ON urdd.user_role_designation_department_id = urdp.user_role_designation_department_id
        INNER JOIN permissions p ON urdp.permission_id = p.permission_id
        WHERE u.user_id = ?
    `;
    const user_permission = await executeQuery(userPermissionDataQuery, [userId])

    const collectiveUserPermissionDataQuery = `
        SELECT p.*
        FROM users u
        INNER JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
        INNER JOIN user_role_designation_permissions urdp ON urdd.user_role_designation_department_id = urdp.user_role_designation_department_id
        INNER JOIN permissions p ON urdp.permission_id = p.permission_id
        WHERE u.user_id = ?
    `;
    const collective_user_permission = await executeQuery(collectiveUserPermissionDataQuery, [userId])

    const userDesignationDataQuery= `
        SELECT  d.*
        FROM users u
        INNER JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
        INNER JOIN roles_designations_department rdd ON urdd.role_designation_department_id = rdd.role_designation_department_id
        INNER JOIN designations d ON rdd.designation_id = d.designation_id
        WHERE u.user_id = ?
    `;
    const user_designation = await executeQuery(userDesignationDataQuery, [userId])

    const userDepartmentDataQuery= `
        SELECT  d.*
        FROM users u
        INNER JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
        INNER JOIN roles_designations_department rdd ON urdd.role_designation_department_id = rdd.role_designation_department_id
        INNER JOIN departments d ON rdd.department_id = d.department_id
        WHERE u.user_id = ?
    `;
    const user_department = await executeQuery(userDepartmentDataQuery, [userId])

    const compoundUserDataQuery = `
        SELECT 
            u.user_id,
            u.email,
            urdd.user_role_designation_department_id,
            r.role_name,
            d.designation_name,
            dept.department_name
        FROM users u
        INNER JOIN user_roles_designations_department urdd 
            ON u.user_id = urdd.user_id
        INNER JOIN roles_designations_department rdd 
            ON urdd.role_designation_department_id = rdd.role_designation_department_id
        LEFT JOIN roles r 
            ON rdd.role_id = r.role_id
        LEFT JOIN designations d 
            ON rdd.designation_id = d.designation_id
        LEFT JOIN departments dept 
            ON rdd.department_id = dept.department_id
        WHERE u.user_id = ?;
    `
    const compound_user = await executeQuery(compoundUserDataQuery, [userId])
    const payload = await generatePayload(userId, deviceId, null);
    const token = await generateToken(payload, process.env.SECRET_KEY);

    const groupedPermissions = user_roles_designations_department.reduce((acc, urdd) => {
        const relevantPermissions = user_permission
            .filter((perm) => perm.user_role_designation_department_id === urdd.user_role_designation_department_id)
            .map((perm) => perm.permission_name);
    
        acc[urdd.user_role_designation_department_id] = relevantPermissions;
        return acc;
    }, {});
    

    return returnObject = {
        user_id: userResult[0]?.user_id,
        user: userResult[0],
        device_name: device_name,
        access_token: token,
        user_roles_designations_departments : compound_user,
        user_devices: user_device,
        user_devices_notifications : user_device_notification,
        user_roles: user_role,
        user_permissions :  groupedPermissions,
        collective_user_permissions: collective_user_permission,
        user_departments : user_department,
        user_designations : user_designation,
        urdd_id: urdd_id,
    };
}

global.SignUp_object = {
    "versions": {
        "versionData": [{
            "*": {
                "steps": [
                    {
                        "config": {
                            "features": {
                                "multistep": true,
                                "parameters": true,
                                "pagination": false,
                            },
                            "communication": {
                                "encryption": false
                            },
                            "verification": {
                                "otp": false,
                                "accessToken": false
                            }
                        },
                        "data": {
                            "parameters": {
                                "fields":
                                    [
                                        {
                                            "name": "idToken",
                                            "validations": [],
                                            "required": false,
                                            "source": "req.body"
                                        },
                                        {
                                            "name": "device_name",
                                            "validations": [],
                                            "required": true,
                                            "source": "req.body"
                                        },
                                      
                                    ]
                            },
                            "apiInfo":
                            {
                                preProcessFunction: [signUpVerif, insertEntries],
                                "query": {
                                    "queryNature": "",
                                    "queryPayload": null,
                                    "database": "projectDB"
                                },
                                "utilityFunctions": {
                                    "callbackFunction": null,
                                    "payloadFunction": []
                                },
                                postProcessFunction: returnAccessToken
                            }
                            ,
                            "requestMetaData": {
                                "requestMethod": "POST",
                                "permission": null,
                                "pagination": {
                                    "pageSize": 10
                                }
                            }
                        },
                        "response": {
                            "successMessage": "Signup successfull!",
                            "errorMessage": "There was an error signing up user."
                        }
                    }
                ]
            },
        }]
    }
}
module.exports = { SignUp_object };