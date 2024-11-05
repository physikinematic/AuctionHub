const auctionServices = require('../services/auctionServices');

const getAll = async (req, res) => {
  try {
    const all = await auctionServices.getAll(req.query);
    res.status(200).json(all);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
}

const getAllOwned = async (req, res) => {
  try {
    const owned = await auctionServices.getAllOwned(req.params, req.query);
    res.status(200).json(owned);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
}

const getAllBid = async (req, res) => {
  try {
    const bid = await auctionServices.getAllBid(req.params, req.query);
    res.status(200).json(bid);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
}

const addAuction = async (req, res) => {
  try {
    const added = await auctionServices.addAuction(req.body);
    res.status(200).json(added);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
}

const addBid = async (req, res) => {
  try {
    const added = await auctionServices.addBid(req.params, req.body);
    res.status(200).json(added);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
}

const deleteBid = async (req, res) => {
  try {
    const removed = await auctionServices.removeBid(req.params);
    res.status(200).json(removed);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
}

const deleteAuction = async (req, res) => {
  try {
    const deleted = await auctionServices.deleteAuction(req.params);
    res.status(200).json(deleted);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
}

module.exports = { getAll, getAllOwned, getAllBid, addAuction, addBid, deleteBid, deleteAuction };