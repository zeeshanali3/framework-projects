const moment = require('moment');

const generatePayload = (userId, deviceId, OTP = null, providedPermissions = null) => {
const expiration = moment().add(360,'minutes').unix();
  return {
    userId: userId,
    deviceId : deviceId,
    OTP: OTP,
    exp: expiration,
    providedPermissions: providedPermissions
  };
};
module.exports = generatePayload;
