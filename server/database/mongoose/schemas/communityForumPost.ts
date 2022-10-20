const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.Object

/**
 * @author Tuyen Vo
 */

const CommunityForumPostSchema = new Schema({
    author: { type: String, require: true},
    title: { type: String, require: true},
    body: { type: String, require: true},
    communityId: {type: String, require: true},
    tags: { type: [String], require: true},
    likes: { type: [ObjectId], require: true},
    dislikes: { type: [ObjectId], require: true},
    isPublished: { type: Boolean, require: true}

})
export {CommunityForumPostSchema}