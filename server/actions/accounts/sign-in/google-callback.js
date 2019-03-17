const authenticateUser = require('../../../helpers/authenticate-user')
const passport = require('passport')

/** Handle the callback from Google. */
module.exports = (req, res, next) => {
  passport.authenticate('google', async (err, user, info) => {
    return authenticateUser({ err, user, info }, { req, res, next })
  })(req, res, next)
}
