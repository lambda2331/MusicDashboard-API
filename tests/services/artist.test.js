const { expect } = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const { makeMockModels } = require('sequelize-test-helpers')

const mockModels = makeMockModels({ Artist: { findOne: sinon.stub() } })

const service = proxyquire('../../src/services/artist', {
    '../models': mockModels
})

describe('Artist service test', () => {
    const fakeArtist = {
        "artist_id": 242377,
        "name": "Set It Off"
    }

    let result

    const resetStubs = () => {
        mockModels.Artist.findOne.resetHistory()
    }

    context('Artist with this name doesn\'t exist', () => {
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