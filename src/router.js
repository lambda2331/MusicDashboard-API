const express = require('express')
const router = express.Router()
const { UserRoutes, ArtistRoutes, SongRoutes, FavoriteSongRoutes} = require('./routes')

router.use('/user', UserRoutes)
router.use('/artist', ArtistRoutes)
router.use('/song', SongRoutes)
router.use('/favorites', FavoriteSongRoutes)

module.exports = router
