import mongoose from "mongoose";
import { Tileset, TilesetSocial, TilesetSocialQuery } from "@types";
import TilesetSocialDBM from "../../interface/managers/TilesetSocialDBM";
import { TilesetSocialModel } from "../schemas/TilesetSocialModel";
import TilesetSocialSchemaType from "../types/TilesetSocialSchemaType";

export default class MongooseTilesetSocialDBM implements TilesetSocialDBM {

    async getTilesetSocialById(socialId: string): Promise<TilesetSocial | null> {
        if (!mongoose.Types.ObjectId.isValid(socialId)) {
            return null;
        }
        let social = await TilesetSocialModel.findById(socialId);
        if (social === null) { return null; }
        return this.parseSocial(social);
    }
    async getTilesetSocialByTilesetId(tilesetId: string) : Promise<TilesetSocial | null> {
        if (!mongoose.Types.ObjectId.isValid(tilesetId)) { 
            return null;
        }
        let social = await TilesetSocialModel.findOne({tileset: tilesetId});
        if (social === null) { return null; }
        return this.parseSocial(social);
    }   
    async createTilesetSocial(tilesetId: string, partial: Partial<TilesetSocial>): Promise<TilesetSocial | null> {
        if (!mongoose.Types.ObjectId.isValid(tilesetId)) {
            return null;
        }

        let social = await TilesetSocialModel.create({
            tileSet: tilesetId,
            name: partial.name ? partial.name : "Tileset name",
            owner: partial.owner ? partial.owner : new mongoose.Types.ObjectId(),
            ownerName: partial.ownerName ? partial.ownerName : "Owner",
            tags: partial.tags ? partial.tags : [],
            description: partial.description ? partial.description : "Description",
            communities: partial.communities ? partial.communities : [],
            likes: [],
            dislikes: [],
            views: 0, 
            permissions: partial.permissions ? partial.permissions : [],
            comments: [],
            publishDate: new Date(Date.now()),
            imageURL: partial.imageURL ? partial.imageURL : "missing-image-url"
        });

        let savedSocial = await social.save();
        return this.parseSocial(savedSocial);
    }
    async updateTilesetSocial(socialId: string, partial: Partial<Tileset>): Promise<TilesetSocial | null> {
        if (!mongoose.Types.ObjectId.isValid(socialId)) return null;
        let social = await TilesetSocialModel.findById(socialId);
        if (social === null) return null;
        this.fillSocial(social, partial);
        let savedSocial = await social.save();
        return this.parseSocial(savedSocial);
    }

    async getTilesetSocials(query: TilesetSocialQuery): Promise<TilesetSocial[]> {

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
        
        if (query.tags.length !== 0) {
            socials = await TilesetSocialModel.find({$and: [
                { name: new RegExp(`^${query.name}`, "i") },
                { tags: {$elemMatch : { $in: query.tags } }},
                ]}).sort(sort);
        } else {
            socials = await TilesetSocialModel.find({$and: [
                { name: new RegExp(`^${query.name}`, "i") }
                ]}
            ).sort(sort);
        }

        return socials.map(s => this.parseSocial(s));
    }

    protected parseSocial(social: TilesetSocialSchemaType & {_id: mongoose.Types.ObjectId}): TilesetSocial {
        return {
            id: social._id.toString(),
            tileset: social.tileSet.toString(),
            name: social.name,
            owner: social.owner.toString(),
            ownerName: social.ownerName,
            tags: social.tags,
            description: social.description,
            communities: social.communities.map(id => id.toString()),
            likes: social.likes.map(id => id.toString()),
            dislikes: social.dislikes.map(id => id.toString()),
            views: social.views,
            permissions: social.permissions,
            comments: social.comments.map(id => id.toString()),
            publishDate: social.publishDate,
            imageURL: social.imageURL
        }
    }
    protected fillSocial(social: TilesetSocialSchemaType & {_id: mongoose.Types.ObjectId}, partial: Partial<TilesetSocial>): void {
        social.tileSet = partial.tileset ? new mongoose.Types.ObjectId(partial.tileset) : social.tileSet;
        social.name = partial.name ? partial.name : social.name;
        social.owner = partial.owner ? new mongoose.Types.ObjectId(partial.owner) : social.owner;
        social.ownerName = partial.ownerName ? partial.ownerName : social.ownerName;
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