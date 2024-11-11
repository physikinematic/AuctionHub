import CryptoJS from 'crypto-js';

const encrypt = (normalText: string) => {
  return CryptoJS.AES.encrypt(normalText, process.env.PASSPHRASE).toString();
};

const decrypt = (cipherText: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, process.env.PASSPHRASE);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export { encrypt, decrypt };
