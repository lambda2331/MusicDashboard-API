const session = require('express-session')
const RedisStorage = require('connect-redis')(session)
const redis = require('redis')
const client = redis.createClient({
    host: 'localhost',
    port: 6379
})

function initSession (config) {
    return session({
        store: new RedisStorage({ client }),
        secret: config.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, 
            httpOnly: false,
            maxAge: 1000 * 60 * 10
        }
    })
}

module.exports = initSession