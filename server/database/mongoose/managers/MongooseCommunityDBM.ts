import { Community } from "../../../types";
import CommunityDBM from "../../interface/managers/CommunityDBM";
import { UserModel, CommunityModel } from "../schemas"


/**
 * @author Tuyen Vo
 */
export default class MongooseCommunityDBM implements CommunityDBM {

    async getCommunityById(communityId: string): Promise<Community | null> {
        let community: any = await CommunityModel.findById({_id: communityId});
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
            const existCommunity = await CommunityModel.findOne({name: communityName})
            return existCommunity ? false : true
        }

        let communityName = community.name
        if(!(await validCommunityName(communityName))) {
            console.log('not unique name')
            return null
        }
    
        let comm = await CommunityModel.create({
            owner: community.owner,
            name: community.name,
            description: community.description,
            memberCounter: 1,
            visibility: community.visibility
        })
        await comm.save()
        return {
            id: comm._id.toString(),
            owner: comm.owner.toString(),
            name: comm.name,
            description: comm.description,
            memberCount: comm.memberCounter,
            visibility: comm.visibility
        }
    }

   async updateCommunity(communityId: string, community: Partial<Community>): Promise<Community | null> {
        let com: any = await CommunityModel.findById(communityId)
        if (com !== null) {
            if (community.owner !== null) com.owner = community.owner
            if (community.name !== null) com.name = community.name
            if (community.description !== null) com.description = community.description
            if (community.memberCount !== null) com.memberCount = community.memberCount
            if (community.visibility !== null) com.visibility = community.visibility
            await com.save()
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
        let community = await CommunityModel.findById(communityId);
        let user = await UserModel.findById(userId);

        if (community !== null && user !== null) {
            community.memberCounter = community.memberCounter + 1
            await community.save()
            return community._id.toString()
        }
        return null

    }
     
    async removeCommunityMember(userId: string, communityId: string): Promise<boolean> {
        let community: any = await CommunityModel.findById(communityId)
        let user = await UserModel.findById(userId)
        if ((community !== null) && (user !== null)) {
            community.memberCounter = community.memberCounter - 1
            await community.save()
            return true

        }
        return false
    }
    async deleteCommunity(communityId: string): Promise<boolean> {
        let community = await CommunityModel.findById(communityId)
        if (community !== null) {
            await community.delete()
            return true
        }
        return false
    }
}