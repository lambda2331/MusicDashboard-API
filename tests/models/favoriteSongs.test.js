const { sequelize, checkModelName, checkPropertyExists, dataTypes } = require('sequelize-test-helpers')
const createFavoriteSongModel = require('../../src/models/favoriteSong')

describe('FavoriteSong model test', () => {
    let FavoriteSongModel
    let instances

    before(() => {
        FavoriteSongModel = createFavoriteSongModel(sequelize, dataTypes)
        instances = new FavoriteSongModel()
    })

    it('Check if model has correct name', () => {
        checkModelName(FavoriteSongModel)('FavoriteSong')
    })

    it('Check if all properties exist', () => {
        ['song_id', 'user_id'].forEach(checkPropertyExists(instances))
    })
})