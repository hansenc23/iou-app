const express = require('express');
const requestController = require('../controllers/RequestController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

//localhost:5000/request/create
router.post('/create', requestController.create);

module.exports = router;
