const appConfig = require('../../config')
const initializeMiddlewareAndRouters = require('./middleware')
const logger = require('../logger')()
const runStartupEvents = require('./events')

module.exports = async function({ app, config }) {
    /** Run startup events. */
    await runStartupEvents(app, config)
    await initializeMiddlewareAndRouters(app)

    app.listen(config.port, () => {
        logger.success(`VikingPress is running on port ${config.port}.`)
    })
}
