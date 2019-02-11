const app = require('express')()
const initialize = require('./initialize')
const logger = require('./logger.js')(null, 5)

module.exports = class MaroonServer {
    constructor(config) {
        this.app = app
        this.config = config
        this.out = logger
        this.initialize = async() => {
            await initialize(this)
        }
    }
}
