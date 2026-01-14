const { executeQuery } = require("../../../../Services/Integrations/Database/queryExecution");

async function handleGetUsersData(req, decryptedPayload){
    const query = `
    SELECT
        u.user_id as UserId,
        u.email as Email,
        u.first_name as FName,
        u.last_name as LName,
        u.phone_no as Mobile,
        u.address as Address,
        u.gender as Gender,
        u.cnic as Cnic,
        u.father_name as FatherName,
        u.image_attachment_id as ProfileImage,
        u.date_of_birth Birthday,
        u.blood_group as BloodGroup
    from
        users u
    WHERE
        u.status='active' AND user_id=?`;
    const results = await executeQuery(query,[decryptedPayload.user_id]);
    let data= results.map(item => ({
        ...item,
        USER_NAME: `${item.FName} ${item.LName}`
    }));
    return data
};

module.exports = handleGetUsersData;
