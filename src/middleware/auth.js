const jwt = require('jsonwebtoken')
const availableRoutes = ['/api/user/login', '/api/user/register']
const config = require('config')

module.exports = (req, res, next) => {
    if (availableRoutes.includes(req.path)) {
        return next()
    }

    try {
        if (!req.headers || !req.headers["authorization"]) {
            return res.status(403).send({ message: 'Access denied' })
        }
        console.log(jwt)
        const decoded = jwt.verify(token.split(' ')[1], config.get('secret_key'));
        console.log(decoded)
        req.user = decoded
        next();
    } catch (error) {
        res.status(401).send({ message: 'Unauthorized' });
    }
}