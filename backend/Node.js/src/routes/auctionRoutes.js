const express = require('express');
const auctionController = require('../controllers/auctionController');
const router = express.Router();

router.get('/auction', auctionController.getAll);
router.get('/auction/owned/:ownerId', auctionController.getAllOwned);
router.get('/auction/bid/:ownerId', auctionController.getAllBid);
router.post('/auction', auctionController.addAuction);
router.post('/auction/:id/bid', auctionController.addBid);
router.delete('/auction/:id/bid/:bidId', auctionController.deleteBid);
router.delete('/auction/:id', auctionController.deleteAuction);

module.exports = router;