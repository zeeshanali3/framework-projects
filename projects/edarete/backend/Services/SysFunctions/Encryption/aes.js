const CryptoJS = require('crypto-js');

// Function to adjust key length to ensure it's 32 bytes
const adjustKeyLength = (key, targetLength = 32) => {
    if (key.length > targetLength) {
        // Truncate the key if it's too long
        return key.slice(0, targetLength);
    } else if (key.length < targetLength) {
        // Pad the key with zeros if it's too short
        return key.padEnd(targetLength, '0');
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
    const decrypted = CryptoJS.AES.decrypt(encryptedObject, encryptionKey, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    });
    const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
    const decryptedObject = JSON.parse(decryptedString);
    return decryptedObject;
};

module.exports = { encryptObject, decryptObject };
