const middlewareList = require('../../config.js').use
const { join } = require('path')
const logger = require('../logger')()
const readDir = require('../../helpers/read-dir')
const findFileAndRemove = require('../../helpers/find-file-and-remove')

let pathToServerDir = join(__dirname, '../../')
let pathToMiddleware = join(pathToServerDir, 'middleware')
let pathToRouters = join(pathToServerDir, 'routers')

module.exports = async function initializeMiddlewareAndRouters(app, config) {
    let [middleware, routers] = await Promise.all([readDir(pathToMiddleware), readDir(pathToRouters)])
    console.dir([middleware, routers])

    for (let i = 0; i < middlewareList.length; i++) {
        let fileName = `${middlewareList[i]}.js`
        let middlewareOrRouter = await useMiddlewareOrRouter('middleware', middleware, fileName)
        if (middlewareOrRouter === null) {
            middlewareOrRouter = await useMiddlewareOrRouter('routers', routers, fileName)
            if (middlewareOrRouter === null) {
                return logger.warn(`Couldn't find '${middlewareList[i]}'`)
            }
            else {
                await middlewareOrRouter(app)
            }
        }
        else {
            await middlewareOrRouter(app)
        }
    }
}

async function useMiddlewareOrRouter(type, list, fileName) {
    if (type === 'routers') {
        fileName = fileName.replace('.js', '-router.js')
    }
    let foundFile = await findFileAndRemove(list, fileName)
    if (!foundFile) {
        return null
    }
    logger.info(`Initializing ${type} '${fileName}'`)
    let pathToFile = join(__dirname, '../../', type, '/', fileName)
    return require(pathToFile)
}
