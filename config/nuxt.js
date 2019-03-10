const { join } = require('path')
const pathToClient = join(__dirname, '../client')

module.exports.nuxt = {
  mode: 'universal',

  // Path to client directory
  srcDir: pathToClient,

  // Information for <head> section
  head: {
    title: 'The Viking Voice',
    meta: [{
      name: 'robots',
      content: 'noindex'
    }, {
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      name: 'generator',
      content: 'VikingPress'
    }
    ],
    link: [
      /* { We'll use this in future.
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }, */
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Merriweather:400,700'
      },
      {
        rel: 'stylesheet',
        href: '/fonts/public-sans.css'
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.7.2/css/all.css',
        integrity: 'sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr',
        crossorigin: 'anonymous'
      }
    ]
  },

  /**
   * Global CSS
   */
  css: [
    { src: '~/assets/bulma-overrides.scss', lang: 'scss' }
  ],

  plugins: [
    { src: '~/plugins/vuex-persist', ssr: false }
  ],

  modules: [
    '@nuxtjs/axios',
    'nuxt-buefy'
  ],

  buefy: {
    css: false,
    materialDesignIcons: false,
    defaultIconPack: 'fas'
  },

  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: `https://beta.nsmsvikingvoice.org`,
    requestInterceptor: (config, { store }) => {
      config.headers.common['X-Request-Origin'] = 'VikingPress Client'
      if (store.state.accounts.user.token) {
        config.headers.common['Authorization'] = `Bearer ${store.state.accounts.user.token}`
      }
      return config
    }
  },

  // Build configuration
  build: {
    // You can extend webpack config here.
    extend (config, ctx) {

    }
  }
}
