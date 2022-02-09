const model = (sequelize, DataTypes) => {
    const FavoriteSong = sequelize.define('FavoriteSong', {
        song_id: {
            type: DataTypes.INTEGER,
            unique: true
        },
        user_id: {
            type: DataTypes.STRING,
        }
    }, {
        tableName: 'favorite_songs',
        timestamps: false
    })

    return FavoriteSong
}

module.exports = model