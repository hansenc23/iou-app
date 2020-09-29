const express = require('express');
const favorsRoute = require('./favorsRoute');
const authRoute = require('./authRoute');
const imageRoute = require('./imageRoute');
const requestRoute = require('./requestRoute');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    username: 'HansenC',
    password: 'test123456',
  });
});

router.use('/favors', favorsRoute);

// Change here if you want
router.use('/auth', authRoute);

router.use('/image', imageRoute);

router.use('/request', requestRoute);

module.exports = router;
