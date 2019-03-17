const routes = require('./parse-routes')

let nonexistentActions = []

/**
 * Get the route handler.
 * @param {object} handler - The given specification for the route handler
 */
function getRouteHandler (handler) {
  if (handler.action) {
    // If the handler is an action, try requiring the handler from the actions directory.
    try {
      return require(`../../actions/${handler.action}`)
    }
    // Handle errors.
    catch (e) {
      // If the module doesn't exist, handle that specific error.
      if (e.code === 'MODULE_NOT_FOUND') {
        // Add it to the list of non-existent modules.
        nonexistentActions.push(handler.action)
        // Return a temporary handler function.
        return function (req, res) {
          res.error(501, `The requested endpoint ${req.originalUrl} has not yet been implemented.`)
        }
      }
      // Throw all other errors.
      else {
        throw e
      }
    }
  }
}

module.exports = function initializeRoutes () {
  // Iterate through the list of routes.
  for (let routeIndex = 0; routeIndex < routes.length; routeIndex++) {
    // Destructure the method, path, and handler from the route definition.
    let { method, path, handler } = routes[routeIndex]
    // Use the handler definition to get the route's handler function.
    let routeHandler = getRouteHandler(handler)
    // Use the route.
    maroon.app[method](path, routeHandler)
  }

  // If the routes file references nonexistent actions, log a warning to the console.
  if (nonexistentActions.length > 0) {
    maroon.out.warn(`The following actions are undefined: ${nonexistentActions.join(', ')}`)
  }
}
