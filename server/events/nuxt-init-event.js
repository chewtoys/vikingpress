/* global maroon */
const config = maroon.config
const { Nuxt, Builder } = require('nuxt')

module.exports = {
    /** Initialize Nuxt. */
    fn: async function nuxtInit() {
        /** Initialize Nuxt */
        const nuxt = new Nuxt(config.nuxt)

        /** 
         * Build the Nuxt app if we're in a dev environment.
         * If we're in production, build Nuxt before running the app. 
         */
        if (config.env === 'DEVELOPMENT') {
            nuxt.dev = true
            const builder = new Builder(nuxt)
            await builder.build()
        }

        /** Make Nuxt available globally. */
        maroon.nuxt = nuxt
    }
}
