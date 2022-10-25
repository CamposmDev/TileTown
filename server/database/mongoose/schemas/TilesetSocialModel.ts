import mongoose from "mongoose"
import { TilesetSocialSchemaType } from "../types/index"

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

/**
 * @author Tuyen Vo
 */

const TileSetSocialStatisticsSchema = new Schema<TilesetSocialSchemaType>({
    tileSet: { type: ObjectId, require: true},
    name: { type: String, require: true},
    owner: { type: ObjectId, require: true},
    ownerName: { type: String, require: true},
    tags: { type: [String], require: true},
    description: { type: String, require: true},
    communities: { type: [ObjectId], require: true},
    likes: { type: [ObjectId], require: true},
    dislikes: {type: [ObjectId], require: true},
    views: { type: Number, require: true},
    permissions: 
    [{
        type: { type: String, require: true},
        setting: { type: String, require: true},
    }],
    comments: { type: [ObjectId], require: true},
    publishDate: { type: Date, require: true},
    imageURL: { type: String, require: true},


})

const TilesetSocialModel = mongoose.model('TileSetSocialStatisticsSchema', TileSetSocialStatisticsSchema)

export { TilesetSocialModel }