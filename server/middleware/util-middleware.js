/* global maroon */
const appConfig = require('../config.js')
const getUserFromReq = require('../helpers/get-user-from-req')
const morgan = require('morgan')
const morganDefault = ':req[x-real-ip] :remote-user \x1b[36m:method :url\x1b[0m HTTP/:http-version :status :res[content-length] - :response-time ms'

module.exports = {
    fn: async function maroonUtil(app) {
        /** Set up Morgan, for logging. */
        let morganConfig = appConfig.morgan || true
        if (morganConfig === true) {
            /** Use Morgan with defaults. */
            app.use(morgan(morganDefault))
        }
        else if (morganConfig !== false) {
            /** Pass custom config options to Morgan. */
            app.use(morgan(morganConfig))
        }

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
