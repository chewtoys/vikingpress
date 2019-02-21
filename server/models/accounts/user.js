const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  legacyId: Number,

  name: {
    first: String,
    last: String,
    display: String
  },

  bio: String,

  email: String,
  username: String,

  auth: {
    provider: String,
    password: String,
    legacyPassword: String,
    oauthId: String
  },

  permissions: Number,

  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  media: [{
    type: Schema.Types.ObjectId,
    ref: 'Media'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]

  /* This will be used in the future.
  collections: [{
      type: Schema.Types.ObjectId,
      ref: 'Collection'
  }] */
})

module.exports = mongoose.model('User', userSchema)
