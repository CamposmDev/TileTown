import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

/**
 * @author Tuyen Vo
 */

const CommunitySchema = new Schema({
    owner: { type: ObjectId, require: true},
    name: { type: String, require: true},
    description: { type: String, require: true},
    memberCounter: { type: Number, require: true},
    visibility: { type: String, require: true}

})
export = mongoose.model('CommunitySchema', CommunitySchema)