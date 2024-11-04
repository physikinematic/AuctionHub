const User = require('../models/User');
const validate = require('../utils/helpers/textValidator');
const { encrypt, decrypt } = require('../utils/helpers/encryption');
const responseFormat = require('../utils/helpers/responseFormat');

const limitData = (data) => {
  return {
    'id': data['_id'],
    'first name': data['first name'],
    'last name': data['last name'],
    'email': data['email'],
  };
};

const getAll = async (query) => {
  try {
    const { page = 1, limit = 10 } = query;
    page = parseInt(page);
    limit = parseInt(limit);
    const users = await User.find().skip((page - 1) * limit).limit(limit);
    return responseFormat(true, 'Batch users retrieved successfully', users.map(data => limitData(data)));
  }
  catch (error) {
    return responseFormat(false, 'Error getting batch users', error);
  }
};

const getUser = async (body) => {
  try {
    const { email, password } = body;
    if (
      validate('email', email)
      && validate('password', password)
    ) {
      const user = await User.findOne({ email: email });
      if (!user) return { success: false, type: 'UserNotFound' };
      const isMatch = decrypt(user['password']) === password;
      return isMatch && responseFormat(true, 'User retrieved successfully', limitData(user)) || responseFormat(false, 'No password match');
    }
    else {
      return responseFormat(false, 'Invalid User Data');
    }
  }
  catch (error) {
    return responseFormat(false, 'Error getting user', error);
  };
}

const addUser = async (body) => {
  try {
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
      return responseFormat(true, 'User added successfully', limitData(await newUser.save()));
    }
    else {
      return responseFormat(false, 'Invalid User Data');
    }
  } catch (error) {
    return responseFormat(false, 'Error adding user', error);
  }
};

const deleteUser = async (params) => {
  try {
    const { id } = params;
    return responseFormat(true, 'User added successfully', limitData(await User.findByIdAndDelete(id)));
  }
  catch (error) {
    return responseFormat(false, 'Error deleting user', error);
  }
};

module.exports = { getAll, getUser, addUser, deleteUser };