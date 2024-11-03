const auctions = require('./auctions.json');
const bids = require('./bids.json');

const auction = (param, query) => {
  const id = query?.id;
  try {
    let result;
    switch (param) {
      case 'all':
        result = auctions;
        break;
      case 'owned':
        if (!!id) {
          result = auctions.filter(auction => auction.ownerId === id);
        }
        break;
      case 'bid':
        if (!!id) {
          result = auctions.filter(auction =>
            auction.bids.some(bid => bid.id === bids.find(b => b.ownerId === id)?.id)
          );
        }
        break;
    }
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = auction;