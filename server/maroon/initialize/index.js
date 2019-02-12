/* global maroon */
const appConfig = require('../../config')
const initializeMiddlewareAndRouters = require('./middleware')
const logger = require('../logger')()
const runStartupEvents = require('./events')

module.exports = async function({ app }) {
    /** Run startup events. */
    await runStartupEvents(app)
    await initializeMiddlewareAndRouters(app)
    
    const port = maroon.config.port
    app.listen(port, () => {
        logger.success(`VikingPress is running on port ${port}.`)
    })
}
