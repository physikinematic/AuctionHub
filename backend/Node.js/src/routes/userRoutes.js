const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router();

router.get('/user', authMiddleware, userController.getAllUsers);
router.post('/user/signin', authMiddleware, userController.signInUser);
router.post('/user/signup', authMiddleware, userController.signUpUser);
router.delete('/user/:id', authMiddleware, userController.deleteUser);

module.exports = router;