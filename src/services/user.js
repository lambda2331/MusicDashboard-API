const db = require("../models")

class UserService {
    createUser (userData) {
        return db['User'].create(userData)
    }

    findUserByQuery (query) {
        return db['User'].findOne({ where: { ...query }})
    }

    generateAuthToken (user) {
        return db['User'].generateAuthToken(user)
    }

    validateUser (user, schema) {
        return db['User'].validate(user, schema)
    }
}

module.exports = new UserService()