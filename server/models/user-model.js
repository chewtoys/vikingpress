/* global maroon */
module.exports = (() => {
  maroon.out.warn(`${module.parent.filename} called models/user-model, which is deprecated. Call models/accounts/user instead.`)
  return require('./accounts/user')
})()
