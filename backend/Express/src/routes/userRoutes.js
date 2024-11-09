const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router();

router.get('/user/all/:id', authMiddleware, userController.getAll);
router.post('/user/signin', userController.signIn);
router.post('/user/signup', userController.signUp);
router.delete('/user/:id', userController.deleteOne);

module.exports = router;