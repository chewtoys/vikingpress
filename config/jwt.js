// This is an example file. To get started, move it to the ./private directory and add your information.

const { join } = require('path')
const { readFileSync } = require('fs')

module.exports.jwt = {
  publicKey: readFileSync(join(__dirname, 'PATH_TO_YOUR_PUBLIC_KEY')),
  privateKey: readFileSync(join(__dirname, 'PATH_TO_YOUR_PRIVATE_KEY')),
  options: {
    algorithm: 'RS256'
  }
}
