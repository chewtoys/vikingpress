const findUserByUsername = require('../../helpers/find-user')
const sendMail = require('../../services/email/send-mail')
const { randomBytes } = require('crypto')

module.exports = async (req, res) => {
  // Extract username from request body.
  let { username } = req.body

  // Use the given ID to retrieve the user and their email address from the database.
  let user = await findUserByUsername(username, ['id', 'email', 'authProvider'])

  // Send an error 400 (bad request) if the user isn't found.
  if (!user) {
    return res.fail(400, 'We couldn\'t find that account.')
  } else if (user.authProvider.indexOf('Local') === -1) {
    return res.fail(400, `You can only reset the password of a local account. This account uses ${user.authProvider} as its authentication provider.`)
  }

  // Generate a password reset hash.
  let resetHash = randomBytes(20).toString('hex')

  // Create and save a new password reset request.
  await user.update({ resetHash })

  // Send the password reset email.
  await sendMail('reset-password', user.email, { resetUrl: `https://${maroon.config.webAddress}/accounts/reset-password/${resetHash}` })

  // Report back.
  res.success({ emailAddress: user.email })
}
