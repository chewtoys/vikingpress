const accountActions = require('../actions/account')
const authActions = require('../actions/auth')

/** Initialize accountsRouter */
const accountsRouter = require('express').Router()

/** Local auth route */
accountsRouter.post('/local', authActions.local.authenticate)

/** Google auth routes */
accountsRouter.get('/google/start', authActions.google.start)
accountsRouter.get('/google/callback', authActions.google.callback)

/** Verify if an account exists */
accountsRouter.post('/find', accountActions.findAccount)

/** Begin password reset */
accountsRouter.post('/recovery/begin', accountActions.beginPasswordReset)

/** Find reset request */
accountsRouter.post('/recovery/find', accountActions.findResetRequest)

/** Reset password */
accountsRouter.post('/recovery/reset', accountActions.resetPassword)

module.exports = {
  /** Initialize auth router
     * @param {function} app - Express app function
     */
  fn: async function initializeAccountsRouter (app) {
    app.use('/api/accounts', accountsRouter)
  }
}
