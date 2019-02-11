/* global maroon */
const mongoose = require('mongoose')
const dbAddress = maroon.config.dbAddress

/** Connect to MongoDB */
module.exports = {
    fn: async function connectToDB(app) {
        try {
            await mongoose.connect(dbAddress, { useNewUrlParser: true })
        }
        catch (error) {
            throw error
        }
    }
}
