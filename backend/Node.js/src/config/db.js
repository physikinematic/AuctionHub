const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  }
  catch (err) {
    console.error('Database connection failed!', err);
    process.exit(1);
  }
};

module.exports = dbConnection;