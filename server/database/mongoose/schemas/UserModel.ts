import mongoose, { Document, Model } from "mongoose"
import { UserSchemaType } from "../types/index";
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId


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
const UserSchema = new Schema<UserSchemaType>({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    verifyKey: { type: String, required: true },
    isVerified: { type: Boolean, required: true },
    
    tilemaps: { type: [ObjectId], required: true, default: []},
    tilesets: { type: [ObjectId], required: true, default: []},
    favoriteTileMaps: { type: [ObjectId], required: true },
    favoriteTileSets: { type: [ObjectId], required: true },
    joinedContests: { type: [ObjectId], required: true},
    joinedCommunities: { type: [ObjectId], required: true},
    friends: { type: [ObjectId], required: true},
    imageURL: { type: String, required: true }
});

const UserModel = mongoose.model('UserSchema', UserSchema)

export { UserModel }
