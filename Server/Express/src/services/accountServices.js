const Account = require("../models/Account");
const validate = require("../utils/helpers/textValidator");
const { encrypt, decrypt } = require("../utils/helpers/encryption");
const response = require("../utils/helpers/responseFormat");
const RequestError = require("../utils/errors/RequestError");

const limitData = (data) => {
  return {
    _id: data["_id"],
    firstName: data["firstName"],
    lastName: data["lastName"],
    email: data["email"],
  };
};

const getAll = async (query) => {
  const { page = 1, limit = 20 } = query;

  const _page = parseInt(page);
  const _limit = parseInt(limit);

  const total = await Account.countDocuments();

  const accounts = await Account.find()
    .skip((_page - 1) * _limit)
    .limit(_limit);

  return response(
    "Batch Accounts Retrieved Successfully",
    accounts?.map((data) => limitData(data)),
    {
      pagination: {
        total: total,
        page: page,
        limit: limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  );
};

const getOne = async (body) => {
  const { email, password } = body;

  if (!(validate("email", email) && validate("password", password))) {
    throw new RequestError(400, "Invalid Account Data");
  }

  const account = await Account.findOne({ email: email });
  if (!account) {
    throw new RequestError(404, `Account with Email: ${email} Not Found`);
  }

  const isMatch = decrypt(account["password"]) === password;
  if (!isMatch) {
    throw new RequestError(400, "No Password Match");
  }

  return response("Account Retrieved Successfully", limitData(account));
};

const addOne = async (body) => {
  const {
    firstName = body["firstName"],
    lastName = body["lastName"],
    email,
    password,
  } = body;

  if (
    !(
      validate("text", firstName) &&
      validate("text", lastName) &&
      validate("email", email) &&
      validate("password", password)
    )
  ) {
    throw new RequestError(400, "Invalid Account Data");
  }

  const encryptedPassword = encrypt(password);
  const newAccount = await new Account({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: encryptedPassword,
    role: "user",
  }).save();

  return response("Account Added Successfully", limitData(newAccount));
};

const deleteOne = async (params) => {
  const { id } = params;

  const account = await Account.findOneAndDelete({ _id: id });
  if (!account) {
    throw new RequestError(404, `Account with id: ${id} Not Found`);
  }

  return response("Account Deleted Successfully", limitData(account));
};

module.exports = { getAll, getOne, addOne, deleteOne };
