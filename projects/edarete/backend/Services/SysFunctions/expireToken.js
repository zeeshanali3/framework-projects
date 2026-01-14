const moment = require('moment');

function ifExpire(decoded) {
    const currentTimestamp = moment().unix();
    const expirationTimestamp = decoded.exp;

    if (expirationTimestamp <= currentTimestamp) {
        return true
    }
  return false;
}
module.exports = ifExpire;
