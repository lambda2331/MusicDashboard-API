const SongService = require("../services/song")

class SongController {
    async getAllSongs(req, res) {
        try {
            const songs = await SongService.getAllSongs()
            console.log(req.user)
            return res.send(songs)
        } catch (error) {
            return res.status(404).send({ mesage: 'Can not get all songs' })
        }
    }
}

module.exports = new SongController()