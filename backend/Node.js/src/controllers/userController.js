const userServices = require('../services/userServices');

const getAllUsers = async (req, res) => {
  try {
    const all = await userServices.getAll();
    res.status(200).json(all);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const signInUser = async (req, res) => {
  try {
    const user = await userServices.getUser(req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const signUpUser = async (req, res) => {
  try {
    const user = await userServices.addUser(req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const deleteUser = async (req, res) => {
  try {
    await userServices.deleteUser(req.params.id);
    res.status(200).json({ message: 'User deleted successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { getAllUsers, signInUser, signUpUser, deleteUser };