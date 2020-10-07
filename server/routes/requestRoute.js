const express = require('express');
const RequestController = require('../controllers/RequestController');
const requestController = require('../controllers/RequestController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.all('/', (req, res) => {
  return res.send('This is request backend');
});

//localhost:5000/request/create
router.post('/create', requestController.create);
router.post('/add_reward', requestController.addReward);
router.post('/complete', requestController.complete);

router.get('/get_all', requestController.getAll);
router.get('/get', requestController.getById);
router.get('/reward/get', requestController.getRequestReward);

module.exports = router;
