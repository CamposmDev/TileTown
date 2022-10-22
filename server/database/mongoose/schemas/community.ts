import mongoose, { Schema } from "mongoose"
import { CommunitySchemaType } from "../types";

const ObjectId = mongoose.Types.ObjectId

/**
 * @author Tuyen Vo
 */
const CommunitySchema = new Schema<CommunitySchemaType>({
    owner: { type: ObjectId, require: true},
    name: { type: String, require: true},
    description: { type: String, require: true},
    memberCounter: { type: Number, require: true},
    visibility: { type: String, require: true}

})
export = mongoose.model('CommunitySchema', CommunitySchema)