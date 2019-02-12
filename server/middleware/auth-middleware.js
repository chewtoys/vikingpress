const getUserFromReq = require('../helpers/get-user-from-req')
const initializePassport = require('../services/auth-service/passport')

module.exports = {
    fn: async function authenticationMiddleware(app) {
        /** Initialize Passport.js. */
        initializePassport(app)

        /** Add functions to verify authentication. */
        app.use((req, res, next) => {
            req.maroon = {}
            /** Check if the request is authenticated. */
            req.maroon.isAuthenticated = async() => {
                try {
                    let isAuthenticated = await getUserFromReq(req, false)
                    if (isAuthenticated) {
                        return true
                    }
                    return false
                }
                catch (error) {
                    return false
                }
            }
            /** Get user from request. */
            req.maroon.getUser = async() => {
                try {
                    let user = await getUserFromReq(req, true)
                    if (user) {
                        return user
                    }
                    return null
                }
                catch (error) {
                    return null
                }
            }

            next()
        })
    }
}
