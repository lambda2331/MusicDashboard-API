const { validation } = require('../validation')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

const model = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            set (value) {
                const hash = bcrypt.hashSync(value, Number(config.get('salt')))
                this.setDataValue('password', hash)
            }
        }
    }, {
        tableName: 'users',
    })
    
    User.generateAuthToken = function (user) {
        return jwt.sign({ ...user }, config.get('secret_key'), { expiresIn: "1h" })
    }
    
    User.validate = function (data, schema) {
        const validate = validation.compile(schema)
    
        return new Promise((resolve, reject) => {
            const isValid = validate(data)
    
            if (isValid) {
                return resolve()
            }
    
            return reject(parseErrors(validate.errors))
        })
    }
    
    return User
  }
  module.exports = model