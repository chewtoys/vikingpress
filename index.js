const MaroonServer = require('./server/maroon/server')

global.maroon = new MaroonServer()

try {
  maroon.initialize()
} catch (error) {
  maroon.out.error(error)
}

process.on('uncaughtException', error => {
  maroon.out.error(error)
})
process.on('unhandledRejection', error => {
  maroon.out.error(error)
})
