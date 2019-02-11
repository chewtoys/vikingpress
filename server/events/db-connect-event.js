const mongoose = require('mongoose')

/** Connect to MongoDB */
module.exports = (app, config) => {
    try {
        return mongoose.connect(config.dbAddress, { useNewUrlParser: true })
    }
    catch (error) {
        throw error
    }
}
