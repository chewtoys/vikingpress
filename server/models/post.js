const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    legacyId: Number,
    title: String,
    dek: String,
    body: {
        raw: String
    },
    media: {
        type: {
            type: String,
            default: 'embed'
        },
        list: [{
            type: Schema.Types.ObjectId,
            ref: 'Media'
        }]
    }
    meta: {
        authors: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        collections: [{
            type: Schema.Types.ObjectId,
            ref: 'Collection'
        }],
        featured: Boolean,
        featuredImage: {
            type: Schema.Types.ObjectId,
            ref: 'Media'
        },
        created: {
            type: Date,
            default: Date.now
        },
        updated: {
            type: Date,
            default: Date.now
        },
        status: String,
        path: String,
        slug: String
    },
    revisions: [{
        revision: Number,
        title: String,
        dek: String,
        date: {
            type: Date,
            default: Date.now
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    body: {
        raw: String
    },
        media: {
            type: {
                type: String,
                default: 'embed'
            },
            list: [{
                type: Schema.Types.ObjectId,
                ref: 'Media'
            }]
        }
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
})

module.exports = mongoose.model('Post', postSchema)
