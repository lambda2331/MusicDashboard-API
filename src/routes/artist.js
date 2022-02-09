const router = require('express').Router()
const ArtistController = require('../controllers/artist')

router.route('/').get(ArtistController.getArtistByName)

module.exports = router