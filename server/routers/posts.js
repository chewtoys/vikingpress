const postsActions = require('../actions/posts')

/** Initialize postsRouter */
const postsRouter = require('express').Router()

/** Local auth route */
postsRouter.get('/', postsActions.getSinglePost)

module.exports = {
  /** Initialize auth router
     * @param {function} app - Express app function
     */
  fn: async function initializePostsRouter (app) {
    app.use('/api/posts', postsRouter)
  }
}
