const logMessage = require("./LogFunctions/consoleLog.js");
const LogError = require("../Integrations/Database/Errorlog");
const verifyToken = require("../SysFunctions/auth");
const generatePayload = require("../SysFunctions/generatePayload");
const OTPGeneration = require("../SysFunctions/OTPGeneration");
const generateToken = require('../SysFunctions/jwtUtils');
// Removed direct projectDB usage to avoid manual connection management
const { executeQuery } = require("../Integrations/Database/queryExecution");


const getUserPermissionDetails = require("../../Src/HelperFunctions/PayloadFunctions/LoginStep2/getUserPermissionDetails"); 
const handleGetRolesByUserIdRequest = require("../../Src/HelperFunctions/PayloadFunctions/LoginStep2/getRoleByUserId");
const GetUsersData = require('../../Src/HelperFunctions/PayloadFunctions/LoginStep2/getUserData');
const GetUserRoleData = require('../../Src/HelperFunctions/PayloadFunctions/LoginStep2/getUserRoleData');
const getStudentData = require('../../Src/HelperFunctions/PayloadFunctions/LoginStep2/getStudentData');
const getStudentSemesterId = require('../../Src/HelperFunctions/PayloadFunctions/LoginStep2/getStudentSemesterId')
const getTeacherData = require('../../Src/HelperFunctions/PayloadFunctions/LoginStep2/getTeacherData');
const getTAData = require('../../Src/HelperFunctions/PayloadFunctions/LoginStep2/getTAData');
const getRolLNumber = require("../../Src/HelperFunctions/PayloadFunctions/LoginStep2/getRollNumber")
const getStudentUserId = require('../../Src/HelperFunctions/PayloadFunctions/LoginStep2/getStudentUserId')
const getEmployeeData = require("../../Src/HelperFunctions/PayloadFunctions/LoginStep2/getEmployeeData");
const handleGeStudentDashboardRequestRequest = require("../../Src/HelperFunctions/PayloadFunctions/LoginStep2/getStudentDashboard");
const getCourseSubDomain=require("../../Src/HelperFunctions/PayloadFunctions/LoginStep2/getCourseSubDomain")

async function isValidAccessToken( req, accessToken, decryptedPayload) {
    const query = `
    SELECT 
      u.user_id, 
      u.email,
      do.otp,
      ud.user_device_id, 
      ud.device_token, 
      ud.device_name
    FROM 
      users u
    INNER JOIN 
      user_devices ud 
      ON u.user_id = ud.user_id
    INNER JOIN 
      device_otp do
      ON ud.user_device_id = do.user_device_id
    WHERE 
      ud.device_token = ? 
      AND u.email = ? 
      AND ud.device_name = ?
    `;
    try {
        const result = await executeQuery(query, [accessToken, decryptedPayload.email, decryptedPayload.device_name]);
        logMessage(["decryptedPayload.email, decryptedPayload.device_name : ",
          decryptedPayload.email,
          decryptedPayload.device_name,
          result]);
        if (result.length > 0) {
            logMessage(["RESULT : ", result]);
            return verifyOTP(req, result[0].otp, decryptedPayload, 0);
        }
        await OTPGeneration(decryptedPayload)
        return "OTP Sent Successfully"
    } catch (error) {
        throw new Error(`Error validating access token: ${error.message}`);
    }
}

async function verifyOTP(req, OTP, decryptedPayload, updatedFlag = 1) {
    try{
        
    const { email, device_name } = decryptedPayload;

    // Fetch user details
    const userQuery = `
        SELECT u.*, a.attachment_link as user_image 
        FROM users u  
        LEFT JOIN attachments a ON u.image_attachment_id = a.attachment_id
        WHERE u.email = ?`;
    const userResult = await executeQuery(userQuery, [email]);

    if (userResult.length === 0) {
        throw new Error("User not found with email " + email);
    }

    const userId = userResult[0].user_id;

    // Validate OTP in the device_otp table
    const otpQuery = `
        SELECT * 
        FROM device_otp do
        INNER JOIN user_devices ud ON do.user_device_id = ud.user_device_id
        WHERE ud.user_id = ? AND do.otp = ? AND ud.device_name = ?
    `;
    const otpResult = await executeQuery(otpQuery, [userId, OTP, device_name]);
    if (otpResult.length === 0) {
        throw new Error("Invalid OTP");
    }

    // const deviceId =  1; 

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

    let urdd_id = user_roles_designations_department.length > 0 ? user_roles_designations_department[0].user_role_designation_department_id : null;

    if (!urdd_id) {
        throw new Error("No role assigned to the user. Please contact administrator.");
    }
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
    // Generate token
    const payload = await generatePayload(userId, user_device[0].user_device_id , OTP);
    const token = await generateToken(payload, process.env.SECRET_KEY);

    // Store the generated token in device_token
    if (updatedFlag) {
        const updateTokenQuery = `
        UPDATE user_devices 
        SET device_token = ? 
        WHERE user_id = ? AND user_device_id = ?
        `;
        await executeQuery(updateTokenQuery, [token, userId, user_device[0].user_device_id]);
    }
    const groupedPermissions = user_roles_designations_department.reduce((acc, urdd) => {
        const relevantPermissions = user_permission
            .filter((perm) => perm.user_role_designation_department_id === urdd.user_role_designation_department_id)
            .map((perm) => perm.permission_name);
    
        acc[urdd.user_role_designation_department_id] = relevantPermissions;
        return acc;
    }, {});
    

    decryptedPayload.user_id = userId;
    decryptedPayload.user_role_designation_department_id = urdd_id;
    
    const userPermissionDetails = await getUserPermissionDetails(req, decryptedPayload);
    const RoleId = await handleGetRolesByUserIdRequest(req, decryptedPayload);
    const selectedRoleId = RoleId?.find(role => role?.RoleName === (decryptedPayload.role));
    const userData = await GetUsersData(req, decryptedPayload);
    const userRoleData = await GetUserRoleData(req, decryptedPayload);
    const selectedUserRoleId = userRoleData.find(role => role?.RoleId === selectedRoleId?.RoleId);
    const extractedUserRoleId = selectedUserRoleId?.role_id ? selectedUserRoleId?.role_id  : selectedUserRoleId?.role_id ;
    const studentData = await getStudentData(req, decryptedPayload);
    const teacherData = await getTeacherData(req, decryptedPayload);
    const rollNumber = await getRolLNumber(req, decryptedPayload);
    const studentUserId = await getStudentUserId(req, decryptedPayload);
    const studentSemesterId = await getStudentSemesterId(req, decryptedPayload);
    const taData = await getTAData(req, decryptedPayload);
    const EmployeeData = await getEmployeeData(req, decryptedPayload);
    const EarliestDeadline = await handleGeStudentDashboardRequestRequest(req, decryptedPayload);
    const Navigation = await getCourseSubDomain(req, decryptedPayload);
    
    const returnObject = {
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
        permissionTypes: userPermissionDetails.permissionTypes,
        roleData: RoleId,
        userData: userData,
        userRoleData: userRoleData,
        studentData: studentData,
        rollNumber: rollNumber,
        studentUserId: studentUserId,
        teacherData: teacherData,
        taData: taData,
        EmployeeData: EmployeeData,
        studentSemesterId: studentSemesterId,
        extractedUserRoleId: extractedUserRoleId,
        earliestDeadline: EarliestDeadline,
        Navigation: Navigation
    };

    return returnObject;
    
    }
    catch{
        throw new Error("Invalid OTP");
    }
}

async function otpVerif(req,  decryptedPayload) {
    try {
        const { step } = req.query;
        if (step == "2") {
            const { otp } = decryptedPayload;
            return await verifyOTP( req, otp, decryptedPayload);
        } else {
            const accessToken = req.headers['accesstoken'];
            logMessage(["ACCESS TOKEN : ", accessToken]);
            if (accessToken && accessToken !== 'null') {
                return await isValidAccessToken( req, accessToken, decryptedPayload);
            }
            await OTPGeneration( decryptedPayload);
            return "OTP Sent Successfully";

        }
    } catch (error) {
        throw new Error(error.message)

    }
}

module.exports = otpVerif;
