const appConfig = require('../config.js')
const morgan = require('morgan')
const morganDefault = ':req[x-real-ip] :remote-user \x1b[36m:method :url\x1b[0m HTTP/:http-version :status :res[content-length] - :response-time ms'

module.exports = {
  fn: async function maroonUtil (app) {
    /** Set up Morgan, for logging. */
    let morganConfig = appConfig.morgan || true
    if (morganConfig === true) {
      /** Use Morgan with defaults. */
      app.use(morgan(morganDefault))
    } else if (morganConfig !== false) {
      /** Pass custom config options to Morgan. */
      app.use(morgan(morganConfig))
    }
  }
}
