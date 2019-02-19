/* global maroon */
const { render } = require('ejs')
const { readFile } = require('fs')
const { promisify } = require('util')
const { join } = require('path')
const readFileAsync = promisify(readFile)
const transporter = require('./transports')

/** Basic site meta-info available in every template */
const site = {
  title: maroon.config.title,
  url: `https://${maroon.config.webAddress}`,
  logoUrl: `https://${maroon.config.webAddress}/_nuxt/client/assets/vv-logo.png`
}

module.exports = async function sendMail (templateName, recipient, data) {
  /** Get the email template. */
  const { subject, text, html } = await getEmailTemplate(templateName)

  /** Assemble data to be injected into email template. */
  const emailData = { site, ...data }

  /** Assemble email information and render the template. */
  let newEmail = {
    to: recipient,
    subject: await ejsRender(subject, emailData),
    text: await ejsRender(text, emailData),
    html: await ejsRender(html, emailData)
  }

  /** Send the email. */
  await transporter.sendMail(newEmail)
}

/** Render EJS asynchronously.
 * @param {string} template - The template string being rendered
 * @param {object} data - The data being injected
 */
async function ejsRender (template, data) {
  return render(template, data, {
    async: true
  })
}

/** Get and parse an email template file.
 * @param {string} templateName - The name of the template being used
 * @returns {object} - The parsed template
 */
async function getEmailTemplate (templateName) {
  /** Get path to template file. */
  const pathToTemplate = join(__dirname, `../../views/email/parsed/${templateName}.json`)

  /** Read template file. */
  const rawTemplate = await readFileAsync(pathToTemplate)

  /** Return parsed template file. */
  return JSON.parse(rawTemplate)
}
