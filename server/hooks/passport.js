const googleStrategy = require('../services/auth/google-strategy')()
const localStrategy = require('../services/auth/local-strategy')()
const passport = require('passport')
const { User } = require('../services/db')

/** Convert user object to user ID. */
async function serializeUser (user, done) {
  return done(null, user.id)
}

/** Convert user ID to user object. */
async function deserializeUser (id, done) {
  try {
    let user = await User.findOneById({ where: { id } })
    if (!user) {
      return done(null, null, {
        message: 'ACCOUNT_NOT_FOUND'
      })
    }
    return done(null, user)
  } catch (error) {
    return done(error)
  }
}

module.exports = {
  onEvent: 'initialize',
  /**
   * Set up Passport
   * @param {function} app - Express app function
   */
  fn: async function initializePassport () {
    /** Set up serialize/deserialize functions. */
    passport.serializeUser(serializeUser)
    passport.deserializeUser(deserializeUser)

    /** Set up strategies. */
    passport.use('google', googleStrategy)
    passport.use('local', localStrategy)

    /** Initialize Passport. */
    maroon.app.use(passport.initialize())
  }
}
