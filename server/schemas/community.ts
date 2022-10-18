const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.Object

/**
 * @author Tuyen Vo
 */

const CommunitySchema = new Schema({
    owner: { type: ObjectId, require: true},
    name: { type: String, require: true},
    description: { type: String, require: true},
    memberCounter: {type: Number, require: true},
    visibility: {type: String, require: true}

})
module.exports = mongoose.model('Community', CommunitySchema)