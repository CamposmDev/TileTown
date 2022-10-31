import mongoose from 'mongoose';
import TilemapSocial from "../../../types/TilemapSocial";
import TilemapSocialDBM from "../../interface/managers/TilemapSocialDBM";
import { TilemapSocialSchemaType } from "../types";
import { TilemapSocialModel } from "../schemas";

export default class MongooseTilemapSocialDBM implements TilemapSocialDBM {

    async getTilemapSocialByTilesetId(tilemapId: string): Promise<TilemapSocial | null> {
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
            owner: "",
            ownerName: "",
            collaborators: [],
            collaboratorNames: [],
            tags: [],
            description: "",
            communities: [],
            likes: [],
            dislikes: [],
            views: 0,
            permissions: [],
            comments: [],
            publishDate: new Date(Date.now()),
            imageURL: "",
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
            communities: social.communities.map((id) => id.toString()),
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
        social.communities = partial.communities ? partial.communities.map(id => new mongoose.Types.ObjectId(id)) : social.communities;
        social.likes = partial.likes ? partial.likes.map(id => new mongoose.Types.ObjectId(id)) : social.likes;
        social.dislikes = partial.dislikes ? partial.dislikes.map(id => new mongoose.Types.ObjectId(id)) : social.dislikes;
        social.views = partial.views ? partial.views : social.views;
        social.permissions = partial.permissions ? partial.permissions : social.permissions;
        social.comments = partial.comments ? partial.comments.map(id => new mongoose.Types.ObjectId(id)) : social.comments;
        social.publishDate = partial.publishDate ? partial.publishDate : social.publishDate;
        social.imageURL = partial.imageURL ? partial.imageURL : social.imageURL;
    }
    
}