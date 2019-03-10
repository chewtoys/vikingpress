const config = require('./config')()
const logger = require('./logger.js')(null, 5)
const EventEmitter = require('events')

module.exports = class MaroonServer {
  constructor () {
    console.clear()
    this.config = config
    this.env = process.env.NODE_ENV || 'development'
    this.out = logger
    this.events = new EventEmitter()
    this.initialize = async () => {
      this.app = require('../app')
      await require('./initialize')(this)
    }
  }
}
