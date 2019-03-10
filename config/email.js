// This is an example file. To get started, move it to the ./private directory and add your information.

/** Configure Nodemailer email transports.
 * @see https://nodemailer.com/smtp/
 */
module.exports.email = [{
    port: 587,
    secure: true,
    host: 'YOUR_EMAIL_HOST',
    auth: {
        user: 'YOUR_SMTP_USERNAME',
        pass: 'YOUR_SMTP_PASSWORD'
    }
}]
