const mongoose = require('mongoose')
const Schema = mongoose.Schema

const collectionSchema = new Schema({
    legacyId: Number,
    type: String,
    title: String,
    slug: String,
    description: String,
    featuredImage: {
        type: Schema.Types.ObjectId,
        ref: 'Media'
    },
    parent: this,
    children: [this],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
})

module.exports = mongoose.model('Collection', collectionSchema)
