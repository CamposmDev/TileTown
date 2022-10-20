import { User } from "../../../types";
import UserDBM from "../../interface/managers/UserDBM";

export default class MongooseUserDBM implements UserDBM {

    getUserById(userId: string): User | null {
        throw new Error("Method not implemented.");
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