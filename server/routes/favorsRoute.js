const express = require('express')
const FavorsController = require('../controllers/FavorsController')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken');

router.get('/', (req, res) => { res.send('Favors API OK') })
router.get('/:id', FavorsController.getFavorById)

router.post('/create', FavorsController.createNewFavors)
router.post('/update', verifyToken, FavorsController.updateFavorStatus)
router.post('/delete', verifyToken, FavorsController.deleteFavorById)

router.get('/all/:type/:id', FavorsController.getAllByTypeAndId)

module.exports = router