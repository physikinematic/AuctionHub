const UserModel = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById({ _id: id });
    if (user.role === 'admin') {
      next();
    }
    else {
      res.status(401).send('Unauthorized');
    }
  }
  catch (err) {
    res.status(403).send('Forbidden');
  }
}