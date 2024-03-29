const bcrypt = require('bcrypt')
const findUserByUsername = require('../../helpers/find-user')
const LocalStrategy = require('passport-local')

module.exports = function initializeLocalAuthStrategy () {
  /** Assemble configuration info for local auth strategy. */
  let localStrategyConfig = {
    usernameField: 'username',
    passwordField: 'password',
    session: false
  }

  /** Return local auth strategy, to be passed to passport.use(). */
  return new LocalStrategy(localStrategyConfig, localStrategyHandler)
}

/**
 * Verification callback for local strategy
 * @param {string} username - Self-explanatory
 * @param {string} password - Self-explanatory
 * @param {function} done - From Passport
 */
async function localStrategyHandler (username, password, done) {
  try {
  /** Use the given username or email address to locate a user in the database. */
    let user = await findUserByUsername(username)
    if (!user) {
    /** If there's no user, return an error messsage. */
      return done(null, null, {
        message: 'USER_NOT_FOUND'
      })
    } else {
      if (user.authProvider.indexOf('Local') === -1) {
      /** If the user's auth provider isn't local, return
       * an error indicating that the wrong auth provider was used.
       */
        return done(null, null, {
          message: 'USER_FOUND_BUT_WRONG_AUTH_PROVIDER'
        })
      }
      /** If there is a user, check their password. */
      let passwordIsCorrect = await bcrypt.compare(password, user.password)
      if (passwordIsCorrect) {
      /** If the password is correct, return the user info. */
        return done(null, user)
      } else {
      /** If the password is incorrect, return an error. */
        return done(null, null, {
          message: 'PASSWORD_INCORRECT'
        })
      }
    }
  } catch (error) {
    return done(error)
  }
}
