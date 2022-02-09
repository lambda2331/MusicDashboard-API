const { sequelize, checkModelName, checkPropertyExists, dataTypes } = require('sequelize-test-helpers')
const createUserModel = require('../../src/models/user')

describe('User model test', () => {
    let UserModel
    let instances

    before(() => {
        UserModel = createUserModel(sequelize, dataTypes)
        instances = new UserModel()
    })

    it('Check if model has correct name', () => {
        checkModelName(UserModel)('User')
    })

    it('Check if all properties exist', () => {
        ['username', 'email', 'password'].forEach(checkPropertyExists(instances))
    })
})