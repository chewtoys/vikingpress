/**
 * Initialize our modified logger.
 * @param {string} rootDir - /vikingpress directory
 * @param {number} loggerLevel - Consola logger level
 * @returns {object} - consola logger
 */
module.exports = (rootDir, loggerLevel) => {
    const consola = require('consola').create({
        level: loggerLevel
    })

    /** Modify consola.debug() to show the directory of the file being debugged. */
    let originalDebug = consola.debug
    consola.debug = (rawDirectory, ...rawMessage) => {
        let dir = rawDirectory.replace(`${rootDir}`, '')
        if (typeof rawMessage === 'undefined') {
            return originalDebug(rawDirectory)
        }
        let message = rawMessage.join()
        originalDebug(`${message}\n  at \x1b[34m${dir}\x1b[0m`)
    }

    return consola
}
