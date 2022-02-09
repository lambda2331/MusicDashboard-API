const ArtistService = require("../services/artist")

class ArtistController {
    async getArtistByName (req, res) {
        if (!req.query.name) {
            return res.status(404).send({ message: 'Please, send an artist name'})
        }

        const artist = await ArtistService.findArtistByName(req.query.name)

        if (!artist) {
            return res.status(404).send({ message: 'Artist with current name does not exist'})
        }

        res.send(artist)
    }
}

module.exports = new ArtistController()