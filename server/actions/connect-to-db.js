const db = require('../services/db')

module.exports = {
  /** Connect to database */
  fn: async function connectToDB () {
    return db.sequelize.sync()
  }
}
