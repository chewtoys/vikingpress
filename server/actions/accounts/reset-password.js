const bcrypt = require('bcrypt')
const { User } = require('../../services/db')

module.exports = async(req, res) => {
  // Extract the request ID and new password from the request body.
  let { id } = req.params
  let { password } = req.body

  // Locate the reset request in the database.
  let user = await User.findOne({ where: { resetHash: id } }, ['id'])

  // Return an error if it's a bad request.
  if (!user || !id) {
    return res.fail(404, 'You used an invalid reset link.')
  }
  else if (!password) {
    return res.fail(400, 'Create a new password.')
  }

  // Hash the new password.
  bcrypt.hash(password, 10, async(err, newPasswordHash) => {
    // Handle potential errors.
    if (err) return res.error(500, 'We couldn\'t reset your password because of an error.', err)

    // Update the user with the new password and delete the reset request.
    await user.update({ password: newPasswordHash, resetHash: null })

    /** Return the API request.
     *
     *@todo Also make it sign the user in.
     */
    res.success()
  })
}
