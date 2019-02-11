/* global maroon */
const bcrypt = require('bcrypt')
const findUserHelper = require('./find-user')
const LocalStrategy = require('passport-local')

module.exports = function initializeLocalAuthStrategy() {
    maroon.out.debug(__filename, 'Initializing local auth strategy')
    let localStrategyConfig = {
        usernameField: 'username',
        passwordField: 'password',
        session: false
    }
    return new LocalStrategy(localStrategyConfig, localStrategyHandler)
}

/**
 * Verification callback for local strategy
 * @param {string} username - Self-explanatory
 * @param {string} password - Self-explanatory
 * @param {function} done - From Passport
 */
async function localStrategyHandler(username, password, done) {
    let userSearchCriteria = [{
        username: username
    }, {
        email: username
    }]
    /** Use the given username or email address to locate a user in the database. */
    findUserHelper(userSearchCriteria).then(async(error, user) => {
        maroon.out.trace(user)
        if (error) {
            /** Pass errors to 'catch' block. */
            throw error
        }
        if (!user) {
            /** If there's no user, return an error messsage. */
            return done(null, null, {
                message: 'USER_NOT_FOUND'
            })
        }
        else {
            if (user.auth.provider !== 'Local') {
                /** If the user's auth provider isn't local, return
                 * an error indicating that the wrong auth provider was used.
                 */
                return done(null, null, {
                    message: 'USER_FOUND_BUT_WRONG_AUTH_PROVIDER'
                })
            }
            /** If there is a user, check their password. */
            let passwordIsCorrect = await bcrypt.compare(password, user.auth.password)
            if (passwordIsCorrect) {
                /** If the password is correct, return the user info. */
                return done(null, user)
            }
            else {
                /** If the password is incorrect, return an error. */
                return done(null, null, {
                    message: 'PASSWORD_INCORRECT'
                })
            }
        }
    }).catch(error => {
        /** If there's an error, self-loathingly pass it on. */
        return done(error)
    })
}
