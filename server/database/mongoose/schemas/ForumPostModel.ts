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
    tags: { type: [String], require: true},
    likes: { type: [ObjectId], require: true},
    dislikes: { type: [ObjectId], require: true},
    comments: { type: [ObjectId], require: true},
    views: { type: Number, require: true },
    isPublished: { type: Boolean, require: true},
    publishDate: { type: Date, require: true, default: null}
})

const ForumPostModel = mongoose.model('ForumPostSchema', ForumPostSchema);

export { ForumPostModel }