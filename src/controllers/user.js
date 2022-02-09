const UserService = require("../services/user")
const bcrypt = require('bcrypt')
const { RegisterSchema, LoginSchema } = require("../validation/schemas/user")

class UserController {
    async register(req, res) {
        try {
            const userData = req.body
            await UserService.validateUser(userData, RegisterSchema)
            const user = await UserService.createUser(req.body)
            res.send(user)
        } catch (error) {
            console.log(error)
            return res.status(404).send(error)
        }
    }

    async login(req, res) {
        try {
            await UserService.validateUser(req.body, LoginSchema)

            const { email, password } = req.body
            const user = await UserService.findUserByQuery({ email })

            if (!user) {
                return res.status(404).send({ message: 'Invalid email or password' })
            }

            const isPasswordValid = bcrypt.compare(password, user.password)

            if (!isPasswordValid) {
                return res.status(404).send({ message: 'Invalid password' })
            }

            const token = UserService.generateAuthToken(user.toJSON())

            res.send({ token, ...user.toJSON() })
        } catch (error) {
            return res.status(404).send(error)
        }

    }
}

module.exports = new UserController()