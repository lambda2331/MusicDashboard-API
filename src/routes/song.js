const router = require('express').Router()
const SongController = require('../controllers/song')

router.route('/').get(SongController.getAllSongs)

module.exports = router