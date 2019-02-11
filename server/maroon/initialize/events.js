const { events } = require('../../config.js')
const findFileAndRemove = require('../../helpers/find-file-and-remove')
const { join } = require('path')
const logger = require('../logger')()
const pathToEventsDir = join(__dirname, '../../events')
const readDir = require('../../helpers/read-dir')

/**
 * Run startup events.
 * @param {function} app - Express app function
 * @param {object} config - Deployment config info
 */
module.exports = async function runStartupEvents(app, config) {
    let eventsDir = await readDir(pathToEventsDir)

    for (let i = 0; i < events.length; i++) {
        let eventFileName = await findFileAndRemove(eventsDir, i)
        if (!eventFileName) {
            return logger.warn(`Could not find event '${events[i]}'`)
        }

        logger.info(`Running startup event '${events[i]}'`)

        let pathToEventFile = join(__dirname, '../../events', eventFileName)
        let eventFile = require(pathToEventFile)
        await eventFile(app, config)
    }
}
