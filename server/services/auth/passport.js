const googleStrategy = require('./google-strategy')()
const localStrategy = require('./local-strategy')()
const passport = require('passport')
const { User } = require('../../services/db')

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
