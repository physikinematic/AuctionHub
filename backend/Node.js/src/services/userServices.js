const User = require('../models/User');
const validate = require('../utils/helpers/textValidator');
const { encrypt, decrypt } = require('../utils/helpers/encryption');
const response = require('../utils/helpers/responseFormat');

const limitData = (data) => {
  return {
    'id': data['_id'],
    'first name': data['first name'],
    'last name': data['last name'],
    'email': data['email'],
  };
};

const getAll = async (query) => {
  const { page = 1, limit = 10 } = query;
  page = parseInt(page);
  limit = parseInt(limit);
  const users = await User.find().skip((page - 1) * limit).limit(limit);
  return response('Batch users retrieved successfully', users.map(data => limitData(data)));
};

const getUser = async (body) => {
  const { email, password } = body;
  if (
    validate('email', email)
    && validate('password', password)
  ) {
    const user = await User.findOne({ email: email });
    if (user) {
      const isMatch = decrypt(user['password']) === password;
      if (isMatch) {
        return response('User retrieved successfully', limitData(user))

      }
      else {
        throw new Error('No password match');
      }
    }
    else {
      throw new Error(`User with email: {${email}} not found`);
    }
  }
  else {
    throw new Error('Invalid User Data');
  }
}

const addUser = async (body) => {
  const { firstName = body['first name'], lastName = body['last name'], email, password } = body;
  if (
    validate('text', firstName) &&
    validate('text', lastName) &&
    validate('email', email) &&
    validate('password', password)
  ) {
    const encryptedPassword = encrypt(password);
    const newUser = new User({
      'first name': firstName,
      'last name': lastName,
      'email': email,
      'password': encryptedPassword,
      'role': 'user',
    });
    return response('User added successfully', limitData(await newUser.save()));
  }
  else {
    throw new Error('Invalid User Data');
  }
};

const deleteUser = async (params) => {
  const { id } = params;
  const user = await User.findByIdAndDelete(id);
  if (user) {
    return response('User added successfully', limitData(user));
  }
  else {
    throw new Error(`User with id: {${id}} not found`);
  }
};

module.exports = { getAll, getUser, addUser, deleteUser };