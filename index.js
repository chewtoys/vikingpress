const MaroonServer = require('./server/maroon/server')
const config = require('./config/app')

global.maroon = new MaroonServer(config)

/* global maroon */

try {
    maroon.initialize()
}
catch (error) {
    maroon.out.error(error)
}

process.on('uncaughtException', error => {
    maroon.out.error(error)
})
process.on('unhandledRejection', error => {
    maroon.out.error(error)
})
