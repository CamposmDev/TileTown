import { Community } from "../../../types";
import CommunityDBM from "../../interface/managers/CommunityDBM";

export default class MongooseCommunityDBM implements CommunityDBM {

    getCommunityById(communityId: string): Community | null {
        throw new Error("Method not implemented.");
    }
    createCommunity(community: Partial<Community>): Community | null {
        throw new Error("Method not implemented.");
    }
    updateCommunity(communityId: string, community: Partial<Community>): Community | null {
        throw new Error("Method not implemented.");
    }
    addCommunityMember(userId: string, communityId: string): string | null {
        throw new Error("Method not implemented.");
    }
    removeCommunityMember(userId: string, communityId: string): string | null {
        throw new Error("Method not implemented.");
    }
    deleteCommunity(communityId: string): string | null {
        throw new Error("Method not implemented.");
    }
    
}