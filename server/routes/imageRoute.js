const express = require('express');
const ImageController = require('../controllers/ImageController');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

router.post('/imageUpload', ImageController.imageUpload);

module.exports = router;
