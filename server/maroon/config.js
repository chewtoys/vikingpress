const { join } = require('path')
const readDirectory = require('../helpers/read-directory')
const { keys, union } = require('lodash')

const pathToConfig = join(__dirname, '../../config')
const pathToPrivateConfig = join(__dirname, '../../config/private')

/**
 * Read the config/ and config/private/ directories.
 * @returns {array} - The config files to use
 */
function readConfigDirectories () {
  // Read directory /config
  let configDir = readDirectory(pathToConfig)

  // Read directory /config/private
  let privateConfigDir = readDirectory(pathToPrivateConfig)

  // Iterate through privateConfigDir.
  for (let privateDirIndex = 0; privateDirIndex < privateConfigDir.length; privateDirIndex++) {
    // Append 'private/' to elements of privateConfigDir to differentiate elements of the two arrays.
    privateConfigDir[privateDirIndex] = 'private/' + privateConfigDir[privateDirIndex]

    // Iterate through configDir.
    for (let configDirIndex = 0; configDirIndex < configDir.length; configDirIndex++) {
      // If a file with the same name exists in both configDir and privateConfigDir, use the one in privateConfigDir.
      if ('private/' + configDir[configDirIndex] === privateConfigDir[privateDirIndex]) {
        configDir[configDirIndex] = privateConfigDir[privateDirIndex]
      }
    }
  }

  // Return the file names in an array.
  return union(configDir, privateConfigDir)
}

/**
 * Parse config files
 * @returns {object} - All config information for the app
 */
module.exports = function parseConfigFiles () {
  let config = {}
  let configFileNames = readConfigDirectories()
  configFileNames.forEach(configFileName => {
    let configFile = require(`../../config/${configFileName}`)
    keys(configFile).forEach(configKey => {
      config[configKey] = configFile[configKey]
    })
  })
  return config
}
