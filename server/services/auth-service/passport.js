/* global maroon */
const User = require('../../models/user-model')
const googleStrategy = require('./google-strategy')()
const localStrategy = require('./local-strategy')()

/** Convert user object to user ID */
async function serializeUser(user, done) {
    return done(null, user._id)
}

/** Convert user ID to user object */
async function deserializeUser(id, done) {
    User.findOneById(id, (err, user) => {
        if (err) {
            return done(err)
        }
        if (!user) {
            return done(null, null, {
                message: 'ACCOUNT_NOT_FOUND'
            })
        }
        return done(null, user)
    })
}

/**
 * Set up Passport
 * @param {object} passport - Passport.js
 */
module.exports = async function passportSetup(passport) {
    maroon.out.debug(__filename, 'Setting up Passport and auth strategies')

    /** Set up serialize/deserialize functions */
    passport.serializeUser(serializeUser)
    passport.deserializeUser(deserializeUser)

    /** Set up strategies */
    passport.use('google', googleStrategy)
    passport.use('local', localStrategy)
}
