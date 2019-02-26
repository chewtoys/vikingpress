const bcrypt = require('bcrypt')
const { User } = require('../../services/db')

module.exports = async (req, res) => {
  /** Extract the request ID and new password from the request body. */
  let { requestId, password } = req.body

  /** Locate the reset request in the database. */
  let user = await User.findOne({ where: { resetHash: requestId } }, ['id'])

  /** Return an error if it's a bad request. */
  if (!user) {
    return res.status(400).send('That reset request does not exist.')
  } else if (!password || !requestId) {
    return res.status(400).send('Missing password or request ID')
  }

  /** Hash the new password. */
  bcrypt.hash(password, 10, async (err, newPasswordHash) => {
    /** Handle potential errors. */
    if (err) return res.status(500).send('Unable to reset password.')

    /** Update the user with the new password and delete the reset request. */
    await user.update({ password: newPasswordHash, resetHash: null })

    /** Return the API request.
     * @todo Also make it sign the user in.
     */
    res.send({ success: true })
  })
}
