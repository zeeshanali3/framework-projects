const moment = require('moment');

function getDateTime() {
  const currentDateTime = moment().utcOffset('+05:00');
  const currentDateString = currentDateTime.format('YYYY-MM-DD');
  const currentTimeString = currentDateTime.format('HH:mm:ss');
  const CurrentDateTime = currentDateTime.format('YYYY-MM-DD HH:mm:ss');
  return [currentDateString, currentTimeString, CurrentDateTime];
}

module.exports = getDateTime;
