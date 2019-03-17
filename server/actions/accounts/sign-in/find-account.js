const findUserByUsername = require('../../../helpers/find-user')

module.exports = async(req, res) => {
  maroon.out.debug(req.headers)
  try {
  let { username } = req.body
  if (!username) {
    return res.fail(400, `Enter an email address or username.`)
  }
    // Use the given ID to retrieve the user info from the database.
    let user = await findUserByUsername(username, ['id', 'title', 'firstName', 'lastName', 'authProvider', 'permissionLevel'])

    if (!user) {
      return res.fail(404, `We couldn't find that account.`)
    }

    // Compile and send the user information.
    let userInfo = {
      id: user.id,
      welcomeMessage: constructWelcomeMessage(req, user),
      authProvider: user.authProvider,
      username
    }

    res.success(userInfo)
  }
  catch (e) {
    // If an unknown error occurs, find a dark corner to cry in.
    return res.error(e)
  }
}

/**
 * Use request information and the user record to construct a welcome message for users when they sign in.
 */
function constructWelcomeMessage(req, user) {
  /** @todo Use the request information to determine whether to trust the user request. */
  let trustReq = true

  let name

  // If the request is trusted, include the user's name in the welcome message.
  if (trustReq) {
    // If the user is a teacher and their honorific is set, refer to them by their last name.
    if (user.permissionLevel === 6 && user.title) {
      name = `${user.title} ${user.lastName}`
    }
    // Otherwise, refer to the user by their first name.
    else {
      name = user.firstName
    }
  }

  // If we found a name, return it as part of the welcome message.
  if (name) {
    return `Welcome, ${name}!`
  }
  // Otherwise, return a generic welcome message.
  else {
    return 'Welcome!'
  }
}
