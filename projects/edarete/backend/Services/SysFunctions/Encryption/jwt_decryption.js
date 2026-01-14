const jwt = require('jsonwebtoken');

const decryptObjectWithJWT = (token, key) => {
  try {
    const decodedObject = jwt.verify(token, key);
    return decodedObject;
  } catch (error) {
    throw new Error('Decryption failed: ' + error.message);
  }
};

module.exports = {decryptObjectWithJWT};
