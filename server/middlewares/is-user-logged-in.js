const jwt  = require('jsonwebtoken')
const index = require('../../index')

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({message: 'Unauthorized'})
    }
    const token = req.headers.authorization.split(' ')[1]
    if (!token || token === 'null') {
        // req.userData = null
        // return next()
        return res.status(401).json({message: 'Unauthorized'})
    }
    // console.log('authorization token', token)

    try {
        const payload = jwt.verify(token, index.jwtsecretKey)

        if (!payload) {
            return res.status(401).json({message: 'Unauthorized'})
        } else {
            req.userData = payload.data
            // console.log('user is logged in')
            return next()
        }
    } catch(error) {
        return res.status(500).json({message: 'Server Error'})
    }
}