const mongoose = require('mongoose')
const Schema = Schema

const collectionSchema = new Schema({
    legacyId: Number,
    type: String,
    title: String,
    slug: String,
    description: String,
    featuredImage: {
        type: Schema.Types.ObjectId,
        ref: 'Image'
    },    
    parent: this,
    children: [this],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
})

module.exports = mongoose.model('Collection', collectionSchema)