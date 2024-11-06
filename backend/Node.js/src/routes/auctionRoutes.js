const express = require('express');
const auctionController = require('../controllers/auctionController');
const router = express.Router();

router.get('/auction/all', auctionController.getAll);
router.get('/auction/owned/:ownerId', auctionController.getOwned);
router.get('/auction/bidded/:ownerId', auctionController.getBidded);
router.post('/auction', auctionController.addAuction);
router.post('/auction/:id/bid', auctionController.addBid);
router.delete('/auction/:id/bid/:bidId', auctionController.deleteBid);
router.delete('/auction/:id', auctionController.deleteAuction);

module.exports = router;