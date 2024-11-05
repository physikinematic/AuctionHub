const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  'ownerId': { type: String, required: true },
  'value': { type: Number, required: true },
  'dateAdded': { type: Date, default: Date.now },
});

module.exports = mongoose.model('Bid', bidSchema);