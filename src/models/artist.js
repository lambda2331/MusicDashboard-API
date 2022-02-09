const model = (sequelize, DataTypes) => {
    const Artist = sequelize.define('Artist', {
        artist_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true
        }
    }, {
        tableName: 'artists',
        timestamps: false
    })

    Artist.associate = function(models) {
        Artist.belongsToMany(models['Song'], { through: models['ArtistsSongs'], foreignKey: 'artist_id' });
    }

    return Artist
}

module.exports = model