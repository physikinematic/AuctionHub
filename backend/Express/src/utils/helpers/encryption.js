const CryptoJS = require('crypto-js');

const encrypt = (normalText) => {
  return CryptoJS.AES.encrypt(normalText, process.env.PASSPHRASE).toString();
};

const decrypt = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, process.env.PASSPHRASE);
  return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = { encrypt, decrypt };
