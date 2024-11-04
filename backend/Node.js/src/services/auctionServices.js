const Auction = require('../models/Auction');
const User = require('../models/User');

const fs = require('fs');
const imgPath = '../static/images';

const validate = require('../utils/helpers/textValidator');
const responseFormat = require('../utils/helpers/responseFormat');

const getAll = async (query) => {
  const { page = 1, limit = 20 } = query;

  page = parseInt(page);
  limit = parseInt(limit);

  const auctions = await Auction.find().skip((page - 1) * limit).limit(limit);

  const total = await Auction.countDocuments();

  return responseFormat('Batch auctions retrieved successfully', {
    data: auctions,
    pagination: {
      total: total,
      page: page,
      limit: limit,
      totalPages: Math.ceil(total / limit),
    }
  });
}

const getOwned = async (params, query) => {
  const { ownerId } = params;
  if (User.findById(ownerId)) {
    const { page = 1, limit = 20 } = query;

    page = parseInt(page);
    limit = parseInt(limit);

    const auctions = await Auction.find({ ownerId: ownerId }).skip((page - 1) * limit).limit(limit);

    const total = await Auction.countDocuments({ ownerId: ownerId });

    return responseFormat('Batch auctions retrieved successfully', {
      data: auctions,
      pagination: {
        total: total,
        page: page,
        limit: limit,
        totalPages: Math.ceil(total / limit),
      }
    });
  }
  else {
    throw new Error(`User ${ownerId} not found`);
  }
}

const getBid = async (params, query) => {
  const { ownerId } = params;
  if (User.findById(ownerId)) {
    const { page = 1, limit = 20 } = query;

    page = parseInt(page);
    limit = parseInt(limit);

    const auctions = await Auction.find({ bids: { $elemMatch: { ownerId: ownerId } } }).skip((page - 1) * limit).limit(limit);

    const total = await Auction.countDocuments({ bids: { $elemMatch: { ownerId: ownerId } } });

    return responseFormat('Bid auctions retrieved successfully', {
      data: auctions,
      pagination: {
        total: total,
        page: page,
        limit: limit,
        totalPages: Math.ceil(total / limit),
      }
    });
  }
  else {
    throw new Error(`User ${ownerId} not found`);
  }
}

const addAuction = async (body) => {
  const { ownerId, name, endDate } = body;
  if (User.findById(ownerId)) {
    if (validate('text', name)
      && validate('date', endDate)) {
      const newAuction = new Auction({
        'name': name,
        'ownerId': ownerId,
        'endDate': new Date(endDate)
      });
      return responseFormat(`Auction Added Successfully`, await newAuction.save());
    }
    else {
      throw new Error(`Invalid Auction Data`);
    }
  }
  else {
    throw new Error(`User ${ownerId} not found`);
  }
}

const addBid = async (params, body) => {

}

const removeBid = async (params, body) => {

}

const deleteAuction = async (params) => {

}

module.exports = { getAll, getOwned, getBid, addAuction, addBid, removeBid, deleteAuction };