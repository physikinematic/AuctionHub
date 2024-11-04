const UserModel = require('../models/User');
const validate = require('../utils/textValidator');
const encrypt = require('../utils/encryption');

const getAll = async () => {
  return await UserModel.find();;
};

const getUser = async (data) => {
  try {
    if (
      validate('email', data['email'])
      && validate('password', data['password'])
    ) {
      const userFound = UserModel.findOne({ email: data.email });
      if (!userFound) return { success: false, message: 'Error signing in', error };
      const encryptedPassword = encrypt(data['password']);
      // TODO
      return userFound;
    }
  }
  catch (error) {
    return { success: false, message: 'Error signing in', error };
  };
}

const addUser = async (data) => {
  try {
    if (
      validate('text', data['first name']) &&
      validate('text', data['last name']) &&
      validate('email', data['email']) &&
      validate('password', data['password'])
    ) {
      const encryptedPassword = encrypt(data['password']);
      const newUser = new UserModel({
        ...data,
        password: encryptedPassword,
        role: 'user',
      });
      await newUser.save();
      return { success: true, message: 'User added successfully!' };
    }
  } catch (error) {
    return { success: false, message: 'Error adding user', error };
  }
};


const deleteUser = async (id) => {
  await UserModel.findByIdAndDelete(id);
};

module.exports = { getAll, getUser, addUser, deleteUser };