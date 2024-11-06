const userServices = require('../services/userServices');

const getAll = async (req, res) => {
  try {
    const all = await userServices.getAll(req.query);
    res.status(200).json(all);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
}

const signIn = async (req, res) => {
  try {
    const user = await userServices.getOne(req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
}

const signUp = async (req, res) => {
  try {
    const user = await userServices.addOne(req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
}

const deleteOne = async (req, res) => {
  try {
    await userServices.deleteOne(req.params);
    res.status(200).json({ message: 'User deleted successfully!' });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
}

module.exports = { getAll, signIn, signUp, deleteOne };