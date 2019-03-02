const { Nuxt, Builder } = require('nuxt')

let nuxtConfig = require('../../../config/nuxt')
nuxtConfig.dev = maroon.config.env === 'development'

module.exports = {
  /** Initialize Nuxt. */
  fn: async function nuxtInit (app) {
    /** Initialize Nuxt */
    const nuxt = new Nuxt(nuxtConfig)

    /**
     * Build the Nuxt app.
     */
    const builder = new Builder(nuxt)
    await builder.build()

    /** Make Nuxt available globally. */
    app.use((req, res, next) => {
      res.nuxt = nuxt.render
      next()
    })
  }
}
