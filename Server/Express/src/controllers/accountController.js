const accountServices = require("../services/accountServices");

const getAll = async (req, res) => {
  try {
    const all = await accountServices.getAll(req.query);
    res.status(200).json(all);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

const signIn = async (req, res) => {
  try {
    const account = await accountServices.getOne(req.body);
    res.status(200).json(account);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

const signUp = async (req, res) => {
  try {
    const account = await accountServices.addOne(req.body);
    res.status(200).json(account);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

const deleteOne = async (req, res) => {
  try {
    await accountServices.deleteOne(req.params);
    res.status(200).json({ message: "Account deleted successfully!" });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

module.exports = { getAll, signIn, signUp, deleteOne };
