const bcrypt = require('bcrypt')
const PasswordResetRequest = require('../../models/accounts/password-reset')
const User = require('../../models/accounts/user')

module.exports = async (req, res) => {
  /** Extract the request ID and new password from the request body. */
  let { requestId, password } = req.body

  /** Locate the reset request in the database. */
  let resetRequest = await PasswordResetRequest.findById(requestId)

  /** Return an error if it's a bad request. */
  if (!resetRequest) {
    return res.status(400).send('That reset request does not exist.')
  } else if (!password || !requestId) {
    return res.status(400).send('Missing password or request ID')
  }

  /** Hash the new password. */
  bcrypt.hash(password, 10, async (err, hash) => {
    /** Handle potential errors. */
    if (err) return res.status(500).send('Unable to reset password.')

    /** Update the user with the new password. */
    await User.findByIdAndUpdate(resetRequest.user, { auth: { provider: 'Local', password: hash } })

    /** Delete the reset request. */
    await resetRequest.delete()

    /** Return the API request.
         * @todo Also make it sign the user in.
         */
    res.send({ success: true })
  })
}
