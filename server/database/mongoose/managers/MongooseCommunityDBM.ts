import mongoose from 'mongoose';
import { Community } from "@types";
import CommunityDBM from "../../interface/managers/CommunityDBM";
import { CommunityModel } from "../schemas"
import { CommunitySchemaType } from "../types";
import AdmZip from 'adm-zip';


/**
 * @author Tuyen Vo
 */
export default class MongooseCommunityDBM implements CommunityDBM {

    public async getCommunities(name: string, sort: string): Promise<Community[]> {
        let filter: mongoose.FilterQuery<any> = {
            name: new RegExp(`^${name}`, 'i'),
            visibility: 'public'
        }
        let communities = []
        switch (sort) {
            case 'a-z':
                communities = await CommunityModel.find(filter).sort({name: 1})
                break
            case 'z-a':
                communities = await CommunityModel.find(filter).sort({name: -1})
                break
            case 'most_members':
                communities = await CommunityModel.find(filter).sort({members: -1})
                break
            case 'least_members':
                communities = await CommunityModel.find(filter).sort({members: 1})
                break
            case 'most_tilemaps':
                communities = await CommunityModel.find(filter)
                // communities = await CommunityModel.find(filter).sort({name: -1})
                break
            case 'least_tilemaps':
                communities = await CommunityModel.find(filter)
                // communities = await CommunityModel.find(filter).sort({name: -1})
                break
            case 'most_tilesets':
                communities = await CommunityModel.find(filter)
                // communities = await CommunityModel.find(filter).sort({name: -1})
                break
            case 'least_tilesets':
                communities = await CommunityModel.find(filter)
                // communities = await CommunityModel.find(filter).sort({name: -1})
                break
            default:
                communities = await CommunityModel.find(filter)
        }
        return communities.map(c => this.parseCommunity(c));
    }

    public async getCommunityById(communityId: string): Promise<Community | null> {
        if (!mongoose.Types.ObjectId.isValid(communityId)) { return null; }
        let community = await CommunityModel.findById(communityId);
        if (community === null) return null;
        return this.parseCommunity(community);
    }

    public async getCommunityByName(name: string): Promise<Community | null> {
        let community = await CommunityModel.findOne({name: name});
        if (community === null) return null;
        return this.parseCommunity(community);
    }

    public async getCommunitiesById(communityIds: string[]): Promise<Community[]> {
        if (!communityIds.every(id => mongoose.Types.ObjectId.isValid(id))) { return []; }
        let communities = await CommunityModel.find({_id: { $in: communityIds }});
        return communities.map(community => this.parseCommunity(community));
    }

    public async createCommunity(community: Partial<Community> & {owner: string, name: string}): Promise<Community | null> {
        let comm = await CommunityModel.create({...community});
        let savedCommunity = await comm.save()
        return this.parseCommunity(savedCommunity);
    }

    public async updateCommunity(communityId: string, partial: Partial<Community>): Promise<Community | null> {
        if (!mongoose.Types.ObjectId.isValid(communityId)) { return null; }
        let community = await CommunityModel.findById(communityId);
        if (community === null) { return null; }
        this.fillCommunity(community, partial);
        let savedCommunity = await community.save();
        return this.parseCommunity(savedCommunity);
    }

    public async deleteCommunityById(communityId: string): Promise<Community | null> {
        if (!mongoose.Types.ObjectId.isValid(communityId)) { return null; }
        let community = await CommunityModel.findByIdAndDelete(communityId);
        if (community === null) { return null; }
        return this.parseCommunity(community);
    }

    public async getPopularTop10(): Promise<Community[]> {
        const TOP_10 = 10
        let comms = await CommunityModel.find({visibility: 'public'}).sort({members: -1}).limit(TOP_10)
        return comms.map(x => this.parseCommunity(x))
    }

    protected parseCommunity(community: CommunitySchemaType & { _id: mongoose.Types.ObjectId}): Community {
        return {
            id: community._id.toString(),
            owner: community.owner.toString(),
            name: community.name,
            description: community.description,
            members: community.members.map(id => id.toString()),
            visibility: community.visibility,
            banned: community.banned.map(x => x.toString())
        }
    }
    
    protected fillCommunity(community: CommunitySchemaType & { _id: mongoose.Types.ObjectId}, partial: Partial<Community>): void {
        community.owner = partial.owner ? new mongoose.Types.ObjectId(partial.owner) : community.owner;
        community.name = partial.name ? partial.name : community.name;
        community.description = partial.description ? partial.description : community.description;
        community.members = partial.members ? partial.members.map(id => new mongoose.Types.ObjectId(id)) : community.members;
        community.visibility = partial.visibility ? partial.visibility : community.visibility;
        community.banned = partial.banned ? partial.banned.map(id => new mongoose.Types.ObjectId(id)) : community.banned;
    }
}