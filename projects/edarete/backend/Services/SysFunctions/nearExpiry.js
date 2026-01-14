const moment = require('moment');

function formatTime(timeInSeconds) {
    const duration = moment.duration(timeInSeconds, 'seconds');
    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.asMinutes()) % 60;
    const seconds = duration.seconds();
    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

async function  nearExpiry( decoded) {
  if (decoded) {
    const expirationTimestamp = decoded.exp;
    const currentTimestamp = moment().unix();
    const tenHoursInSeconds = 36000;

    const timeRemaining = expirationTimestamp - currentTimestamp;
    if (timeRemaining <= tenHoursInSeconds) {
      decoded.exp = currentTimestamp + tenHoursInSeconds;
      return decoded;
    }
    return decoded;
  }
  return null;
}
module.exports = nearExpiry;
