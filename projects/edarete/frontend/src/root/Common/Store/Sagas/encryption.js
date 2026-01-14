import CryptoJS from "crypto-js";

// Function to adjust key length to ensure it's 32 bytes
const adjustKeyLength = (key, targetLength = 32) => {
  if (key.length > targetLength) {
    // Truncate the key if it's too long
    return key.slice(0, targetLength);
  } else if (key.length < targetLength) {
    // Pad the key with zeros if it's too short
    return key.padEnd(targetLength, "0");
  }
  return key; // Return the key if it's already the correct length
};

// Function to encrypt an object
const encryptObject = (object, key) => {
  const adjustedKey = adjustKeyLength(key); // Adjust key length to 32 bytes
  const encryptionKey = CryptoJS.enc.Utf8.parse(adjustedKey); // 32-byte key for AES-256

  // Convert the object to a string before encryption
  const stringifiedObject = JSON.stringify(object);

  // Encrypt the stringified object
  const encrypted = CryptoJS.AES.encrypt(stringifiedObject, encryptionKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();

  return encrypted;
};

// Function to decrypt an encrypted object
const decryptObject = (encryptedObject, key) => {
  const adjustedKey = adjustKeyLength(key); // Adjust key length to 32 bytes
  const encryptionKey = CryptoJS.enc.Utf8.parse(adjustedKey); // 32-byte key for AES-256

  // Decrypt the encrypted object (which is a string)
  const decrypted = CryptoJS.AES.decrypt(encryptedObject, encryptionKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  // Convert the decrypted string back to an object
  const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
  const decryptedObject = JSON.parse(decryptedString);

  return decryptedObject;
};

export { encryptObject, decryptObject };

// import CryptoJS from 'crypto-js';

// // Encryption function
// const encryptWord = (word, OTP) => {
//   const encryptionKey = CryptoJS.enc.Utf8.parse("my-secret-key-my-secret-key-my-s" + OTP); // 32-byte key for AES-256
//   const encrypted = CryptoJS.AES.encrypt(word, encryptionKey, {
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.Pkcs7,
//   }).toString();
//   return encrypted;
// };

// // Decryption function
// const decryptWord = (encryptedWord, OTP) => {
//   const encryptionKey = CryptoJS.enc.Utf8.parse("my-secret-key-my-secret-key-my-s" + OTP); // 32-byte key for AES-256
//   const decrypted = CryptoJS.AES.decrypt(encryptedWord, encryptionKey, {
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.Pkcs7,
//   });
//   return decrypted.toString(CryptoJS.enc.Utf8);
// };

// // Encrypting an entire object
// const encryptObject = (object, OTP) => {
//   return Object.keys(object).reduce((encryptedObject, key) => {
//     encryptedObject[key] = encryptWord(object[key], OTP); // Encrypt all properties
//     return encryptedObject;
//   }, {});
// };

// // Decrypting an entire object
// const decryptObject = (object, OTP) => {
//   return Object.keys(object).reduce((decryptedObject, key) => {
//     decryptedObject[key] = decryptWord(object[key], OTP); // Decrypt all properties
//     return decryptedObject;
//   }, {});
// };

// export { encryptObject, decryptObject };
