const { sequelize, checkModelName, checkPropertyExists, dataTypes } = require('sequelize-test-helpers')
const createArtistModel = require('../../src/models/artist')
const createSongModel = require('../../src/models/song')
const createArtistsSongsModel = require('../../src/models/artistsSongs')
const { expect } = require('chai')

describe('Song model test', () => {
    let ArtistModel
    let SongModel
    let ArtistsSongsModel
    let instances

    before(() => {
        ArtistModel = createArtistModel(sequelize, dataTypes)
        SongModel = createSongModel(sequelize, dataTypes)
        ArtistsSongsModel = createArtistsSongsModel(sequelize, dataTypes)
        SongModel.associate({ Artist: ArtistModel, ArtistsSongs: ArtistsSongsModel })
        instances = new SongModel()
    })

    it('Check if model has correct name', () => {
        checkModelName(SongModel)('Song')
    })

    it('Check if all properties exist', () => {
        ['artist_id', 'name'].forEach(checkPropertyExists(instances))
    })

    it('Defined a belongsToMane association with SongModel', () => {
        expect(SongModel.belongsToMany).to.have.been.calledWith(ArtistModel, { through: ArtistsSongsModel, foreignKey: 'song_id' })
    })
})