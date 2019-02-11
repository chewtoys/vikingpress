/* global maroon */
const jwt = require('jsonwebtoken')
const User = require('../models/User')

/**
 * Get user from Express request.
 * @param {object} req - Express request
 * @param {boolean} [returnAll = true] - Return entire user object
 */
module.exports = async function getUserFromReq(req, returnAll) {
    let all = returnAll || true
    let { publicKey, options } = maroon.config.jwt
    let rawToken = req.headers['authorization'].split(' ')[1]
    let verifiedToken = jwt.verify(rawToken, publicKey, options)

    if (returnAll) {
        let user = await User.findById(verifiedToken.userId)
        if (user) {
            return user
        }
        return null
    }
    else {
        let count = await User.findById(verifiedToken.userId).countDocuments()
        if (count > 0) {
            return true
        }
        return false

    }
}
