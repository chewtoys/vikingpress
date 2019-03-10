const { Nuxt, Builder } = require('nuxt')

let nuxtConfig = maroon.config.nuxt
nuxtConfig.dev = maroon.env === 'development'

// Initialize Nuxt
const nuxt = new Nuxt(nuxtConfig)

module.exports = [{
  onEvent: 'initialize',
  /** Make Nuxt available globally. */
  fn: async function nuxtInit() {
    maroon.app.use((req, res, next) => {
      res.nuxt = nuxt.render
      next()
    })
  }
}, {
  onEvent: 'build',
  /** Build the Nuxt app. */
  fn: async function buildNuxt() {
    const builder = new Builder(nuxt)
    await builder.build()
  }
}]
