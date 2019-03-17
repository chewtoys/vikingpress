const authenticateUser = require('../../../helpers/authenticate-user')
const passport = require('passport')

/** Authenticate using local strategy. */
module.exports = (req, res, next) => {
  passport.authenticate('local', async (user, err, info) => {
    return authenticateUser({ err, user, info }, { req, res, next })
  })(req, res, next)
}
