const { User, Sequelize } = require('../services/db')
const { Op } = Sequelize
/**
 * Search for a certain user
 * @param {object, array} username - Username or email address to search for in database
 * @param {string} [attributes = id authProvider] - What information to return from DB call
 */
module.exports = async function findUserByUsername (username, attributes) {
  return User.findOne({
    where: {
      [Op.or]: [{ username: username }, { email: username }]
    },
    attributes: attributes || ['id', 'authProvider']
  })
}
