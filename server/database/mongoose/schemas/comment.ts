import mongoose from "mongoose"
import { CommentSchemaType } from "../types"
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

/**
 * @author Tuyen Vo
 */

const CommentSchema = new Schema<CommentSchemaType>({
    author: { type: ObjectId, require: true},
    body: { type: String, require: true},
    referenceId: { type: ObjectId, require: true},
})
export default mongoose.model('CommentSchema', CommentSchema)