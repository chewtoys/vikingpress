/* global maroon */
maroon.out.debug(__filename, 'Set up local auth action')
const jwt = require('jsonwebtoken')
const passport = require('passport')

module.exports.authenticate = (req, res, next) => {
    passport.authenticate('local', async function authenticationHandler(user, err, info) {
        if (err) {
            return next(err)
        }
        if (!user) {
            return next('ACCOUNT_NOT_FOUND')
        }
        req.login(user, {
            session: false
        }, (error) => {
            if (error) {
                return next(error)
            }
            let authToken = jwt.sign({
                user: user._id
            }, maroon.config.keys.private)
            res.send({ token: authToken })
        })
    })(req, res, next)
}
