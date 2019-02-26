const { Nuxt, Builder } = require('nuxt')

let nuxtConfig = require('../../../config/nuxt')
nuxtConfig.dev = maroon.config.env === 'DEVELOPMENT'

module.exports = {
  /** Initialize Nuxt. */
  fn: async function nuxtInit (app) {
    /** Initialize Nuxt */
    const nuxt = new Nuxt(nuxtConfig)

    /**
         * Build the Nuxt app if we're in a dev environment.
         * If we're in production, build Nuxt before running the app.
         */
    if (nuxtConfig.dev) {
      const builder = new Builder(nuxt)
      await builder.build()
    }

    /** Make Nuxt available globally. */
    app.use((req, res, next) => {
      res.nuxt = nuxt.render
      next()
    })
  }
}
