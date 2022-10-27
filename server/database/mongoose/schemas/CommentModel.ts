import mongoose from "mongoose"
import { CommentSchemaType } from "../types/index"
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

const CommentModel = mongoose.model("CommentModel", CommentSchema);

export { CommentModel }