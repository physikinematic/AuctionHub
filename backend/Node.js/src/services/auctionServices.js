const Auction = require('../models/Auction');
const User = require('../models/User');

const fs = require('fs');
const imgPath = '../static/images';

const validate = require('../utils/helpers/textValidator');
const responseFormat = require('../utils/helpers/responseFormat');

const getAll = async (query) => {
  try {
    const { page = 1, limit = 20 } = query;

    page = parseInt(page);
    limit = parseInt(limit);

    const auctions = await Auction.find().skip((page - 1) * limit).limit(limit);

    const total = await Auction.countDocuments();

    return responseFormat(true, 'Batch auctions retrieved successfully', {
      data: auctions,
      pagination: {
        total: total,
        page: page,
        limit: limit,
        totalPages: Math.ceil(total / limit),
      }
    });
  }
  catch (error) {
    return responseFormat(false, 'Error getting auctions', error);
  }
}

const getOwned = async (params, query) => {
  try {
    const { ownerId } = params;
    if (User.findById(ownerId)) {
      const { page = 1, limit = 20 } = query;

      page = parseInt(page);
      limit = parseInt(limit);

      const auctions = await Auction.find({ ownerId: ownerId }).skip((page - 1) * limit).limit(limit);

      const total = await Auction.countDocuments({ ownerId: ownerId });

      return responseFormat(true, 'Batch auctions retrieved successfully', {
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
      return responseFormat(false, `User ${ownerId} not found`);
    }
  }
  catch (error) {
    return responseFormat(false, 'Error getting auctions', error);
  }
}

const getBid = async (params, query) => {
  try {
    const { ownerId } = params;
    if (User.findById(ownerId)) {
      const { page = 1, limit = 20 } = query;

      page = parseInt(page);
      limit = parseInt(limit);

      const auctions = await Auction.find({ bids: { $elemMatch: { ownerId: ownerId } } }).skip((page - 1) * limit).limit(limit);

      const total = await Auction.countDocuments({ bids: { $elemMatch: { ownerId: ownerId } } });

      return responseFormat(true, 'Bid auctions retrieved successfully', {
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
      return responseFormat(false, `User ${ownerId} not found`);
    }
  }
  catch (error) {
    return responseFormat(false, 'Error getting bid auctions', error);
  }
}

const addAuction = async (body) => {
  try {
    const { ownerId, name, endDate } = body;
    if (User.findById(ownerId)) {
      if (validate('text', name)
        && validate('date', endDate)) {
        const newAuction = new Auction({
          'name': name,
          'ownerId': ownerId,
          'endDate': new Date(endDate)
        });
        return responseFormat(true, `Auction Added Successfully`, await newAuction.save());
      }
      else {
        return responseFormat(false, `Invalid Auction Data`);
      }
    }
    else {
      return responseFormat(false, `User ${ownerId} not found`);
    }
  }
  catch (error) {
    return responseFormat(false, `Error adding auction`, error);
  }
}

const addBid = async (params, body) => {

}

const removeBid = async (params, body) => {

}

const deleteAuction = async (params) => {

}

module.exports = { getAll, getOwned, getBid, addAuction, addBid, removeBid, deleteAuction };