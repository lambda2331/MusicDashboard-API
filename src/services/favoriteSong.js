const db = require("../models")

class FavoriteSongService {
    markSongAsLiked(data) {
        return db['FavoriteSong'].create(data)
    }

    deleteSongFromFavorite({ user_id, song_id }) {
        return db['FavoriteSong'].destroy({ where: { user_id, song_id } })
    }

    async getFavoriteSongsForUser(user_id) {
        const songIds = await db['FavoriteSong'].findAll({ where: { user_id } })

        if (songIds.length === 0) {
            return Promise.resolve([])
        }
        
        return db['Song'].findAll({
            where: {
                song_id: {
                    [Sequelize.Op.in]: songIds.map(song => song.toJSON().song_id)
                }
            }, include: [Artist]
        })
    }
}

module.exports = new FavoriteSongService()