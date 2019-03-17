const { User } = require('../../services/db')

module.exports = async(req, res) => {
  /** Extract the request ID from request parameters. */
  let {id} = req.params

  /** Locate the reset request in the database. */
  let user = await User.findOne({ where: { resetHash: id } }, ['id', 'email'])

  if (user) {
    /** If the request exists and is not expired, return it to the client. */
    return res.success({ requestId: id, userId: user.id })
  }

  /** Otherwise, tell the client that the request is invalid. */
  res.fail(404, 'You used an invalid reset link.')
}
