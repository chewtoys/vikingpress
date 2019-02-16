const authActions = require('../actions/auth')

/** Initialize accountsRouter. */
const accountsRouter = require('express').Router()

/** Local auth route */
accountsRouter.post('/local', authActions.local.authenticate)

/** Google auth routes */
accountsRouter.get('/google/start', authActions.google.start)
accountsRouter.get('/google/callback', authActions.google.callback)

/** Verify if an account exists */
accountsRouter.post('/verify', (req, res) => {
  /** Example account here for debugging on frontend.
     * @todo Replace this with an actual database call.
     */
  let account = {
    exists: true,
    firstName: 'Jane',
    lastName: 'Doe',
    username: 'doej',
    provider: 'Local'
  }
  res.send(account)
})

module.exports = {
  /** Initialize auth router
     * @param {function} app - Express app function
     */
  fn: async function initializeAccountsRouter (app) {
    app.use('/api/accounts', accountsRouter)
  }
}
