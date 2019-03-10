/**
 * Initialize our modified logger.
 * @param {string} rootDir - /vikingpress directory
 * @param {number} loggerLevel - Consola logger level
 * @returns {object} - consola logger
 */
module.exports = (rootDir, loggerLevel) => {
  return require('consola').create({
    level: loggerLevel
  })
}
