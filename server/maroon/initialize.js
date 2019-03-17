const initializeRoutes = require('./routes')
const registerHooks = require('./hooks')

module.exports = async function() {
  // Register hooks and run the ones that need to be run on startup.
  await registerHooks()
  // Initialize routes.
  await initializeRoutes()
  maroon.app.all('/api/*', (req, res) => {
    res.error(404, `The requested endpoint ${req.originalUrl} does not exist.`)
  })

  // Start listening on the specified port.
  const port = maroon.config.port
  maroon.app.listen(port, () => {
    maroon.out.success('Welcome to VikingPress!')
    maroon.out.debug(`Environment: ${maroon.env}`)
    maroon.out.debug(`Port:        ${maroon.config.port}`)
  })
}
