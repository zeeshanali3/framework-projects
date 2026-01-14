const getUserPermissionDetails = require("./getUserPermissionDetails"); // Import the correct module for retrieving permission details
const handleGetRolesByUserIdRequest = require("./getRoleByUserId");
const GetUsersData = require('./getUserData');
const GetUserRoleData = require('./getUserRoleData');
const getStudentData = require('./getStudentData');
const getStudentSemesterId = require('./getStudentSemesterId')
const getTeacherData = require('./getTeacherData');
const getTAData = require('./getTAData');
const getRolLNumber = require("./getRollNumber")
const getStudentUserId = require('./getStudentUserId')
const getEmployeeData = require("./getEmployeeData");
const handleGeStudentDashboardRequestRequest = require("./getStudentDashboard");
const getCourseSubDomain=require("./getCourseSubDomain")

async function LoginResponseData(req, decryptedPayload) {
    const userPermissionDetails = await getUserPermissionDetails(req, decryptedPayload);
    const RoleId = await handleGetRolesByUserIdRequest(req, decryptedPayload);
    const selectedRoleId = RoleId?.find(role => role?.RoleName === (decryptedPayload.role));
    const userData = await GetUsersData(req, decryptedPayload);
    const userRoleData = await GetUserRoleData(req, decryptedPayload);
    const selectedurdd_id = userRoleData.find(role => role?.RoleId === selectedRoleId?.RoleId);
    const extractedurdd_id = selectedurdd_id?.urdd_id ? selectedurdd_id?.urdd_id : selectedurdd_id?.urdd_id;
    const studentData = await getStudentData(req, decryptedPayload);
    const teacherData = await getTeacherData(req, decryptedPayload);
    const rollNumber = await getRolLNumber(req, decryptedPayload);
    const studentUserId = await getStudentUserId(req, decryptedPayload);
    const studentSemesterId = await getStudentSemesterId(req, decryptedPayload);
    const taData = await getTAData(req, decryptedPayload);
    const EmployeeData = await getEmployeeData(req, decryptedPayload);
    const EarliestDeadline = await handleGeStudentDashboardRequestRequest(req, decryptedPayload);
    const Navigation = await getCourseSubDomain(req, decryptedPayload);

  return regularResponse = {
    permissionTypes: userPermissionDetails.permissionTypes,
    roleData: RoleId,
    userData: userData,
    userRoleDesignationDepartmentData: userRoleData,
    studentData: studentData,
    rollNumber: rollNumber,
    studentUserId: studentUserId,
    teacherData: teacherData,
    taData: taData,
    EmployeeData: EmployeeData,
    studentSemesterId: studentSemesterId,
    selectedUserRoleDesignationDepartmentId: extractedurdd_id,
    earliestDeadline: EarliestDeadline,
    Navigation: Navigation
  };
}
module.exports = LoginResponseData;

