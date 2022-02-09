const FavoriteSongController = require('../controllers/favoriteSong')

const router = require('express').Router()

router.route('/')
    .get(FavoriteSongController.getFavoriteSongsForUser)
    .post(FavoriteSongController.markSongAsFavorite)
    .delete(FavoriteSongController.deleteSongFromFavorite)

module.exports = router