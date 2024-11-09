const Auction = require('../models/Auction');
const User = require('../models/User');
const RequestError = require('../utils/errors/RequestError');

const validate = require('../utils/helpers/textValidator');
const response = require('../utils/helpers/responseFormat');

const getAll = async (query) => {
  const { page = 1, limit = 20 } = query;

  const _page = parseInt(page);
  const _limit = parseInt(limit);

  const auctions = await Auction.find().skip((_page - 1) * _limit).limit(_limit);

  const total = await Auction.countDocuments();

  return response('Batch Auctions Retrieved Successfully',
    auctions,
    {
      pagination: {
        total: total,
        page: _page,
        limit: _limit,
        totalPages: Math.ceil(total / _limit),
      }
    }
  );
}

const getOwned = async (params, query) => {
  const { ownerId } = params;
  const { page = 1, limit = 20 } = query;

  const user = await User.findOne({ _id: ownerId });
  if (!user) {
    throw new RequestError(204, `User ${ownerId} Not Found`);
  }

  const _page = parseInt(page);
  const _limit = parseInt(limit);

  const auctions = await Auction.find({ ownerId: ownerId }).skip((_page - 1) * _limit).limit(_limit);

  const total = await Auction.countDocuments({ ownerId: ownerId });

  return response('Owned Auctions Retrieved Successfully',
    auctions,
    {
      pagination: {
        total: total,
        page: _page,
        limit: _limit,
        totalPages: Math.ceil(total / _limit),
      }
    }
  );
}

const getBidded = async (params, query) => {
  const { ownerId } = params;

  const user = await User.findOne({ _id: ownerId })
  if (!user) {
    throw new RequestError(204, `User ${ownerId} Not Found`);
  }

  const { page = 1, limit = 20 } = query;

  const _page = parseInt(page);
  const _limit = parseInt(limit);

  const auctions = await Auction.find({ bids: { $elemMatch: { ownerId: ownerId } } }).skip((_page - 1) * _limit).limit(_limit);

  const total = await Auction.countDocuments({ bids: { $elemMatch: { ownerId: ownerId } } });

  return response('Bid Auctions Retrieved Successfully', auctions,
    {
      pagination: {
        total: total,
        page: _page,
        limit: _limit,
        totalPages: Math.ceil(total / _limit),
      }
    }
  );
}

const addAuction = async (body) => {
  const { ownerId, name, endDate } = body;

  const user = await User.findOne({ _id: ownerId });

  if (!user) {
    throw new RequestError(204, `User ${ownerId} Not Found`);
  }

  if (!validate('date', endDate)) {
    throw new RequestError(400, `Invalid Auction Data`);
  }

  const auction = await new Auction({
    name,
    ownerId,
    endDate: new Date(endDate)
  }).save();

  return response(`Auction Added Successfully`, auction);
};

const addBid = async (params, body) => {
  const { id } = params;
  const { ownerId, value } = body;

  const user = await User.findOne({ _id: ownerId });
  if (!user) {
    throw new RequestError(204, `User ${ownerId} Not Found`);
  }

  const auction = await Auction.findOne({ _id: id });
  if (!auction) {
    throw new RequestError(204, `Auction ${id} Not Found`);
  }

  // if (typeof value !== 'number') {
  //   throw new RequestError(400, 'Invalid Value');
  // } TODO

  const bid = { ownerId, value, /* dateAdded: new Date() TODO */ };
  auction.bids.push(bid);

  await auction.save();
  return response(`Bid Added Successfully`);
};

const removeBid = async (params) => {
  const { id, bidId } = params;
  const auction = await Auction.findOne({ _id: id });

  if (!auction) {
    throw new RequestError(204, `Auction ${id} Not Found`);
  }

  if (!auction.bids.some(bid => bid['_id'].equals(bidId))) {
    throw new RequestError(204, `Bid ${bidId} Not Found`);
  }

  const bidIndex = auction.bids.indexOf(bidId);
  auction.bids.splice(bidIndex, 1);

  return response(`Bid Removed Successfully`, await auction.save());
}

const deleteAuction = async (params) => {
  const { id } = params;
  const auction = await Auction.findOneAndDelete({ _id: id });

  if (!auction) {
    throw new RequestError(204, `Auction ${id} Not Found`);
  }

  return response(`Auction Deleted Successfully`, auction);
}

module.exports = { getAll, getOwned, getBidded, addAuction, addBid, removeBid, deleteAuction };