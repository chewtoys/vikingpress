const findUserByUsername = require('../../helpers/find-user')

module.exports = async(req, res) => {
  /** Extract username from request body. */
  let { username } = req.body

  try {
    /** Use the given ID to retrieve the user info from the database. */
    let { id, firstName, authProvider } = await findUserByUsername(username, ['id', 'authProvider', 'firstName'])

    /** Otherwise, send the user information. */
    res.send({ id, firstName, authProvider, username })
  }
  catch (e) {
    /** If there's no user found, find a dark corner to cry in. */
    return res.status(404).send('User not found. Sad!')
  }
}
