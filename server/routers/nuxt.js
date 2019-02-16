const renderNuxt = require('../actions/nuxt/render')

module.exports = {
  /** Initialize Nuxt router
     * @param {function} app - Express app function
     */
  fn: async function initializeNuxtRouter (app) {
    app.get('*', renderNuxt)
  }
}
