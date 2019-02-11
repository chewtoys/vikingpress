/* global maroon */
maroon.out.debug(__filename, 'Set up local auth action')
const handleAuthentication = require('./handle-authentication')
const passport = require('passport')

/** Authenticate using local strategy. */
module.exports.authenticate = (req, res, next) => {
    passport.authenticate('local', async(user, err, info) => {
        return await handleAuthentication({ user, err, info }, { req, res, next })
    })(req, res, next)
}
