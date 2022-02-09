const { expect } = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const { makeMockModels } = require('sequelize-test-helpers')

const mockModels = makeMockModels({ 
    FavoriteSong: { create: sinon.stub(), delete: sinon.stub(), findAll: sinon.stub() },
    Song: { findAll: sinon.stub() }
 })

const service = proxyquire('../../src/services/favoriteSong', {
    '../models': mockModels
})

describe('FavoriteSong service test', () => {
    const fakeData = {
        "user_id": 12,
        "song_id": 242377
    }

    let result

    const resetStubs = () => {
        mockModels.FavoriteSong.create.resetHistory()
        mockModels.FavoriteSong.delete.resetHistory()
        mockModels.FavoriteSong.findAll.resetHistory()
        mockModels.Song.findAll.resetHistory()
    }

    context('Make song as favorite', () => {
        before(async () => {
            mockModels.Artist.findOne.resolves(null)
            result = await service.findArtistByName(fakeArtist.name)
        })

        after(resetStubs)

        it('Called Artist.findOnde method', () => {
            expect(mockModels.Artist.findOne).calledOnce
        })

        it('Result is null', () => {
            expect(result).to.been.null
        })
    })

    context('Artist with this name exist', () => {
        before(async () => {
            mockModels.Artist.findOne.resolves(fakeArtist)
            result = await service.findArtistByName(fakeArtist.name)
        })

        after(resetStubs)

        it('Called Artist.findOnde method', () => {
            expect(mockModels.Artist.findOne).calledOnce
        })

        it('Result is Artist', () => {
            expect(result).to.equal(fakeArtist)
        })
    })
})