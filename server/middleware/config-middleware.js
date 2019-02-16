/* global maroon */
const appConfig = require('../config.js')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const { join } = require('path')

module.exports = {
  fn: async function configure (app) {
    /** Set view engine. */
    app.set('view engine', appConfig.views.engine)

    /** Set views directory. */
    const viewsDirectory = join(__dirname, '..', appConfig.views.directory)
    app.set('views', viewsDirectory)

    /** Set up Helmet. */
    let helmetConfig = appConfig.helmet || true
    if (helmetConfig === true) {
      /** Use Helmet with defaults. */
      app.use(helmet())
    } else if (helmetConfig !== false) {
      /** Pass custom config options to Helmet. */
      app.use(helmet(appConfig.helmet))
    }

    /** Add basic site information to app.locals */
    app.locals = {
      siteTitle: maroon.config.title,
      siteUrl: `https://${maroon.config.webAddress}`
    }

    /** Use bodyParser. */
    app.use(bodyParser.urlencoded({ extended: true }))
  }
}
