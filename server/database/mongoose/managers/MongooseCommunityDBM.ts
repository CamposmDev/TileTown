import { Community } from "../../../types";
import CommunityDBM from "../../interface/managers/CommunityDBM";
import CommunitySchema from '../../mongoose/schemas/community'
import ContestSchema from '../../mongoose/schemas/contest'
import TilemapSchema from '../../mongoose/schemas/tilemap'
import TilesetSchema from '../../mongoose/schemas/tileset'
import { hash, compare } from "bcrypt";
import UserSchema from '../../mongoose/schemas/user'


/**
 * @author Tuyen Vo
 */

export default class MongooseCommunityDBM implements CommunityDBM {

    async getCommunityById(communityId: string): Promise<Community | null> {
        let community: any = await CommunitySchema.findById({_id: communityId});
        return community !== null ? {
            id: community._id.toString(),
            owner: community.owner.toString(),
            name: community.name,
            description: community.description,
            memberCount: community.memberCounter,
            visibility: community.visibility
        } : null
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
    async removeCommunityMember(userId: string, communityId: string): Promise<boolean> {
        throw new Error("Method not implemented.");

    }
    async deleteCommunity(communityId: string): Promise<boolean> {
        throw new Error("Method not implemented.");


    }
    
}