const db = require("../models")

class SongService {
    findSongByTitle (title) {
        return db['Song'].findOne({ where: { title } })
    }

    getAllSongs () {
        return db['Song'].findAll({ include: [Artist] })
    }
}

module.exports = new SongService()