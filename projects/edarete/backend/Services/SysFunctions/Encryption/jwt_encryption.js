const jwt = require('jsonwebtoken');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const encryptObjectWithJWT = (object, key) => {
  try {
    const token = jwt.sign(object, key);
    return token;
  } catch (error) {
    throw new Error('Encryption failed: ' + error.message);
  }
};

module.exports = encryptObjectWithJWT