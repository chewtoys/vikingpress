const passport = require('passport')

/** Send the user to enter their credentials with Google. */
module.exports = (req, res, next) => {
  return passport.authenticate('google', {
    scope: ['email', 'profile']
  })(req, res, next)
}
