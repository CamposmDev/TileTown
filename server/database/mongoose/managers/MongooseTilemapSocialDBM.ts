import mongoose from 'mongoose';
import { TilemapSocial, TilemapSocialQuery } from "@types";
import TilemapSocialDBM from "../../interface/managers/TilemapSocialDBM";
import { TilemapSocialSchemaType } from "../types";
import { TilemapSocialModel } from "../schemas";

export default class MongooseTilemapSocialDBM implements TilemapSocialDBM {

    async getTilemapSocialByTilemapId(tilemapId: string): Promise<TilemapSocial | null> {
        if (!mongoose.Types.ObjectId.isValid(tilemapId)) { 
            return null;
        }
        let social = await TilemapSocialModel.findOne({tileMap: tilemapId});
        if (social === null) { return null; }
        return this.parseSocial(social);
    }
    async getTilemapSocialById(socialId: string): Promise<TilemapSocial | null> {
        if (!mongoose.Types.ObjectId.isValid(socialId)) {
            return null;
        }
        let social = await TilemapSocialModel.findById(socialId);
        if (social === null) { return null; }
        return this.parseSocial(social);
    }
    async createTilemapSocial(tilemapId: string, partial: Partial<TilemapSocial>): Promise<TilemapSocial | null> {
        if (!mongoose.Types.ObjectId.isValid(tilemapId)) { 
            return null; 
        }
        let social = await TilemapSocialModel.create({
            tileMap: tilemapId,
            name: partial.name,
            owner: partial.owner,
            ownerName: partial.ownerName,
            collaborators: partial.collaborators ? partial.collaborators : [],
            collaboratorNames: partial.collaboratorNames ? partial.collaboratorNames : [],
            tags: partial.tags ? partial.tags : [],
            description: partial.description ? partial.description : "Description",
            community: partial.community ? partial.community : '',
            contest: partial.contest ? partial.contest : '',
            likes: [],
            dislikes: [],
            views: 0,
            permissions: partial.permissions ? partial.permissions : [],
            comments: [],
            publishDate: new Date(Date.now()),
            imageURL: partial.imageURL ? partial.imageURL : "",
        });
        let savedSocial = await social.save();
        return this.parseSocial(savedSocial);
    }
    async updateTilemapSocial(socialId: string, partial: Partial<TilemapSocial>): Promise<TilemapSocial | null> {
        if (!mongoose.Types.ObjectId.isValid(socialId)) { 
            return null; 
        }
        let social = await TilemapSocialModel.findById(socialId);
        if (social === null) { return null; }

        this.fillSocial(social, partial);
        let savedSocial = await social.save();
        return this.parseSocial(savedSocial);
    }

    async getTilemapSocials(query: TilemapSocialQuery): Promise<TilemapSocial[]> {

        let sort;
        switch(query.sortby) {
            case "published": { 
                sort = { publishDate: query.order }
                break;
            }
            case "likes": {
                sort = { likes: query.order }
                break;
            }
            case "dislikes": {
                sort = { dislikes: query.order }
                break;
            }
            case "views": {
                sort = { views: query.order }
                break;
            }
            default: {
                sort = { publishDate: query.order }
                break;
            }
        }
        

        let socials;
        console.log(sort);
        
        if (query.tags.length !== 0) {
            socials = await TilemapSocialModel.find({$and: [
                { name: new RegExp(`^${query.name}`, "i") },
                { tags: {$elemMatch : { $in: query.tags } }},
                ]}).sort(sort);
        } else {
            socials = await TilemapSocialModel.find({$and: [
                { name: new RegExp(`^${query.name}`, "i") }
                ]}
            ).sort(sort);
        }

        return socials.map(s => this.parseSocial(s));
    }

    async getSubmissionIds(contestId: string): Promise<TilemapSocial[]> {
        if (!mongoose.Types.ObjectId.isValid(contestId)) return [];
        let tilemaps = await TilemapSocialModel.find({contest: contestId})
        return tilemaps.map(x => this.parseSocial(x))
    }

    async getPopularTop10(): Promise<TilemapSocial[]> {
        const TOP_10 = 10
        let tilemaps = await TilemapSocialModel.find().sort({views: -1})
        let socials = tilemaps.map(x => {
            let likePoints = x.likes.length
            let dislikePoints = x.dislikes.length
            let totalPoints = likePoints - dislikePoints
            totalPoints += x.comments.length
            totalPoints += x.views
            return {tilemap: this.parseSocial(x), points: totalPoints}
        })
        socials = socials.sort((a,b) => {
            return a.points > b.points ? 1 : 0
        })
        let result = socials.map(x => x.tilemap).slice(0,TOP_10)
        return result
    }

    protected parseSocial(social: TilemapSocialSchemaType & {_id: mongoose.Types.ObjectId}): TilemapSocial {
        return {
            id: social._id.toString(),
            tileMap: social.tileMap.toString(),
            name: social.name,
            owner: social.owner.toString(),
            ownerName: social.ownerName,
            collaborators: social.collaborators.map((id) => id.toString()),
            collaboratorNames: social.collaboratorNames,
            tags: social.tags,
            description: social.description,
            community: social.community,
            contest: social.contest,
            likes: social.likes.map((id) => id.toString()),
            dislikes: social.dislikes.map((id) => id.toString()),
            views: social.views,
            permissions: social.permissions,
            comments: social.comments.map((id) => id.toString()),
            publishDate: social.publishDate,
            imageURL: social.imageURL
        }
    }
    protected fillSocial(social: TilemapSocialSchemaType & {_id: mongoose.Types.ObjectId}, partial: Partial<TilemapSocial>): void {
        social.tileMap = partial.tileMap ? new mongoose.Types.ObjectId(partial.tileMap) : social.tileMap;
        social.name = partial.name ? partial.name : social.name;
        social.owner = partial.owner ? new mongoose.Types.ObjectId(partial.owner) : social.owner;
        social.ownerName = partial.ownerName ? partial.ownerName : social.ownerName;
        social.collaborators = partial.collaborators ? partial.collaborators.map(id => new mongoose.Types.ObjectId(id)) : social.collaborators;
        social.collaboratorNames = partial.collaboratorNames ? partial.collaboratorNames : social.collaboratorNames;
        social.tags = partial.tags ? partial.tags : social.tags;
        social.description = partial.description ? partial.description : social.description;
        social.community = partial.community ? partial.community : social.community
        social.contest = partial.contest ? partial.contest : social.contest
        social.likes = partial.likes ? partial.likes.map(id => new mongoose.Types.ObjectId(id)) : social.likes;
        social.dislikes = partial.dislikes ? partial.dislikes.map(id => new mongoose.Types.ObjectId(id)) : social.dislikes;
        social.views = partial.views ? partial.views : social.views;
        social.permissions = partial.permissions ? partial.permissions : social.permissions;
        social.comments = partial.comments ? partial.comments.map(id => new mongoose.Types.ObjectId(id)) : social.comments;
        social.publishDate = partial.publishDate ? partial.publishDate : social.publishDate;
        social.imageURL = partial.imageURL ? partial.imageURL : social.imageURL;
    }
    
}