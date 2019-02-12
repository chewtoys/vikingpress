/* global maroon */
const completeList = require('../../config.js').use
const { join } = require('path')

/** Get path to middleware and router directories. */
const pathToServerDir = join(__dirname, '../../')
const pathToMiddleware = join(pathToServerDir, 'middleware')
const pathToRouters = join(pathToServerDir, 'routers')

/** 
 * Initialize middleware and routers, in the order specified in /server/config.js.
 * @param {function} app - Express app function
 */
module.exports = async function initializeMiddlewareAndRouters(app) {
    /** Iterate through completeList, the list of routers and middleware in /server/config.js. */
    for (let i = 0; i < completeList.length; i++) {
        await initializeSingleMiddleware(completeList[i], app)
    }
}

async function initializeSingleMiddleware(middlewareName, app) {
    /** Announce that we're running the file. */
    maroon.out.info(`Initializing ${middlewareName.replace('-',' ')}`)
    let file
    /** If the file is named as a middleware, get it from the middleware directory. */
    if (middlewareName.includes('-middleware')) {
        try {
            /** Try requiring the file from the middleware directory. */
            file = require(`${pathToMiddleware}/${middlewareName}`)
            file.type = 'middleware'
        }
        catch (error) {
            /** If we can't find the middleware file, throw an error. */
            maroon.out.error(`Unable to use middleware file '${middlewareName}'.`)
            throw error
        }
    }
    /** If the file is named as a router, get it from the routers directory. */
    else if (middlewareName.includes('-router')) {
        try {
            /** Try requiring the file from the routers directory. */
            file = require(`${pathToRouters}/${middlewareName}`)
            file.type = 'router'
        }
        catch (error) {
            /** If we can't find the router file, throw an error. */
            maroon.out.error(`Unable to use router file '${middlewareName}'.`)
            throw error
        }
    }
    else {
        /** If the file isn't properly named, throw an error. */
        throw new Error(`Couldn't get '${middlewareName}' because name in /server/config.js is missing '-middleware' or '-router' suffix.`)
    }
    /** Run the file. Finally. */
    return await file.fn(app)
}
