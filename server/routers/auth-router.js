/* global maroon */
maroon.out.debug(__filename, 'Setting up auth router')
const authActions = require('../actions/auth-actions')
const passport = require('passport')
const passportSetup = require('../services/auth-service/passport')
const authRouter = require('express').Router()

/* Auth routes */
authRouter.post('/local', authActions.local.authenticate)

/** Initialize auth router
 * @param {function} app - Express app function
 */
module.exports = async function(app) {
    app.use(passport.initialize())
    passportSetup(passport)

    app.use('/api/auth', authRouter)
}
