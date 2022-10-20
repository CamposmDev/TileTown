const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

/**
 * Data model for storing personal user data
 * @author Michael Campos
 * @
 */
const UserSchema = new Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
    verifyKey: { type: String, required: true },
    isVerified: { type: Boolean, required: true },
    favoriteTileMaps: { type: ObjectId, required: true },
    favoriteTileSets: { type: ObjectId, required: true },
    joinedContests: { type: [ObjectId], required: true},
    joinedCommunities: { type: [ObjectId], required: true},
    friends: { type: [ObjectId], required: true},
    imageURL: { type: String, required: true }
})

module.exports = mongoose.model('User', UserSchema)