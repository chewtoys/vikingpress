/* global maroon */
const findUserHelper = require('./find-user')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../../models/user-model')

module.exports = function initializeGoogleAuthStrategy() {
    /** Assemble configuration info for Google auth strategy. */
    let googleStrategyConfig = {
        /** Pull clientID and clientSecret from maroon.config. */
        ...maroon.config.googleApiConfig,

        /** Set the callback URL. This will depend on your auth-router configuration. */
        callbackURL: `https://${maroon.config.webAddress}/api/auth/google/callback`,

        /** Tell Passport which API to call. */
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',

        /** Disable sessions because this app uses JSON web tokens instead. */
        session: false
    }

    /** Return Google auth strategy, to be passed to passport.use(). */
    return new GoogleStrategy(googleStrategyConfig, googleStrategyHandler)
}

/**
 * Handle the finding or creation of an account when someone signs in with Google
 * @param {object} googleProfile - Returned from Google API call
 * @param {function} done - From Passport
 */
async function googleStrategyHandler(accessToken, refreshToken, googleProfile, done) {

    /** Step #1: Try to find an existing user with the same Google Account ID */
    let userFromId = await findUserHelper({
        'auth.oauthId': googleProfile.id
    })
    if (userFromId) {
        /** If there is a user, return their information */
        return done(null, userFromId)
    }

    /** Step #2: Try to find a user with the same email address */
    let userFromEmail = await findUserHelper({
        email: googleProfile.emails[0].value
    })
    if (userFromEmail) {
        if (userFromEmail.auth.provider === 'Google') {
            /** If their auth provider is listed as Google, we don't know
             * what went wrong. Return an unknown error.
             */
            return done(null, null, {
                message: 'UNKNOWN_ERROR'
            })
        }
        else {
            /** Otherwise, if their auth provider isn't Google, return
             * an error indicating that the wrong auth provider was used.
             */
            return done(null, null, {
                message: 'USER_FOUND_BUT_WRONG_AUTH_PROVIDER'
            })
        }
    }

    /** Step #3: Create a new account using their Google profile info. */
    /** Assemble the new user's information. */
    let createNewUser = new User({
        name: {
            first: googleProfile.name.givenName,
            last: googleProfile.name.familyName,
            display: googleProfile.displayName
        },
        email: googleProfile.emails[0].value,
        username: googleProfile.emails[0].value,
        auth: {
            provider: 'Google',
            password: null,
            oauthId: googleProfile.id
        }
    })
    /** Save the new user's info to the database. */
    let newUser = await createNewUser.save()

    /** Save the new user. */
    return done(null, newUser)
}
