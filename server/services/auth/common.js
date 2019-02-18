const User = require('../../models/user-model')

/**
 * Search for a certain user
 * @param {object, array} criteria - Criteria by which to search for a user; gets passed to Mongoose
 * @param {string} [getInfo = _id auth.provider] - What information to return from DB call
 * @param {boolean} [useAnd = false] - TRUE for AND; FALSE for OR (if searching by multiple criteria)
 */
module.exports = async function findUserHelper (criteria, getInfo, useAnd) {
  let infoToReturn = getInfo || '_id auth.provider'
  if (Array.isArray(criteria)) {
    /** If criteria is an array, search using multiple conditions. */
    let and = useAnd || false
    if (and) {
      /** Return result if all conditions are met. */
      return findUser('and', criteria, infoToReturn)
    } else {
      /** Return result if one of the conditions is met. */
      return findUser('or', criteria, infoToReturn)
    }
  } else if (typeof criteria === 'object') {
    /** If criteria is an object, search using one condition. */
    return findUser('where', criteria, infoToReturn)
  } else {
    /** If criteria isn't an array or object, return a TypeError. */
    return new TypeError(`User search criteria must be an array or object. Received type ${typeof criteria}.`)
  }
}

/**
 * Find a user in the databse
 * @param {string} [queryType = where] - How to apply criteria, e.g. and, or, where
 * @param {object} criteria - What information to search for in the database
 * @param {string} [infoToReturn = _id auth.provider] - What info to retrieve from the database
 */
async function findUser (queryType, criteria, infoToReturn) {
  let query = queryType || 'where'
  return User.where()[query](criteria).findOne(null, infoToReturn, async function (error, user) {
    if (error) {
      throw error
    } else if (!user) {
      return null
    } else {
      return user
    }
  })
}
