const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mediaSchema = new Schema({
    legacyId: Number,
    name: String,
    
    meta: {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        date: { type: Date, default: Date.now },
        type: { type: String, default: 'attachment' },
        mimeType: String,
        onPost: {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    },

    caption: { type: String, default: '' },
    alt: { type: String, default: '' },

    data: Buffer
})

module.exports = mongoose.model('Media', mediaSchema)
