const model = (sequelize, DataTypes) => {
    const ArtistsSongs = sequelize.define('ArtistsSongs', {
        _id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        tableName: 'artists_songs',
        timestamps: false
    })

    return ArtistsSongs
}

module.exports = model