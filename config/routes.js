module.exports.routes = {
  // API routes
  '/api': {
    // Accounts API routes
    '/accounts': {
      get: { action: 'accounts/get-index' },
      post: { action: 'accounts/create' },
      '/:id': {
        get: { action: 'accounts/get' },
        put: { action: 'accounts/update' },
        delete: { action: 'accounts/delete' }
      },
      '/resets': {
        post: { action: 'accounts/create-reset-request' },
        '/:id': {
          get: { action: 'accounts/get-reset-request' },
          post: { action: 'accounts/reset-password' }
        }
      },
      'post /sign-in-local': { action: 'accounts/sign-in/local' },
      'get /sign-in-google': { action: 'accounts/sign-in/google' },
      'post /sign-in-google': { action: 'accounts/sign-in/google-callback' }
    },
    // Comments API routes
    '/comments': {
      get: { action: 'comments/get-index' },
      post: { action: 'comments/create' },
      '/:id': {
        get: { action: 'comments/get' },
        put: { action: 'comments/update' },
        delete: { action: 'comments/delete' }
      }
    },
    // Media API routes
    '/media': {
      get: { action: 'media/get-index' },
      post: { action: 'media/create' },
      '/:id': {
        get: { action: 'media/get' },
        put: { action: 'media/update' },
        delete: { action: 'media/delete' }
      }
    },
    // Posts API routes
    '/posts': {
      get: { action: 'posts/get-index' },
      post: { action: 'posts/create' },
      '/:id': {
        get: { action: 'posts/get' },
        put: { action: 'posts/update' },
        delete: { action: 'posts/delete' }
      }
    },
    '/frontend': {
      '/homepage': {
        get: { action: 'get-homepage' },
        put: { action: 'update-homepage' }
      },
      'get /post': { action: 'render-post' }
    }
  },
  'get *': { action: 'render-nuxt' }
}
