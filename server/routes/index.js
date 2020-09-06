const express = require('express')
const favorsRoute = require('./favorsRoute')
const authRoute = require('./authRoute')

const router = express.Router()

router.get('/', (req, res) => {
    res.json({
        username: 'Hansen',
        password: 'test123',
    });
});


router.use('/favors', favorsRoute)

// Change here if you want
router.use('/auth', authRoute)

module.exports = router