/** Configuration information that applies to each deployment of your app. */
module.exports = {
  /** List startup events in the order in which they should run. */
  events: [
    'db-connect',
    'nuxt-init'
  ],

  /** List router and middleware files in the order in which they should be used. */
  use: [
    'config-middleware',
    'util-middleware',
    'auth-middleware',
    'auth-router',
    'nuxt-router'
  ],

  /** Set view engine and views directory. */
  views: {
    engine: 'ejs',
    directory: './views'
  },

  /**
     * Helmet configuration. To disable, set to false. To enable with defaults, set to true.
     * @see {@link https://helmetjs.github.io/|Helmet documentation}
     */
  helmet: true,

  /**
     * Morgan configuration. To disable, set to false.
     * @see {@link https://github.com/expressjs/morgan#readme|Morgan documentation}
     */
  morgan: true
}
