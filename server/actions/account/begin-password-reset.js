/* global maroon */
const findUser = require('../../helpers/find-user')
const sendMail = require('../../services/email/send-mail')
const PasswordResetRequest = require('../../models/accounts/password-reset')

module.exports = async (req, res) => {
  /** Extract username from request body. */
  let username = req.body.username

  /** Use the given ID to retrieve the user and their email address from the database. */
  let { _id, email, auth } = await findUser([{ username: username }, { email: username }], '_id email auth')

  /** Send an error 400 (bad request) if the user isn't found. */
  if (!_id) {
    return res.status(400).send('Bad Request: User not found.')
  } else if (auth.provider !== 'Local') {
    return res.status(400).send(`You can only reset the password of a local account. This account uses ${auth.provider} as its authentication provider.`)
  }

  /** Create and save a new password reset request. */
  let newResetRequest = new PasswordResetRequest({
    user: _id
  })
  let { _id: requestId } = await newResetRequest.save()

  /** Send the password reset email. */
  await sendMail('reset-password', email, { resetUrl: `https://${maroon.config.webAddress}/accounts/recovery/reset?request=${requestId}` })

  /** Report back. */
  res.send({ success: true, emailAddress: email })
}
