const PasswordResetRequest = require('../../models/accounts/password-reset')

module.exports = async (req, res) => {
  /** Extract the request ID from the request body. */
  let { requestId } = req.body

  /** Locate the reset request in the database. */
  let resetRequest = await PasswordResetRequest.findById(requestId)

  if (resetRequest && !resetRequest.isExpired) {
    /** If the request exists and is not expired, return it to the client. */
    return res.send({ valid: true, requestId, userId: resetRequest.user })
  }

  /** Otherwise, tell the client that the request is invalid. */
  res.send({ valid: false })
}
