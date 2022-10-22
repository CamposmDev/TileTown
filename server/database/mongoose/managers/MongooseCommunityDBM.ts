import { Community } from "../../../types";
import CommunityDBM from "../../interface/managers/CommunityDBM";
import CommunitySchema from '../../mongoose/schemas/community'
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
        /** 
        * Check if the community name or the community owner not empty 
        * If it is empty then return null
        * */
        if (!community.name || !community.owner) return null

        /**
         * Check if the community name valid
         */
        const validCommunityName = async (communityName: string): Promise<boolean> => {
            const existCommunity = await CommunitySchema.findOne({communityName: communityName})
            return existCommunity ? false : true
        }

        let communityName = community.name
        if(!(await validCommunityName(communityName))) return null
        return null
    }
   async updateCommunity(communityId: string, community: Partial<Community>): Promise<Community | null> {
        let com: any = await CommunitySchema.findById(communityId)
        if (com !== null) {
            com.community = community
            com.save()
            return {
                id: com._id.toString(),
                owner: com.owner.toString(),
                name: com.name,
                description: com.description,
                memberCount: com.memberCounter,
                visibility: com.visibility
            }
        }
        return null
    }

    async addCommunityMember(userId: string, communityId: string): Promise<string | null> {
        let community: any = await CommunitySchema.findById(communityId)
        if (community !== null) {
            let user: any = await CommunitySchema.findById(userId)
            if (user !== null){
                community.memberCounter = community.memberCounter + 1
                community.save()
                return userId
            }
        }
        return null

    }
     
    async removeCommunityMember(userId: string, communityId: string): Promise<boolean> {
        let community: any = await CommunitySchema.findById(communityId)
        let user = await UserSchema.findById(userId)
        if ((community !== null) && (user !== null)) {
            community.memberCounter = community.memberCount - 1
            community.save()
            return true

        }
        return false
    }
    async deleteCommunity(communityId: string): Promise<boolean> {
        let community: any = await CommunitySchema.findById(communityId)
        if (community !== null) {
            community.delete()
            return true
        }
        return false
    }
}