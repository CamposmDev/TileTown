import { User } from "../../../types";
import UserDBM from "../../interface/managers/UserDBM";
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
    createUser(userpy: Partial<User>): User | null {
        /**
         * Check if the user's credentials not empty.
         * If any field is empty, then return null.
         */
        if (!userpy.firstName || !userpy.lastName) return null
        if (!userpy.username || !userpy.password) return null
        if (!userpy.email) return null

        let username = userpy.username
        /**
         * Check if the username is valid and is unique.
         */
        UserSchema.findOne({username: username}, (err: Error, x: any) => {
            if (err || !x) return null
        })

        let password = userpy.password
        /**
         * Check if the password is valid and then encrypt it
         */
        const LENGTH = 12
        if (password.length <= LENGTH) return null

        /**
         * Check if the user's email is valid and is not being used by other user accounts
         */
        let email = userpy.email
        UserSchema.findOne({emai: email}, (err: Error, x: any) => {
            if (err || !x) return null
        })

        const user = new UserSchema({
            firstName: userpy.firstName,
            lastName: userpy.lastName,
            email: email,
            username: username,
            password: password,
            verifyKey: 'something',
            isVerified: false,
            favoriteTileMaps: [],
            favoriteTileSets: [],
            joinedContests: [],
            joinedCommunities: [],
            friends: [],
            imageURL: null
        })
        user.save().then(() => {
            return {
                id: user._id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                password: user.passwordHash,
                profilePicture: user.imageURL,
                favoriteTileMaps: user.favoriteTileMaps,
                favoriteTileSets: user.favoriteTileSets,
                friends: user.friends,
                isVerified: user.isVerified,
                verifyKey: user.verifyKey,
                joinedCommunities: user.joinedCommunities,
                joinedContests: user.joinedContests
            }
        })
        return null
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