/* global maroon */
const authActions = require('../actions/auth-actions')

/** Initialize authRouter. */
const authRouter = require('express').Router()

/** Local auth route */
authRouter.post('/local', authActions.local.authenticate)

/** Google auth routes */
authRouter.get('/google/start', authActions.google.start)
authRouter.get('/google/callback', authActions.google.callback)

module.exports = {
    /** Initialize auth router
     * @param {function} app - Express app function
     */
    fn: async function initializeAuthRouter(app) {
        app.use('/api/auth', authRouter)
    }
}
