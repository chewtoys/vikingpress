const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    legacyId: Number,
    author: {
        name: String,
        ip: String,
        email: String,
        userAgent: String,
        referrer: String,
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    created: {
        type: Date,
        default: Date.now
    },
    onPost: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    content: String,
    status: String,
    replyTo: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }
})

module.exports = mongoose.model('Comment', commentSchema)
