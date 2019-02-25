const db = require('../services/db')

module.exports = {
  /** Connect to database */
  fn: async function connectToDB () {
    try {
      await db.sequelize.sync()
    } catch (error) {
      throw error
    }
  }
}
