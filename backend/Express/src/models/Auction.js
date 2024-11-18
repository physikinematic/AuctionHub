const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  ownerId: { type: String, required: true },
  value: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const auctionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  ownerId: { type: String, required: true },
  endDate: { type: Date, required: true },
  bids: [bidSchema],
});

module.exports = mongoose.model("Auction", auctionSchema);
