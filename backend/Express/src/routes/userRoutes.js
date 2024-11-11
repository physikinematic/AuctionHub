const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router();

router.get('/auth/all/:id', authMiddleware, userController.getAll);
router.post('/auth/signin', userController.signIn);
router.post('/auth/signup', userController.signUp);
router.delete('/auth/:id', userController.deleteOne);

module.exports = router;