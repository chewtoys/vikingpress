const { isObject, keys, last } = require('lodash')

/**
 * Detect the HTTP method in an expression like:
 * `get baz`    or     `get /foo/baz`
 *
 * Based on a function from Sails.js which serves the same purpose.
 * @author Mike McNeil
 * @author Scott Gress
 * @see {@link https://github.com/balderdashy/sails/blob/master/lib/util/detect-verb.js|Original Code from Sails.js}
 */
function getMethodAndPathOfRoute (haystack) {
  // Convert original string to lowercase.
  // Why is it called a haystack? I don't know, ask the Sails people.
  haystack = haystack.toLowerCase()

  //   Extract the method, if applicable, from the haystack.
  let methodExp = /^\s*(all|get|post|put|delete|trace|options|connect|patch|head)+/i
  let methodSpecified = last(haystack.match(methodExp) || []) || ''
  methodSpecified = methodSpecified

  // If a method was specified, eliminate the method from the original string
  if (methodSpecified) {
    haystack = haystack.replace(methodExp, '').trim()
  } else {
    haystack = haystack.trim()
  }

  //   Return the path and method of the route.
  return {
    method: methodSpecified || '',
    path: haystack || ''
  }
}

/**
 * Determine whether the object is a route definition or the parent of other routes.
 * @param {string} route
 */
function getTypeOfRoute (route) {
  if (isObject(route)) {
    if (route.action || route.redirect || route.response) {
      return 'route'
    } else {
      return 'parent'
    }
  }
  throw new TypeError(`Route must be an object. Received ${typeof route}.`)
}

/**
 * Parse a single route definition.
 * @param {object} routes - Route definition
 * @param {string} routeName - The current object's method and path, unparsed
 * @param {object} parent - The parent object's method and path, parsed
 * @param {array} routeList - Master list of routes
 */
function parseSingleRoute (routes, routeName, parent, routeList) {
  // Parse out the method and path of the current route.
  let parsedExp = getMethodAndPathOfRoute(routeName)

  // Combine information from the current route and its parents to produce the correct method and path.
  let method = parsedExp.method || parent.method
  let path = parent.path + parsedExp.path

  // Determine whether the object is a route definition or the parent of other routes.
  let type = getTypeOfRoute(routes[routeName])

  // If the object is a route definition, add it to the routeList.
  if (type === 'route') {
    // Get route's handler.
    let handler = routes[routeName]
    // Push to routeList.
    routeList.push({
      method,
      path,
      handler
    })
  }
  // If the object is a parent of other routes, parse the object.
  else if (type === 'parent') {
    parseMultipleRoutes(routes[routeName], {
      method,
      path
    }, routeList)
  }
  // If the object is neither a route definition nor a parent, throw an error.
  else {
    throw new Error('Invalid route object', routes[routeName])
  }
}

/**
 *
 * @param {object} routes - Route definition
 * @param {object=} parent - The parent object's method and path
 * @param {array=} routeList - Master list of routes
 */
function parseMultipleRoutes (routes, parent, routeList) {
  // If this is the root object, bootstrap the parent object and routeList array.
  if (!parent) {
    parent = {
      method: '',
      path: ''
    }
    routeList = []
  }
  // Parse each route.
  keys(routes).forEach(routeName => parseSingleRoute(routes, routeName, parent, routeList))
  // Return the complete route list.
  return routeList
}

module.exports = parseMultipleRoutes(maroon.config.routes)
