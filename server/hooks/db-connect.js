const db = require('../services/db')

module.exports = {
  onEvent: 'initialize',
  /** Connect to database */
  fn: async function connectToDB () {
    try {
      await db.sequelize.sync()
    } catch (e) {
      e.message = `Unable to establish a database connection: ${e.message}`
      throw e
    }
  }
}
