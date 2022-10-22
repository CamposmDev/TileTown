import mongoose, { ObjectId } from 'mongoose';
import { hash, compare } from "bcrypt";
import UserDBM from "../../interface/managers/UserDBM";
import UserSchema from '../../mongoose/schemas/user'
import CommunitySchema from '../../mongoose/schemas/community'
import ContestSchema from '../../mongoose/schemas/contest'
import TilemapSchema from '../../mongoose/schemas/tilemap'
import TilesetSchema from '../../mongoose/schemas/tileset'
import UserSchemaType from "../../mongoose/types/UserSchemaType";
import { User } from "../../../types";

export default class MongooseUserDBM implements UserDBM {

    async getUserById(userId: string): Promise<User | null> {

        // Checks if string is a valid object id
        if (!mongoose.Types.ObjectId.isValid(userId)) return null;

        let user = await UserSchema.findById({_id: userId});
        return user !== null ? {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            imageURL: user.imageURL,
            favoriteTileMaps: user.favoriteTileMaps.map((id) => id.toString()),
            favoriteTileSets: user.favoriteTileSets.map((id) => id.toString()),
            friends: user.friends.map((id) => id.toString()),
            isVerified: user.isVerified,
            verifyKey: user.verifyKey,
            joinedCommunities: user.joinedCommunities.map((id) => id.toString()),
            joinedContests: user.joinedContests.map((id) => id.toString())
        } : null
    }

    async loginUser(userEmail: string, userPassword: string): Promise<User | null> {
        // Find the user based off their email
        let user = await UserSchema.findOne({email: userEmail});
        if (user === null) return null;

        // Check the user's password I think
        let isOwner: boolean = await compare(user.password, userPassword);
        if (!isOwner) return null;

        // If the password matches up - return the user.
        return {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            imageURL: user.imageURL,
            favoriteTileMaps: user.favoriteTileMaps.map((id) => id.toString()),
            favoriteTileSets: user.favoriteTileSets.map((id) => id.toString()),
            friends: user.friends.map((id) => id.toString()),
            isVerified: user.isVerified,
            verifyKey: user.verifyKey,
            joinedCommunities: user.joinedCommunities.map((id) => id.toString()),
            joinedContests: user.joinedContests.map((id) => id.toString())
        }
    }

    async createUser(userpy: Partial<User>): Promise<User | null> {
        /**
         * Check if the user's credentials not empty.
         * If any field is empty, then return null.
         */
        if (!userpy.firstName || !userpy.lastName) return null
        if (!userpy.username || !userpy.password) return null
        if (!userpy.email) return null

        /**
         * Check if the username is valid and is unique.
         */
        const validUsername = async (username: string): Promise<boolean> => {
            const existingUser = await UserSchema.findOne({username: username})
            return existingUser ? false : true
        }

        let username = userpy.username
        if (!(await validUsername(username))) return null

        let password = userpy.password
        /**
         * Check if the password is valid and then encrypt it
         */
        const ROUNDS = 10
        const LENGTH = 12
        if (password.length <= LENGTH) return null
        let passwordHash = await hash(password, ROUNDS)

        /**
         * Check if the user's email is valid and is not being used by other user accounts
         */
        const validEmail = async (email: string): Promise<boolean> => {
            let existingUser = await UserSchema.findOne({email: email})
            return existingUser ? false : true
        }

        let email = userpy.email
        if (!(await validEmail(email))) return null

        const user = new UserSchema({
            firstName: userpy.firstName,
            lastName: userpy.lastName,
            email: email,
            username: username,
            password: passwordHash,
            verifyKey: 'something?!',
            isVerified: false,
            favoriteTileMaps: [],
            favoriteTileSets: [],
            joinedContests: [],
            joinedCommunities: [],
            friends: [],
            imageURL: " "
        });

        let res = await user.save();
        return res !== null ? {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            imageURL: user.imageURL,
            favoriteTileMaps: user.favoriteTileMaps.map((id) => id.toString()),
            favoriteTileSets: user.favoriteTileSets.map((id) => id.toString()),
            friends: user.friends.map((id) => id.toString()),
            isVerified: user.isVerified,
            verifyKey: user.verifyKey,
            joinedCommunities: user.joinedCommunities.map((id) => id.toString()),
            joinedContests: user.joinedContests.map((id) => id.toString())
        } : null;
    }
 
    async verifyUser(key: string): Promise<boolean> {
        /**
         * Acquire user by their verify key and update isVerified to true
         */
        let x = await UserSchema.findOne({verifyKey: key});
        if (x) {
            x.isVerified = true
            await x.save();
            return (x.isVerified = true)
        } else {
            return false
        }
    }

    async updatePassword(userId: string, oldPassword: string, newPassword: string): Promise<string | null> {
        let user = await UserSchema.findById(userId)
        if (user !== null) {
            let currentPassword = user.password
            let isOwner: boolean = await compare(oldPassword, currentPassword)
            if (isOwner) {
                const ROUNDS = 10
                let passwordHash = await hash(newPassword, ROUNDS)
                user.password = passwordHash.toString()
                await user.save()
                return passwordHash
            }
        }
        return null
    }

    async updateEmail(userId: string, email: string): Promise<string | null> {
        let user = await UserSchema.findById(userId)
        if (user !== null) {
            user.email = email
            // TODO Send verfication email
            user.isVerified = false
            user.save()
            return email
        }
        return null
    }

    async updateUsername(userId: string, username: string): Promise<string | null> {
        let user = await UserSchema.findById(userId)
        if (user !== null) {
            user.username = username
            return username
        }
        return null
    }

    async addFriend(userId: string, friendId: string): Promise<string | null> {
        let user = await UserSchema.findById(userId)
        if (user !== null) {
            let friend: any = await UserSchema.findById(friendId)
            if (friend !== null) {
                user.friends.push(friend._id)
                user.save()
            }
        }
        return null
    }

    async joinCommunity(userId: string, communityId: string): Promise<string | null> {
        let user = await UserSchema.findById(userId)
        if (user !== null) {
            let comm: any = await CommunitySchema.findById(communityId)
            if (comm !== null) {
                user.joinedCommunities.push(comm._id)
                comm.memberCounter = comm.memberCounter + 1
                user.save()
                comm.save()
                return communityId
            }
        }
        return null
    }

    async joinContest(userId: string, contestId: string): Promise<string | null> {
        let user: any = await UserSchema.findById(userId)
        let contest: any = await ContestSchema.findById(contestId)
        if ((user !== null) && (contest !== null)) {
            user.joinedContests.push(contest._id)
            user.save()
            contest.particpates.push(user._id)
            contest.save()
            return contestId
        }
        return null
    }

    async favoriteTilemap(userId: string, tilemapId: string): Promise<string | null> {
        let user: any = await UserSchema.findById(userId)
        let tilemap = await TilemapSchema.findById(tilemapId)
        if ((user !== null) && (tilemap !== null)) {
            user.favoriteTileMaps.push(tilemap._id)
            user.save()
            return tilemap._id.toString()
        }
        return null
    }

    async favoriteTileset(userId: string, tilesetId: string): Promise<string | null> {
        let user: any = await UserSchema.findById(userId)
        let tileset = await TilesetSchema.findById(tilesetId)
        if ((user !== null) && (tileset != null)) {
            user.favoriteTileSets.push(tileset._id)
            user.save()
            return tileset._id.toString()
        }
        return null
    }
    
    async deleteUser(userId: string): Promise<boolean> {
        if (!mongoose.Types.ObjectId.isValid(userId)) return false;
        let user = await UserSchema.findById(userId)
        if (user !== null) {
            user.delete()
            return true
        }
        return false
    }
    
    async leaveCommunity(userId: string, communityId: string): Promise<boolean> {
        let user: any = await UserSchema.findById(userId)
        let comm = await CommunitySchema.findById(communityId)
        if ((user !== null) && (comm !== null)) {
            let i = user.joinedCommunities.indexOf(comm._id, 0)
            if (i > -1) {
                user.joinedCommunities.splice(i, 1)
                user.save()
            }
            let memberCount = comm.memberCounter
            if (memberCount) {
                comm.memberCounter = memberCount - 1
                comm.save()
            }
            return true
        }
        return false
    }

    async leaveContest(userId: string, contestId: string): Promise<boolean> {
        let user: any = await UserSchema.findById(userId)
        let contest = await ContestSchema.findById(contestId)
        if ((user !== null) && (contest !== null)) {
            let i = user.joinedContests.indexOf(contest._id, 0)
            if (i > -1) {
                user.joinedContests.splice(i, 1)
                user.save()
            }
            let j = contest.particpates.indexOf(user._id, 0)
            if (j > -1) {
                contest.particpates.splice(j, 1)
                contest.save()
            }
            return true
        }
        return false
    }

    async unfavoriteTilemap(userId: string, tilemapId: string): Promise<boolean> {
        let user: any = await UserSchema.findById(userId)
        let tilemap = await TilemapSchema.findById(tilemapId)
        if ((user !== null) && (tilemap !== null)) {
            let i = user.favoriteTileMaps.indexOf(tilemap._id, 0)
            if (i > -1) {
                user.favoriteTileMaps.splice(i, 1)
                user.save()
            }
            return true
        }
        return false
    }

    async unfavoriteTileset(userId: string, tilesetId: string): Promise<boolean> {
        let user: any = await UserSchema.findById(userId)
        let tileset = await TilesetSchema.findById(tilesetId)
        if ((user !== null) && (tileset !== null)) {
            let i = user.favoriteTileSets.indexOf(tileset._id, 0)
            if (i > -1) {
                user.favoriteTileSets.splice(i, 1)
                user.save()
            }
            return true
        }
        return false
    }
}