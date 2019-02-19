const mongoose = require('mongoose')
const Schema = mongoose.Schema

let passwordResetSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

/** Determine if the request has expired. */
passwordResetSchema.virtual('isExpired').get(function () {
  /** Get the time, in hours, since the time when the request was created. */
  let timeElapsed = (Date.now() - this.date) / 3.6e6
  /** Return a boolean representing whether more than 36 hours have passed. */
  return timeElapsed > 36
})

module.exports = mongoose.model('PasswordReset', passwordResetSchema)
