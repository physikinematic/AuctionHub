const auctionServices = require('../services/auctionServices');

const getAll = async (req, res) => {
  try {
    const all = await auctionServices.getAll(req.query);
    res.status(200).json(all);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const getOwned = async (req, res) => {
  try {
    const all = await auctionServices.getOwned(req.params);
    res.status(200).json(all);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const getBid = async (req, res) => {
  try {
    const all = await auctionServices.getBid(req.params);
    res.status(200).json(all);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const addAuction = async (req, res) => {
  try {
    const all = await auctionServices.addAuction(req.body);
    res.status(200).json(all);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const addBid = async (req, res) => {
  try {
    const all = await auctionServices.addBid(req.params, req.body);
    res.status(200).json(all);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const removeBid = async (req, res) => {
  try {
    const all = await auctionServices.removeBid(req.params, req.body);
    res.status(200).json(all);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const deleteAuction = async (req, res) => {
  try {
    const all = await auctionServices.deleteAuction(req.params);
    res.status(200).json(all);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {getAll, getOwned, getBid, addAuction, addBid, removeBid, deleteAuction};