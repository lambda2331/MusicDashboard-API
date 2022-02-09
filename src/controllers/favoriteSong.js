const FavoriteSongService = require("../services/favoriteSong")

class FavoritSongController {
    async markSongAsFavorite(req, res) {
        const { song_id } = req.body
        if (!song_id) {
            return res.status(404).send({ message: 'Please, send a songId' })
        }

        try {
            const user_id = req.user.id
            await FavoriteSongService.markSongAsLiked({ user_id, song_id })
            const favoriteSongs = await FavoriteSongService.getFavoriteSongsForUser(user_id)
            res.send(favoriteSongs)
        } catch (error) {
            return res.status(404).send({ message: 'Ыomething went wrong try again later' })
        }
    }

    async deleteSongFromFavorite(req, res) {
        const { song_id } = req.body

        if (!song_id) {
            return res.status(404).send({ message: 'Please, send a songId' })
        }

        try {
            const user_id = req.user.id
            await FavoriteSongService.deleteSongFromFavorite({ user_id, song_id })
            res.send({ message: 'Song was deleted from favorite list' })
        } catch (error) {
            return res.status(404).send({ message: 'Something went wrong try again later' })
        }
    }

    async getFavoriteSongsForUser(req, res) {
        const user_id = req.user.id
        if (!user_id) {
            return res.status(404).send({ message: 'Please, send an userId' })
        }

        try {
            const songs = await FavoriteSongService.getFavoriteSongsForUser(user_id)
            res.send(songs)
        } catch (error) {
            return res.status(404).send({ message: 'Something went wrong try again later' })
        }
    }
}

module.exports = new FavoritSongController()