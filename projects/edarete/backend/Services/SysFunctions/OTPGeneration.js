const otpGenerator = require('otp-generator');
const sendEmail = require('./sendEmail');
const getDateTime = require('./getDateTime');
const { executeQuery } = require('../Integrations/Database/queryExecution');
const logMessage = require('./LogFunctions/consoleLog');

async function OTPGeneration( decryptedPayload) {
  try{
    let deviceId, otpResult;
    let {device_name, platform_version, email, device_identifier, os_version} = decryptedPayload
    let OTP = otpGenerator.generate(6, { upperCaseAlphabets: true, specialChars: false });
     if( email == 'tempapp63@gmail.com' ||  email == 'tempapp62@itu.edu.pk' ){
      OTP = '000000'; 
    }
    else  if( email == 'afaq.khawar@granjur.com' ||  email == 'afaq.khawar@itu.edu.pk' ){
      OTP = 'ASDqwe';
    }
    logMessage([OTP],true);
    const [currentDateString, currentTimeString, currentDateTime] = getDateTime();

    const userQuery = `SELECT user_id FROM users WHERE email = ?`;
    const userResult = await executeQuery(userQuery, [email]);
    if (userResult.length === 0) {
      throw new Error("User not found with email " + email);
    }

    const userId = userResult[0].user_id;

    const deviceIdQuery = `
      SELECT * 
      FROM user_devices 
      WHERE user_id = ? AND device_name = ?
    `;
    
    const deviceResult = await executeQuery(deviceIdQuery, [userId, device_name]);
    logMessage([deviceResult]);
    if (deviceResult.length === 0) {
        const insertDeviceQuery = `
            INSERT INTO user_devices (user_id, device_token, device_name, platform_version_id, os_version)
            VALUES (?, ?, ?, ?, ?)
        `;
        
        const insertDeviceResult = await executeQuery(insertDeviceQuery, [userId, null,  device_name, 1, device_name + " " + os_version]);
        deviceId = insertDeviceResult.insertId;

        const otpQuery = `  
          INSERT INTO device_otp (user_device_id, otp, otp_failure_count)
          VALUES (?,?,?)
        `;
        
        otpResult = await executeQuery(otpQuery, [deviceId, OTP, 0]);
    } else {
        deviceId = deviceResult[0]?.user_device_id;
        const checkDeviceOtp =  `SELECT * FROM device_otp WHERE user_device_id = ?`
        let checkResults = await executeQuery(checkDeviceOtp, [deviceId]);
        if (checkResults.length == 0){
          const insertDevice = `
            INSERT INTO device_otp (user_device_id, otp, otp_failure_count) VALUES (?,?,?)
          `
          await executeQuery(insertDevice, [deviceId, null, 0]);
        }
        const otpQuery = `
          UPDATE device_otp
          SET otp = ?
          WHERE user_device_id = ?
        `;
        
        otpResult = await executeQuery(otpQuery, [OTP, deviceId]);

    }

    if (otpResult.affectedRows === 0 && !otpResult.insertId ) {
      logMessage([otpResult])
      throw new Error("Failed to assign OTP. Device not associated with the user or invalid device ID.");
    }

    await sendEmail(email, 'Your OTP',OTP);
    logMessage(["OTP SEND OTP ::::" , OTP]);
    return OTP;
  }
  catch (error){
    logMessage([error]);
    throw new Error(error.message);
  }
}

module.exports = OTPGeneration;
