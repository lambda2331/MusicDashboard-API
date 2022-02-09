const router = require('express').Router()
const UserController = require('../controllers/user')

router.route('/register').post(UserController.register)
router.route('/login').post(UserController.login)

module.exports = router