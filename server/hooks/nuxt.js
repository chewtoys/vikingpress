const { Nuxt, Builder } = require('nuxt')

let nuxtConfig = maroon.config.nuxt
nuxtConfig.dev = maroon.env === 'development'

// Initialize Nuxt
const nuxt = new Nuxt(nuxtConfig)

module.exports = [{
  onEvent: 'build',
  /** Build the Nuxt app. */
  fn: async function buildNuxt () {
    const builder = new Builder(nuxt)
    await builder.build()
  }
}, {
  onEvent: 'initialize',
  /** Make Nuxt available globally. */
  fn: async function nuxtInit () {
    await nuxt.ready()
    maroon.app.use((req, res, next) => {
      res.nuxt = nuxt.render
      next()
    })
  }
}]
