import mongoose from 'mongoose';
import UserDBM from "../../interface/managers/UserDBM";
import { UserModel, TilesetModel } from '../schemas'
import { User } from "@types";
import UserSchemaType from '../types/UserSchemaType';

export default class MongooseUserDBM implements UserDBM {

    async getUserById(userId: string): Promise<User | null> {

        // Checks if string is a valid object id
        if (!mongoose.Types.ObjectId.isValid(userId)) return null;

        let user = await UserModel.findById({_id: userId});
        if (user === null) return null;

        return this.parseUser(user);
    }
    async getUsersById(userIds: string[]): Promise<User[] | null> {
        if (!userIds.every(id => mongoose.Types.ObjectId.isValid(id))) { return null; }
        let users = await UserModel.find({_id: { $in: userIds }});
        if (users === null) { return null; }
        return users.map(user => this.parseUser(user));
    }
    async getUserByEmail(email: string): Promise<User | null> {
        let user = await UserModel.findOne({email: email});
        if (user === null) return null;
        return this.parseUser(user);
    }
    async getUserByUsername(username: string): Promise<User | null> {
        let user = await UserModel.findOne({username: username});
        if (user === null) return null;
        return this.parseUser(user);
    }
    async getUsersByUsername(username: string): Promise<User[]> {
        let users = await UserModel.find({username: new RegExp(`^${username}`, `i`)});
        return users.map(user => this.parseUser(user));
    }

    async createUser(userpy: Partial<User>): Promise<User | null> {
        
        let user = await UserModel.create({
            firstName: userpy.firstName,
            lastName: userpy.lastName,
            email: userpy.email,
            username: userpy.username,
            password: userpy.password,
            verifyKey: 'something?!',
            isVerified: false,
            favoriteTileMaps: [],
            favoriteTileSets: [],
            joinedContests: [],
            joinedCommunities: [],
            friends: [],
            imageURL: " "
        });

        if (user === null) return null;

        return this.parseUser(user);
    }
    async updateUser(id: string, partial: Partial<User>): Promise<User | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) { return null; }

        let user = await UserModel.findById(id);
        if (user === null) return null;

        this.fillUserModel(user, partial);
        let savedUser = await user.save()

        return this.parseUser(savedUser);
    }
 
    

    async addFriend(userId: string, friendId: string): Promise<string | null> {
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(friendId)) {
            return null;
        }

        let user = await UserModel.findById(userId)
        if (user !== null) {
            let friend = await UserModel.findById(friendId)
            if (friend !== null && !user.friends.includes(friend.id)) {
                user.friends.push(friend.id);
                await user.save();
                return friendId;
            }
        }
        return null
    }

 


    async favoriteTileset(userId: string, tilesetId: string): Promise<string | null> {
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(tilesetId)) {
            return null;
        }

        let user = await UserModel.findById(userId)
        let tileset = await TilesetModel.findById(tilesetId)
        if ((user !== null) && (tileset !== null)) {
            user.favoriteTileSets.push(tileset._id)
            await user.save()
            return tileset._id.toString();
        }
        return null
    }
    
    async deleteUser(userId: string): Promise<boolean> {
        if (!mongoose.Types.ObjectId.isValid(userId)) return false;
        let user = await UserModel.findByIdAndDelete(userId);
        if (user === null) {
            return false;
        }
        return true;
    }
    


    async unfavoriteTileset(userId: string, tilesetId: string): Promise<boolean> {
        let user: any = await UserModel.findById(userId)
        let tileset = await TilesetModel.findById(tilesetId)
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

    protected parseUser(user: UserSchemaType & { _id: mongoose.Types.ObjectId}): User {
        return {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            imageURL: user.imageURL,
            tilemaps: user.tilemaps.map((id: mongoose.Types.ObjectId) => id.toString()),
            tilesets: user.tilesets.map((id: mongoose.Types.ObjectId) => id.toString()),
            favoriteTileMaps: user.favoriteTileMaps.map((id: mongoose.Types.ObjectId) => id.toString()),
            favoriteTileSets: user.favoriteTileSets.map((id: mongoose.Types.ObjectId) => id.toString()),
            friends: user.friends.map((id: mongoose.Types.ObjectId) => id.toString()),
            isVerified: user.isVerified,
            verifyKey: user.verifyKey,
            joinedCommunities: user.joinedCommunities.map((id: mongoose.Types.ObjectId) => id.toString()),
            joinedContests: user.joinedContests.map((id: mongoose.Types.ObjectId) => id.toString())
        }
    }
    protected fillUserModel(user: UserSchemaType & { _id: mongoose.Types.ObjectId}, partial: Partial<User>): void {
        user.username = partial.username ? partial.username : user.username;
        user.email = partial.email ? partial.email : user.email;
        user.firstName = partial.firstName ? partial.firstName : user.firstName;
        user.lastName = partial.lastName ? partial.lastName : user.lastName;
        user.password = partial.password ? partial.password : user.password;
        user.imageURL = partial.imageURL ? partial.imageURL : user.imageURL;
        user.isVerified = partial.isVerified ? partial.isVerified : user.isVerified;
        user.verifyKey = partial.verifyKey ? partial.verifyKey : user.verifyKey;
        user.favoriteTileMaps = partial.favoriteTileMaps ? partial.favoriteTileMaps.map((id: string) => new mongoose.Types.ObjectId(id)) : user.favoriteTileMaps;
        user.favoriteTileSets = partial.favoriteTileSets ? partial.favoriteTileSets.map((id: string) => new mongoose.Types.ObjectId(id)) : user.favoriteTileSets;
        user.friends = partial.friends ? partial.friends.map((id: string) => new mongoose.Types.ObjectId(id)) : user.friends;
        user.joinedCommunities = partial.joinedCommunities ? partial.joinedCommunities.map((id: string) => new mongoose.Types.ObjectId(id)) : user.joinedCommunities;
        user.joinedContests = partial.joinedContests ? partial.joinedContests.map((id: string) => new mongoose.Types.ObjectId(id)) : user.joinedContests;
        user.tilemaps = partial.tilemaps ? partial.tilemaps.map((id: string) => new mongoose.Types.ObjectId(id)) : user.tilemaps;
        user.tilesets = partial.tilesets ? partial.tilesets.map((id: string) => new mongoose.Types.ObjectId(id)) : user.tilesets;
    }
}