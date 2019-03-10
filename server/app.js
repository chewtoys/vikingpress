// Bootstrap the Express app with basic middleware and other functionality.

const bodyParser = require('body-parser')
const express = require('express')
const helmet = require('helmet')
const { join } = require('path')
const morgan = require('morgan')

const app = express()

// Trust proxy.
app.enable('trust proxy')

// Set views directory.
const viewsDirectory = join(__dirname, './views')
app.set('views', viewsDirectory)

// Set view engine.
app.set('view engine', 'ejs')

// Add basic site information to app.locals.
app.locals = {
  site: {
    name: maroon.config.title,
    url: `https://${maroon.config.webAddress}`
  }
}

// Use bodyParser.
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Use Helmet.
app.use(helmet())

// Use Morgan.
app.use(morgan('combined'))

// Serve static files in the /content directory.
const staticDirectory = join(__dirname, '../../content')
app.use(express.static(staticDirectory))

module.exports = app
