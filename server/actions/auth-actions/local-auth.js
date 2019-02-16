const handleAuthentication = require('./handle-authentication')
const passport = require('passport')

/** Authenticate using local strategy. */
module.exports.authenticate = (req, res, next) => {
  passport.authenticate('local', async (user, err, info) => {
    return handleAuthentication({ err, user, info }, { req, res, next })
  })(req, res, next)
}
