import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

/**
 * @author Tuyen Vo
 */

const ModeratorsSchema = new Schema({
    groupId: { type: ObjectId, require: true},
    userId: { type: ObjectId, require: true},
    role: { type: String, require: true},
})
export = mongoose.model('ModeratorsSchema', ModeratorsSchema)