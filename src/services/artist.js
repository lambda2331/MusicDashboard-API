const db = require("../models")

class ArtistService {
    findArtistByName (name) {
        return db['Artist'].findOne({ where: { name }, include: [db['Song']] })
    }
}

module.exports = new ArtistService()