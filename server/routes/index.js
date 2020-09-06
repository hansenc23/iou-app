const express = require('express')
const favorsRoute = require('./favorsRoute')

const router = express.Router()

router.get('/', (req, res) => {
    res.json({
        username: 'Hansen',
        password: 'test123',
    });
});



router.use('/favors', favorsRoute)

module.exports = router