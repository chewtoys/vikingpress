/* global maroon */
const initializePassport = require('../services/auth/passport')
const jwt = require('jsonwebtoken')
const User = require('../models/user-model')

module.exports = {
  fn: async function authenticationMiddleware (app) {
    /** Initialize Passport.js. */
    initializePassport(app)

    /** Add functions to verify authentication. */
    app.use((req, res, next) => {
      req.maroon = {}
      /** Check if the request is authenticated. */
      req.maroon.isAuthenticated = async () => {
        try {
          let isAuthenticated = await getUserFromReq(req, false)
          if (isAuthenticated) {
            return true
          }
          return false
        } catch (error) {
          return false
        }
      }
      /** Get user from request. */
      req.maroon.getUser = async () => {
        try {
          let user = await getUserFromReq(req, true)
          if (user) {
            return user
          }
          return null
        } catch (error) {
          return null
        }
      }

      next()
    })
  }
}

/**
 * Get user from Express request.
 * @param {object} req - Express request
 * @param {boolean} [returnAll = true] - Return entire user object
 */
async function getUserFromReq (req, returnAll) {
  let all = returnAll || true

  /** Get JWT information from config. */
  let { publicKey, options } = maroon.config.jwt
  /** Extract Bearer token from request headers. */
  let rawToken = req.headers['authorization'].split(' ')[1]
  /** Verify the token. */
  let verifiedToken = jwt.verify(rawToken, publicKey, options)

  if (all) {
  /** If all is true, the entire user object will be returned. */
    let user = await User.findById(verifiedToken.userId)
    if (user) {
      return user
    }
    return null
  } else {
    /** Otherwise, return true/false (to indicate whether the user exists) is returned. */
    let count = await User.findById(verifiedToken.userId).countDocuments()
    if (count > 0) {
      return true
    }
    return false
  }
}
