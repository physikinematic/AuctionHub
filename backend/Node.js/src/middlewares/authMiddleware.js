module.exports = async (req, res, next) => {
  try {
    next();
  }
  catch (err) {
    res.status(403).send('Forbidden');
  }
}