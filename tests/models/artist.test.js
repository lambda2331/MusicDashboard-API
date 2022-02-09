const { sequelize, checkModelName, checkPropertyExists, dataTypes } = require('sequelize-test-helpers')
const createArtistModel = require('../../src/models/artist')
const createSongModel = require('../../src/models/song')
const createArtistsSongsModel = require('../../src/models/artistsSongs')
const { expect } = require('chai')

describe('Artist model test', () => {
    let ArtistModel
    let SongModel
    let ArtistsSongsModel
    let instances

    before(() => {
        ArtistModel = createArtistModel(sequelize, dataTypes)
        SongModel = createSongModel(sequelize, dataTypes)
        ArtistsSongsModel = createArtistsSongsModel(sequelize, dataTypes)
        ArtistModel.associate({ Song: SongModel, ArtistsSongs: ArtistsSongsModel })
        instances = new ArtistModel()
    })

    it('Check if model has correct name', () => {
        checkModelName(ArtistModel)('Artist')
    })

    it('Check if all properties exist', () => {
        ['artist_id', 'name'].forEach(checkPropertyExists(instances))
    })

    it('Defined a belongsToMane association with SongModel', () => {
        expect(ArtistModel.belongsToMany).to.have.been.calledWith(SongModel, { through: ArtistsSongsModel, foreignKey: 'artist_id' })
    })
})