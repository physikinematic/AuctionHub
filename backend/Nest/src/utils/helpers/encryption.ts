import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

const encrypt = async (password: string) => {
  const salt = randomBytes(8).toString('hex');
  const hash = (await scrypt(password, salt, 32)) as Buffer;
  const result = `${salt}.${hash.toString('hex')}`;
  return result;
};

const compare = async (plain: string, encrypted: string) => {
  const [salt, storedHash] = encrypted.split('.');
  const hash = (await scrypt(plain, salt, 32)) as Buffer;
  return storedHash === hash.toString('hex');
};

export { encrypt, compare };