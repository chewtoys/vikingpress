/* global maroon */
maroon.out.debug(__filename, 'Set up Google auth actions')
const handleAuthentication = require('./handle-authentication')
const passport = require('passport')

/** Send the user to enter their credentials with Google. */
module.exports.start = (req, res, next) => {
    return passport.authenticate('google', {
        scope: ['email', 'profile']
    })(req, res, next)
}

/** Handle the callback from Google. */
module.exports.callback = (req, res, next) => {
        passport.authenticate('google', async(err, user, info) => {
            return await handleAuthentication({ err, user, info }, { req, res, next })
        })(req, res, next)
}
