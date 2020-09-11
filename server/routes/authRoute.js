const express = require('express');
const authController = require('../controllers/AuthController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/delete', authController.deleteUser);

router.get('/getCurrentUser', verifyToken, authController.getCurrentUser);

module.exports = router;
