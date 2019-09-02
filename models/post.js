const mongoose = require('mongoose')
const { Schema } = mongoose;

/**
 * Post Schema
 * might appear to have a complex structure
 * this is so we eliminate the need to populate queries
 * until we're ready to scale.
 * @type {Schema}
 */
const PostSchema = new Schema({
    title: {
        type: String,
        trim: true,
        default: ''
    },
    status: {
        type: String,
        default: 'active',
    },
    author: {
        name: {
            type: String,
            trim: true,
            default: ''
        },
        imageUrl: {
            type: String,
            default: ''
        },
        _id: { type: Schema.Types.ObjectId }
    },
    body: {
        type: String,
        trim: true,
    },
    postImages: {
        type: Array,
    },
    comments: [
        {
            body: {
                type: String,
                trim: true,
                default: ''
            },
            author: {
                name: { type: String, trim: true, default: '' },
                imageUrl: { type: String, default: 'https://image.freepik.com/free-photo/blue-orange-cactus-vase-isolated_6607-236.jpg' },
                _id: { type: Schema.Types.ObjectId }
            },
            created: {
                type: Date,
                default: Date.now,
            }
        }
    ],
    meta: {
        commentsCount: { type: Number, default: 0 },
        likesCount: { type: Number, default: 0 },
        hasBookmarked: { type: Array }
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', PostSchema);
