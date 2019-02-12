/* global maroon */
const renderNuxt = require('../actions/render-nuxt')

module.exports = {
    /** Initialize Nuxt router
     * @param {function} app - Express app function
     */
    fn: async function initializeNuxtRouter(app) {
        app.use('*', renderNuxt)
    }
}
