const readDirectory = require('../helpers/read-directory')
const { join } = require('path')

// Get path to hooks directory.
const pathToHooks = join(__dirname, '../hooks')

/**
 * Run startup events, in the order specified in /server/config.js.
 * @param {function} app - Express app function
 */
module.exports = async function runHooks (app) {
  // Read the hooks directory
  let hookList = readDirectory(pathToHooks)

  // Iterate through eventList, the list of events in /server/config.js.
  for (let i = 0; i < hookList.length; i++) {
    await getHook(hookList[i])
  }
}

/**
 * Use the file name to fetch the hook from the hooks directory.
 * @param {string} fileName - The name of the hook file
 */
async function getHook (fileName) {
  // Try requiring the file from the hooks directory.
  let file = require(`${pathToHooks}/${fileName}`)

  // If the file exports an array, run each of the array elements through registerHook.
  if (Array.isArray(file)) {
    for (let hookIndex = 0; hookIndex < file.length; hookIndex++) {
      await registerHook(file[hookIndex])
    }
  }
  // Otherwise, just register the one hook.
  else {
    await registerHook(file)
  }
}

/** Register the hook. */
async function registerHook ({ onEvent, fn }) {
  // Otherwise, register it to run when the event emitter calls it.
  if (onEvent !== 'build' && onEvent !== 'initialize') {
    maroon.events.on(onEvent, fn)
  }
  // If the hook is to be run when building or initializing the server, await it now.
  else if ((onEvent === 'build' && maroon.env === 'development') || onEvent === 'initialize') {
    await fn()
  }
}
