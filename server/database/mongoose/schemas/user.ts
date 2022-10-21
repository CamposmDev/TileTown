import mongoose from "mongoose"
import User from "../types/UserSchemaType";
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

/**
 * Data model for storing personal user data
 * @author Michael Campos
 * 
 * @remarks
 * 
 * @param verifyKey is some string that is used when sending the user a verification email
 * @param isVerified is a flag that will tell us whether the user is verified or not
 * 
 */
const UserSchema = new Schema<User>({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    verifyKey: { type: String, required: true },
    isVerified: { type: Boolean, required: true },
    favoriteTileMaps: { type: [ObjectId], required: true },
    favoriteTileSets: { type: [ObjectId], required: true },
    joinedContests: { type: [ObjectId], required: true},
    joinedCommunities: { type: [ObjectId], required: true},
    friends: { type: [ObjectId], required: true},
    imageURL: { type: String, required: true }
})

export = mongoose.model('UserSchema', UserSchema)