const { User } = require('../../services/db')

module.exports = async (req, res) => {
  /** Extract the request ID from the request body. */
  let { requestId } = req.body

  /** Locate the reset request in the database. */
  let user = await User.findOne({ where: { resetHash: requestId } }, ['id'])

  if (user) {
    /** If the request exists and is not expired, return it to the client. */
    return res.send({ valid: true, requestId, userId: user.id })
  }

  /** Otherwise, tell the client that the request is invalid. */
  res.send({ valid: false })
}
