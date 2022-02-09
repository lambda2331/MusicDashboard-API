const { sequelize, checkModelName, checkPropertyExists, dataTypes } = require('sequelize-test-helpers')
const createArtistsSongsModel = require('../../src/models/artistsSongs')

describe('ArtistsSongs model test', () => {
    let ArtistsSongsModel
    let instances

    before(() => {
        ArtistsSongsModel = createArtistsSongsModel(sequelize, dataTypes)
        instances = new ArtistsSongsModel()
    })

    it('Check if model has correct name', () => {
        checkModelName(ArtistsSongsModel)('ArtistsSongs')
    })

    it('Check if all properties exist', () => {
        ['_id'].forEach(checkPropertyExists(instances))
    })
})