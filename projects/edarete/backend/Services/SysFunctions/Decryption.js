const crypto = require('crypto');
const secretKey = "7683ea2fa40fe6a7fc2ff70ef7ebeb7aac25b818cffe8857ca1b8f05af0434c2";

async function decryptData(data) {
    if (!data || isNumber(data)||typeof data.split !== 'function' ) {
        return data;
    }
    const [iv, encryptedData] = data.split(':');
    
    if (!iv || !encryptedData || iv.length >32||iv.length<32) {
        return data;
    }
    try {
        const decipher = crypto.createDecipheriv(
            'aes-256-cbc',
            Buffer.from(secretKey, 'hex'),
            Buffer.from(iv, 'hex')
        );
        let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
        decryptedData += decipher.final('utf-8');
        return decryptedData;
    } catch (error) {
        // console.error("Decryption failed:", error);
        return data;
    }
}


function shouldExclude(key) {
    const exclusions = ["PrivateChat","GroupName","MessageTime","EarliestUpcomingDeadline:","SubComponentData","Email","email","marks","Marks",'id', 'Id', 'ID', 'password', 'Password', 'createdAt', 'updatedAt',"ComponentType","Birthday","componenttype","ComponentName","componentname",  'OTP', 'otp', 'Date', 'status', 'Status',"Time","File","url",'Num',"studentSubmissionData","NotifyUsers"];
    
    return exclusions.some(exclusion => key.includes(exclusion) && key !== 'USER_NAME');
}
async function decryptObject(obj, excludeFields = []) {
    const decryptedObj = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if(!value) {
                  decryptedObj[key] = value;
            }
            
            if ((excludeFields.includes(key) || shouldExclude(key))&&(key!=="ProgramName" ||key!=="ProgramYear"||key!=="DepartmentName"||key!=="CreditHours"||key!=="StudentName"||key!=="ProgramInfo")) {
                    
                decryptedObj[key] = value; 
            }
            else if (typeof value === 'object' && value !== null && key !=="EarliestUpcomingDeadline") {
                if (key === 'idObject') {
                    decryptedObj[key] = value; 
                } else {
                    decryptedObj[key] = await decryptObject(value, excludeFields);

                }
            } else if(Array.isArray(value)) {
               
                decryptedObj[key] = await decryptArray(value);
            }
            else {
                decryptedObj[key] = await decryptData(value);
            }
        }
    }
    return decryptedObj;
}
async function decryptArray(arr, excludeFields = []) {
    if(arr && arr?.length !== 0) {
    return Promise.all(arr?.map(async (item) => {
        return await decryptObject(item, excludeFields);
    }))}
    else {
        return arr;
    }
}

function isNumber(value) {
    return typeof value === 'string' && !isNaN(parseFloat(value)) && isFinite(value);
}

module.exports =  {decryptData,decryptObject,decryptArray} ;
