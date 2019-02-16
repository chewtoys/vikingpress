/* global maroon */
const mongoose = require('mongoose')
const dbAddress = maroon.config.dbAddress

module.exports = {
  /** Connect to MongoDB */
  fn: async function connectToDB () {
    try {
      await mongoose.connect(dbAddress, { useNewUrlParser: true })
    } catch (error) {
      throw error
    }
  }
}
