import mongoose, { Schema } from "mongoose"
import { CommunitySchemaType } from "../types/index";

const ObjectId = Schema.Types.ObjectId;

/**
 * @author Tuyen Vo
 */
const CommunitySchema = new Schema<CommunitySchemaType>({
    owner: { type: ObjectId, require: true},
    name: { type: String, require: true},
    visibility: { type: String, require: true},
    description: { type: String, require: true, default: "Community description here!"},
    members: { type: [ObjectId], require: true, default: []}
});

const CommunityModel = mongoose.model("CommunityModel", CommunitySchema);

export { CommunityModel }