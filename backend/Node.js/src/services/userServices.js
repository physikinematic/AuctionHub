const User = require('../models/User');
const validate = require('../utils/helpers/textValidator');
const { encrypt, decrypt } = require('../utils/helpers/encryption');
const response = require('../utils/helpers/responseFormat');
const RequestError = require('../utils/errors/RequestError');

const limitData = (data) => {
  return {
    '_id': data['_id'],
    'first name': data['first name'],
    'last name': data['last name'],
    'email': data['email'],
  };
};

const getAll = async (query) => {
  const { page = 1, limit = 20 } = query;

  const _page = parseInt(page);
  const _limit = parseInt(limit);

  const total = await User.countDocuments();

  const users = await User.find().skip((_page - 1) * _limit).limit(_limit);

  return response(
    'Batch Users Retrieved Successfully',
    users?.map(data => limitData(data)),
    {
      pagination: {
        total: total,
        page: page,
        limit: limit,
        totalPages: Math.ceil(total / limit),
      }
    }
  );
};

const getOne = async (body) => {
  const { email, password } = body;

  if (!(validate('email', email) && validate('password', password))) {
    throw new RequestError(400, 'Invalid User Data');
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    throw new RequestError(404, `User with Email: ${email} Not Found`);
  }

  const isMatch = decrypt(user['password']) === password;
  if (!isMatch) {
    throw new RequestError(400, 'No Password Match');
  }

  return response('User Retrieved Successfully', limitData(user));
}

const addOne = async (body) => {
  const { firstName = body['first name'], lastName = body['last name'], email, password } = body;
  
  if (
    !(validate('text', firstName) &&
      validate('text', lastName) &&
      validate('email', email) &&
      validate('password', password))
  ) {
    throw new RequestError(400, 'Invalid User Data');
  }

  const encryptedPassword = encrypt(password);
  const newUser = await new User({
    'first name': firstName,
    'last name': lastName,
    'email': email,
    'password': encryptedPassword,
    'role': 'user',
  }).save();

  return response('User Added Successfully', limitData(newUser));
};

const deleteOne = async (params) => {
  const { id } = params;
  
  const user = await User.findOneAndDelete({ _id: id });
  if (!user) {
    throw new RequestError(404, `User with id: ${id} Not Found`);
  }

  return response('User Deleted Successfully', limitData(user));
};

module.exports = { getAll, getOne, addOne, deleteOne };