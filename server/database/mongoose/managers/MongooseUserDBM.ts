import mongoose from "mongoose";
import { db } from "../..";
import { User } from "../../../types";
import UserDBM from "../../interface/managers/UserDBM";
import { ObjectId } from "mongoose";
import UserSchema from '../../mongoose/schemas/user'

export default class MongooseUserDBM implements UserDBM {

    getUserById(userId: string): User | null {
        UserSchema.findById({_id: userId}, (err: Error, x: any) => {
            if (err) {
                return null
            } else {
                const user: User = {
                    id: x._id, 
                    username: x.username,
                    email: x.email,
                    firstName: x.firstName,
                    lastName: x.lastName,
                    password: x.passwordHash,
                    profilePicture: x.imageURL,
                    favoriteTileMaps: x.favoriteTileMaps,
                    favoriteTileSets: x.favoriteTileSets,
                    friends: x.friends,
                    isVerified: x.isVerified,
                    verifyKey: x.verifyKey,
                    joinedCommunities: x.joinedCommunities,
                    joinedContests: x.joinedContests,
                }
                return user
            }
        })
        return null
    }
    createUser(user: Partial<User>): User | null {

        throw new Error("Method not implemented.");
    }
    verifyUser(key: string): boolean {
        throw new Error("Method not implemented.");
    }
    updatePassword(userId: string, password: string): string | null {
        throw new Error("Method not implemented.");
    }
    updateEmail(userId: string, email: string): string | null {
        throw new Error("Method not implemented.");
    }
    updateUsername(userId: string, username: string): string | null {
        throw new Error("Method not implemented.");
    }
    addFriend(userId: string, friendId: string): string | null {
        throw new Error("Method not implemented.");
    }
    joinCommunity(userId: string, communityId: string): string | null {
        throw new Error("Method not implemented.");
    }
    joinContest(userId: string, contestId: string): string | null {
        throw new Error("Method not implemented.");
    }
    favoriteTilemap(userId: string, tilemapId: string): string | null {
        throw new Error("Method not implemented.");
    }
    favoriteTileset(userId: string, tilesetId: string): string | null {
        throw new Error("Method not implemented.");
    }
    
}