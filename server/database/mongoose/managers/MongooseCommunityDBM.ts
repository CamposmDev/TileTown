import mongoose from 'mongoose';
import { Community } from "@types";
import CommunityDBM from "../../interface/managers/CommunityDBM";
import { CommunityModel } from "../schemas"
import { CommunitySchemaType } from "../types";


/**
 * @author Tuyen Vo
 */
export default class MongooseCommunityDBM implements CommunityDBM {

    async getCommunityById(communityId: string): Promise<Community | null> {
        if (!mongoose.Types.ObjectId.isValid(communityId)) { return null; }
        let community = await CommunityModel.findById(communityId);
        if (community === null) return null;
        return this.parseCommunity(community);
    }
    async getCommunityByName(name: string): Promise<Community | null> {
        let community = await CommunityModel.findOne({name: name});
        if (community === null) return null;
        return this.parseCommunity(community);
    }
    async getCommunitiesById(communityIds: string[]): Promise<Community[]> {
        if (!communityIds.every(id => mongoose.Types.ObjectId.isValid(id))) { return []; }
        let communities = await CommunityModel.find({_id: { $in: communityIds }});
        return communities.map(community => this.parseCommunity(community));
    }
    async getCommunitiesByName(name: string): Promise<Community[]> {
        let communities = await CommunityModel.find({name: new RegExp(`^${name}`, `i`)});
        return communities.map(community => this.parseCommunity(community));
    }

    async createCommunity(community: Partial<Community>): Promise<Community | null> {
        
        let comm = await CommunityModel.create({
            owner: community.owner,
            name: community.name,
            description: community.description,
            memberCounter: 1,
            visibility: community.visibility
        })

        let savedCommunity = await comm.save()

        return this.parseCommunity(savedCommunity);
    }
    async updateCommunity(communityId: string, partial: Partial<Community>): Promise<Community | null> {
        if (!mongoose.Types.ObjectId.isValid(communityId)) { return null; }

        let community = await CommunityModel.findById(communityId);
        if (community === null) { return null; }

        this.fillCommunity(community, partial);
        let savedCommunity = await community.save();
        return this.parseCommunity(savedCommunity);
    }
    async deleteCommunityById(communityId: string): Promise<Community | null> {
        if (!mongoose.Types.ObjectId.isValid(communityId)) { return null; }
        let community = await CommunityModel.findByIdAndDelete(communityId);
        if (community === null) { return null; }
        return this.parseCommunity(community);
    }

    protected parseCommunity(community: CommunitySchemaType & { _id: mongoose.Types.ObjectId}): Community {
        return {
            id: community._id.toString(),
            owner: community.owner.toString(),
            name: community.name,
            description: community.description,
            members: community.members.map(id => id.toString()),
            visibility: community.visibility
        }
    }
    protected fillCommunity(community: CommunitySchemaType & { _id: mongoose.Types.ObjectId}, partial: Partial<Community>): void {
        community.owner = partial.owner ? new mongoose.Types.ObjectId(partial.owner) : community.owner;
        community.name = partial.name ? partial.name : community.name;
        community.description = partial.description ? partial.description : community.description;
        community.members = partial.members ? partial.members.map(id => new mongoose.Types.ObjectId(id)) : community.members;
        community.visibility = partial.visibility ? partial.visibility : community.visibility;
    }
}