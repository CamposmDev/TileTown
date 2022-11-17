import mongoose from "mongoose"
import { ForumSchemaType } from "../types";
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

/**
 * @author Tuyen Vo
 */

const ForumPostSchema = new Schema<ForumSchemaType>({
    author: { type: ObjectId, require: true},
    title: { type: String, require: true},
    body: { type: String, require: true},
    tags: { type: [String], require: true, default: []},
    likes: { type: [ObjectId], require: true, default: []},
    dislikes: { type: [ObjectId], require: true, default: []},
    comments: { type: [ObjectId], require: true, default: []},
    views: { type: Number, require: true, default: 0 },
    isPublished: { type: Boolean, require: true, default: false}
})

const ForumPostModel = mongoose.model('ForumPostSchema', ForumPostSchema);

export { ForumPostModel }