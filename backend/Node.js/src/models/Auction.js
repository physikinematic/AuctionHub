const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  'name': { type: String, required: true, unique: true },
  'ownerId': { type: String, required: true },
  'endDate': { type: Date, required: true },
  'bids': [mongoose.ObjectId]
});

module.exports = mongoose.model('Auction', auctionSchema);