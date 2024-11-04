const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router();

router.get('/user/:id', authMiddleware, userController.getAllUsers);
router.post('/user/signin', userController.signInUser);
router.post('/user/signup', userController.signUpUser);
router.delete('/user/:id', userController.deleteUser);

module.exports = router;