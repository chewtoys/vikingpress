const findUserByUsername = require('../../helpers/find-user')

module.exports = async (req, res) => {
  /** Extract username from request body. */
  let { username } = req.body

  try {
    /** Use the given ID to retrieve the user info from the database. */
    let user = await findUserByUsername(username, ['id', 'title', 'firstName', 'lastName', 'authProvider', 'permissionLevel'])

    /** Compile and send the user information. */
    let userInfo = {
      id: user.id,
      welcomeMessage: constructWelcomeMessage(req, user),
      authProvider: user.authProvider,
      username
    }

    maroon.out.info(`Someone wanted to sign in, and here's their account info: `)
    maroon.out.info(userInfo)

    res.send(userInfo)
  } catch (e) {
    maroon.out.warn(e)
    /** If there's no user found, find a dark corner to cry in. */
    return res.status(404).send('User not found. Sad!')
  }
}

/**
 * Use request information and the user record to construct a welcome message for users when they sign in.
 */
function constructWelcomeMessage (req, user) {
  /** @todo Use the request information to determine whether to trust the user request. */
  let trustReq = true

  let name

  /** If the request is trusted, include the user's name in the welcome message. */
  if (trustReq) {
    /** If the user is a teacher and their honorific is set, refer to them by their last name. */
    if (user.permissionLevel === 6 && user.title) {
      name = `${user.title} ${user.lastName}`
    }
    /** Otherwise, refer to the user by their first name. */
    else {
      name = user.firstName
    }
  }

  /** If we found a name, return it as part of the welcome message. */
  if (name) {
    return `Welcome, ${name}!`
  }
  /** Otherwise, return a generic welcome message. */
  else {
    return 'Welcome!'
  }
}
