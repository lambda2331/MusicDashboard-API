const express = require('express')
const bodyParser = require('body-parser')
const authMiddleware = require('./middleware/auth')
const router = require('./router')
// const initDataBase = require('./helpers/initDatabase')
const db = require('./models')

function initDB () {
    db.sequelize.sync({ force: true })
}

function createApp() {
    const app = express()

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.use(authMiddleware)

    app.use('/api', router)

    initDB()

    return app
}

module.exports = createApp()