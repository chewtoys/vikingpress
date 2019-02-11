/* global maroon */
const jwt = require('jsonwebtoken')

/**
 * After passport.authenticate() runs, handle the results.
 * @param {object} fromPassport - Returned from passport.authenticate()
 * @param {object} fromPassport.user - User
 * @param {*} fromPassport.err - Error, if any
 * @param {*} fromPassport.info - Additional info
 * @param {object} fromExpress - From Express
 * @param {object} fromExpress.req - Request
 * @param {object} fromExpress.res - Response
 * @param {function} fromExpress.next - Go to next middleware
 */
module.exports = async function handleAuthentication({ user, err, info }, { req, res, next }) {
    if (err) {
        return next(err)
    }
    if (!user) {
        return next('ACCOUNT_NOT_FOUND')
    }
    try {
        let { privateKey, options } = maroon.config.jwt
        let authToken = jwt.sign({
            userId: user._id
        }, privateKey, options)
        return res.send({ token: authToken })
    }
    catch (error) {
        return next(error)
    }
}
