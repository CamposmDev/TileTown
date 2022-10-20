const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.Object

/**
 * @author Tuyen Vo
 */

const CommentSchema = new Schema({
    author: { type: ObjectId, require: true},
    body: { type: String, require: true},
    referenceId: { type: ObjectId, require: true},
    isPublished: { type: Boolean, require: true}

})
export {CommentSchema}