const mongoose = require('mongoose')
const Schema = Schema

const commentSchema = new Schema({
    legacyId: Number,
    author: {
        name: String,
        ip: String,
        email: String,
        userAgent: String,
        referrer: String
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
    status: String
})

module.exports = mongoose.model('Comment', commentSchema)