import { Community } from "../../../types";
import CommunityDBM from "../../interface/managers/CommunityDBM";

export default class MongooseCommunityDBM implements CommunityDBM {

    async getCommunityById(communityId: string): Promise<Community | null> {
        throw new Error("Method not implemented.");
    }
    async createCommunity(community: Partial<Community>): Promise<Community | null> {
        throw new Error("Method not implemented.");
    }
    async updateCommunity(communityId: string, community: Partial<Community>): Promise<Community | null> {
        throw new Error("Method not implemented.");
    }
    async addCommunityMember(userId: string, communityId: string): Promise<string | null> {
        throw new Error("Method not implemented.");
    }
    async removeCommunityMember(userId: string, communityId: string): Promise<string | null> {
        throw new Error("Method not implemented.");
    }
    async deleteCommunity(communityId: string): Promise<string | null> {
        throw new Error("Method not implemented.");
    }
    
}