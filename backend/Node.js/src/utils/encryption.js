const CryptoJS = require('crypto-js');

const encrypt = (text) => {
  const key = CryptoJS.enc.Utf8.parse(process.env.PASSPHRASE);
  const iv = CryptoJS.lib.WordArray.random(16);
  
  const encrypted = CryptoJS.AES.encrypt(text, key, { iv: iv });

  const combined = iv.concat(encrypted.ciphertext);

  return combined.toString(CryptoJS.enc.Base64);
};

module.exports = encrypt;
