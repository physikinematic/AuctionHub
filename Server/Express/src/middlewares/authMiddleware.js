const Account = require("../models/Account");

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const account = await Account.find({ _id: id });
    if (account.role === "admin") {
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (err) {
    res.status(403).send("Forbidden");
  }
};
