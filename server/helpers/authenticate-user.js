const jwt = require('jsonwebtoken')

/**
 * After passport.authenticate() runs, handle the results.
 * @param {object} fromPassport - Returned from passport.authenticate()
 * @param {object} fromPassport.user - User
 * @param {*} fromPassport.err - Error, if any
 * @param {*} fromPassport.info - Additional info
 * @param {object} fromExpress - From Express
 * @param {object} fromExpress.req - Request
 * @param {object} fromExpress.res - Response
 * @param {function} fromExpress.next - Go to next middleware
 */
module.exports = async function authenticateUser ({ err, user, info }, { req, res, next }) {
  /** If there's an error, handle it. */
  if (err) {
    return res.error(err)
  }
  /** If a user couldn't be found, go to next. */
  if (!user) {
    let response = info.message || 'ACCOUNT_NOT_FOUND'
    return res.fail(404, response)
  }
  /** Try to create and send an auth token for the user. */
  try {
    let { privateKey, options } = maroon.config.jwt
    let authToken = jwt.sign({
      userId: user.id
    }, privateKey, options)
    return res.success({ token: authToken })
  } catch (error) {
    return res.error(error)
  }
}
