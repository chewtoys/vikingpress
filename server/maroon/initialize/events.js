/* global maroon */
const eventList = require('../../config.js').events
const { join } = require('path')

/** Get path to events directory. */
const pathToEvents = join(__dirname, '../../events')

/**
 * Run startup events, in the order specified in /server/config.js.
 * @param {function} app - Express app function
 */
module.exports = async function runEvents(app) {
    /** Iterate through eventList, the list of events in /server/config.js. */
    for (let i = 0; i < eventList.length; i++) {
        await runSingleEvent(eventList[i], app)
    }
}

async function runSingleEvent(eventName, app) {
    /** Announce that we're running the file. */
    maroon.out.info(`Running ${eventName.replace('-',' ')} event`)
    let file
    try {
        /** Try requiring the file from the events directory. */
        file = require(`${pathToEvents}/${eventName}-event`)
    }
    catch (error) {
        /** If we can't find the event file, throw an error. */
        maroon.out.error(`Unable to run event file '${eventName}'.`)
        throw error
    }
    /** Run the file. */
    return await file.fn(app)
}
