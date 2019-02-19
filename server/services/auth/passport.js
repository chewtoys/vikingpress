const googleStrategy = require('./google-strategy')()
const localStrategy = require('./local-strategy')()
const passport = require('passport')
const User = require('../../models/accounts/user')

/** Convert user object to user ID. */
async function serializeUser (user, done) {
  return done(null, user._id)
}

/** Convert user ID to user object. */
async function deserializeUser (id, done) {
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
 * @param {function} app - Express app function
 */
module.exports = async function initializePassport (app) {
  /** Set up serialize/deserialize functions. */
  passport.serializeUser(serializeUser)
  passport.deserializeUser(deserializeUser)

  /** Set up strategies. */
  passport.use('google', googleStrategy)
  passport.use('local', localStrategy)

  /** Initialize Passport. */
  app.use(passport.initialize())
}
