import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

/**
 * @author Tuyen Vo
 */

const TileMapSocialStatisticsSchema = new Schema({
    author: { type: ObjectId, require: true},
    body: { type: String, require: true},
    referenceId: { type: ObjectId, require: true},
    isPublished: { type: Boolean, require: true}

})
export = mongoose.model('TileMapSocialStatisticsSchema', TileMapSocialStatisticsSchema)