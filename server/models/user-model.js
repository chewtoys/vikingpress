const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  legacyId: Number,

  name: {
    first: String,
    last: String,
    display: String
  },

  email: String,
  username: String,

  auth: {
    provider: String,
    password: String,
    oauthId: String
  }

  /* These will be used in the future.
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    collections: [{
        type: Schema.Types.ObjectId,
        ref: 'Collection'
    }],
    media: [{
        type: Schema.Types.ObjectId,
        ref: 'Media'
    }] */
})

module.exports = mongoose.model('User', userSchema)
