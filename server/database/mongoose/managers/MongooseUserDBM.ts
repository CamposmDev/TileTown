import { hash } from "bcrypt";
import UserDBM from "../../interface/managers/UserDBM";
import UserSchema from '../../mongoose/schemas/user'
import { User } from "../../../types";


export default class MongooseUserDBM implements UserDBM {

    async getUserById(userId: string): Promise<User | null> {
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
        const validUsername = async (username: string): Promise<Boolean> => {
            const existingUser = await UserSchema.findOne({username: username})
            return existingUser ? false : true
        }

        let username = userpy.username
        await validUsername(username).then(isValid => {
            if (!isValid) return null
        })

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
        const validEmail = async (email: string): Promise<Boolean> => {
            let existingUser = await UserSchema.findOne({email: email})
            return existingUser ? false : true
        }

        let email = userpy.email
        await validEmail(email).then(isValid => {
            if (!isValid) return null
        })

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
        throw new Error("Method not implemented.");
    }
    async updatePassword(userId: string, password: string): Promise<string | null> {
        throw new Error("Method not implemented.");
    }
    async updateEmail(userId: string, email: string): Promise<string | null> {
        throw new Error("Method not implemented.");
    }
    async updateUsername(userId: string, username: string): Promise<string | null> {
        throw new Error("Method not implemented.");
    }
    async addFriend(userId: string, friendId: string): Promise<string | null> {
        throw new Error("Method not implemented.");
    }
    async joinCommunity(userId: string, communityId: string): Promise<string | null> {
        throw new Error("Method not implemented.");
    }
    async joinContest(userId: string, contestId: string): Promise<string | null> {
        throw new Error("Method not implemented.");
    }
    async favoriteTilemap(userId: string, tilemapId: string): Promise<string | null> {
        throw new Error("Method not implemented.");
    }
    async favoriteTileset(userId: string, tilesetId: string): Promise<string | null> {
        throw new Error("Method not implemented.");
    }
    
}