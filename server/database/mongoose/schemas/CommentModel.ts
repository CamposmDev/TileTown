import mongoose from "mongoose"
import { CommentSchemaType } from "../types/index"
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

/**
 * @author Tuyen Vo
 */
const CommentSchema = new Schema<CommentSchemaType>({
    author: { type: ObjectId, require: true },
    username: { type: String, require: true },
    referenceId: { type: ObjectId, require: true},
    body: { type: String, require: true, default: "Write your comment here!"}
}, { timestamps: true })

const CommentModel = mongoose.model("CommentModel", CommentSchema);

export { CommentModel }