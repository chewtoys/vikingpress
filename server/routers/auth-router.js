/* global maroon */
maroon.out.debug(__filename, 'Setting up auth router')
const authActions = require('../actions/auth-actions')
const authRouter = require('express').Router()

/* Local auth route */
authRouter.post('/local', authActions.local.authenticate)

/* Google auth routes */
authRouter.get('/google/start', authActions.google.start)
authRouter.get('/google/callback', authActions.google.callback)

/** Initialize auth router
 * @param {function} app - Express app function
 */
module.exports = {
    fn: async function initializeAuthRouter (app) {
        app.use('/api/auth', authRouter)
    }
}
