const pg = require('pg')

module.exports = {
  "development": {
    "username": "artem.dudinskij",
    "password": "Hardy001",
    "database": "artem.dudinskij",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "dialectModule": pg,
    "sync": {
      force: true
    }
  },
  "test": {
    "username": "artem.dudinskij",
    "password": "Hardy001",
    "database": "artem.dudinskij",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "dialectModule": pg,
    "sync": {
      force: true
    }
  }
}
