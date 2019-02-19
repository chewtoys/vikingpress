/* global maroon */
const emailConfig = maroon.config.email[0]
const { createTransport } = require('nodemailer')

/** Create Nodemailer transport.
 * @todo Make this more abstract and extensible.
 */
const defaults = { from: `${emailConfig.fromName} <${emailConfig.auth.user}>` }
module.exports = createTransport(emailConfig, defaults)
