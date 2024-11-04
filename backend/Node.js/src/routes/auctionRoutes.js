const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auctionController');

router.get('/auction', auctionController.getAll);
router.get('/auction/owned/:ownerId', auctionController.getOwned);
router.get('/auction/bid/:ownerId', auctionController.getBid);
router.post('/auction', auctionController.addAuction);
router.patch('/auction/:id', auctionController.addBid);
router.patch('/auction/:id', auctionController.removeBid);
router.delete('/auction/:id', auctionController.deleteAuction);

module.exports = router;