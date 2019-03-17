process.env.NODE_ENV = 'production'

const MaroonServer = require('./server/maroon/server')

global.maroon = new MaroonServer()

const readDirectory = require('./server/helpers/read-directory')
const { join } = require('path')

// Get path to hooks directory.
const pathToHooks = join(__dirname, './server/hooks')

/**
 * Run startup events, in the order specified in /server/config.js.
 * @param {function} app - Express app function
 */
async function runHooks (app) {
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
  if (onEvent === 'build') {
    await fn()
  }
}

runHooks()
