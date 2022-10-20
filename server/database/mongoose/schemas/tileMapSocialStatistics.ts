import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

/**
 * @author Tuyen Vo
 */

const TileMapSocialStatisticsSchema = new Schema({
    tileMap: { type: ObjectId, require: true},
    name: { type: String, require: true},
    owner: { type: ObjectId, require: true},
    ownerName: { type: String, require: true},
    collaborators: { type: [ObjectId], require: true},
    collaboratorNames: { type: [String], require: true},
    tags: {type: [String], require: true},
    description: { type: String, require: true},
    communites: { type: [ObjectId], require: true},
    likes: { type: [ObjectId], require: true},
    dislikes: { type: [ObjectId], require: true},
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
export = mongoose.model('TileMapSocialStatisticsSchema', TileMapSocialStatisticsSchema)