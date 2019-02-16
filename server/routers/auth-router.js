const authActions = require('../actions/auth-actions')

/** Initialize authRouter. */
const authRouter = require('express').Router()

/** Local auth route */
authRouter.post('/local', authActions.local.authenticate)

/** Google auth routes */
authRouter.get('/google/start', authActions.google.start)
authRouter.get('/google/callback', authActions.google.callback)

/** Verify if an account exists */
authRouter.post('/verify', (req, res) => {
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
  fn: async function initializeAuthRouter (app) {
    app.use('/api/accounts', authRouter)
  }
}
