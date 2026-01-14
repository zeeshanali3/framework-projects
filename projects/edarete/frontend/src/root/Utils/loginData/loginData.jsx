export const getUserData = (loginData) => {
  return loginData?.otpVerif?.userData?.[0] || null;
};

export const getRoleData = (loginData) => {
  const roleData = loginData?.otpVerif?.roleData?.[0] || null;
  return roleData
    ? {
        RoleId: roleData?.RoleId,
        RoleName: roleData?.RoleName,
        UserroleId: roleData?.UserroleId,
      }
    : null;
};

export const getStudentData = (loginData) => {
  return loginData?.otpVerif?.studentData || [];
};

export const gettaData = (loginData) => {
  return loginData?.otpVerif?.taData || null;
};

export const getAccessToken = (loginData) => {
  return loginData?.otpVerif?.access_token || null;
};

export const getTeacherData=(loginData)=>{
  return loginData?.otpVerif?.teacherData || null;
}

export const getStudentUserId = (loginData) => {
  const studentData = loginData?.otpVerif?.studentUserId?.[0];
  return studentData
    ? {
      studentUserId: studentData?.StudentUserId,
      }
    : null;
};