const model = (sequelize, DataTypes) => {
    const Song = sequelize.define('Song', {
        song_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            unique: true
        }
    }, {
        tableName: 'songs',
        timestamps: false
    })

    Song.associate = function(models) {
        Song.belongsToMany(models['Artist'], { through: models['ArtistsSongs'], foreignKey: 'song_id' });
    }

    return Song
}

module.exports = model