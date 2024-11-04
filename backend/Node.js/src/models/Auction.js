const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  'name': { type: String, required: true },
  'ownerId': { type: String, required: true },
  'endDate': { type: Date, required: true },
  'bids': [
    {
      'ownerId': { type: String, required: true },
      'dateAdded': { type: Date, required: true, default: Date.now },
    }
  ]
});

module.exports = mongoose.model('User', auctionSchema);