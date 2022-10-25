import mongoose, { Schema } from "mongoose";

import {
  Tileset,
  TilesetSocialStatistics,
  SocialStatisticsPermissions,
  Property,
  SortBy,
  Comment
} from "../../../types";
import { TilesetDBM } from "../../interface";
import { TilesetModel, CommentModel, UserModel, TilesetSocialModel } from "../schemas";
import { TilesetSchemaType, PropertySchemaType } from "../types";

/**
 * The mongoose database manager for working with tilesets in tiletown
 * @author Andrew Ojeda, Tuyen Vo, Peter Walsh
 */
export default class MongooseTilesetDBM implements TilesetDBM {

    /**
     * 
     * @auhtor Tuyen Vo
     */

    async addTilesetComment(payload: Comment): Promise<TilesetSocialStatistics | null> {
        if (payload !== null) {
            let refId = payload.referenceId
            let social = await TilesetSocialModel.findById(refId)
            if (social !== null) {
                let comment = await CommentModel.create(payload)
                await comment.save()
                return {
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
        }
        return null
    }
    async toggleLike(userId: string, socialId: string): Promise<TilesetSocialStatistics | null> {
        let user = await UserModel.findById(userId)
        let social = await TilesetSocialModel.findById(socialId)
        if ((user !== null) && (social !== null)) {
            let id = user._id;
            let likes = social.likes
            let dislikes = social.dislikes
            if (!dislikes.includes(id)) {
                if (likes.includes(id)) {
                    let i = likes.indexOf(id, 0)
                    likes.splice(i, 1)
                } else {
                    likes.push(id)
                }
                await social.save()
                return {
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
        }
        return null
    }
    async toggleDislike(userId: string, socialId: string): Promise<TilesetSocialStatistics | null> {
        let user = await UserModel.findById(userId)
        let social = await TilesetSocialModel.findById(socialId)
        if ((user !== null) && social !== null) {
            let id = user._id;
            let likes = social.likes
            let dislikes = social.dislikes
            if (!likes.includes(id)) {
                if (dislikes.includes(id)) {
                    let i = dislikes.indexOf(id, 0)
                    dislikes.splice(i, 1)
                } else {
                    dislikes.push(id)
                }
                await social.save()
                return {
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
        }
        return null
    }
    async addView(userId: string, socialId: string): Promise<TilesetSocialStatistics | null> {
        let user = await UserModel.findById(userId)
        let social = await TilesetSocialModel.findById(socialId)
        if ((user !== null) && (social !== null)) {
            social.views++
            await social.save()
            return {
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
        return null
    }

    updateTilesetPermissions(socialId: string, permissions: SocialStatisticsPermissions): Promise<TilesetSocialStatistics | null> {
        throw new Error("Method not implemented.");
    }

    //TODO Move sortBy to regex so it's done on database
    async getTilesetPartials(
        userId: string,
        search: string,
        sortBy: SortBy
    ): Promise<[Partial<Tileset>] | string> {
        await TilesetModel.find(
            {
                owner: userId,
                name: new RegExp(search, "i"),
                isPublish: { $ne: true },
            },
            function (err: any, tilesetPartials: [Partial<TilesetSchemaType>]) {
                if (err) {
                    console.log(err.message);
                    return err.message;
                }
                let partials: Partial<Tileset>[] = new Array();
                for (let partial of tilesetPartials) {
                    let newPartial: Partial<Tileset> = {
                        // id: partial._id?.toString(),
                        image: partial.image,
                        name: partial.name,
                        lastSaveDate: partial?.updatedAt,
                    };
                    partials.push(newPartial);
                }
                //TODO Figure out a better workaround this type checking
                //Possibly move to controller or database query
                switch (sortBy) {
                    case SortBy.Newest: {
                        partials.sort(function (a, b) {
                            if (a.lastSaveDate === null && b.lastSaveDate !== null) return -1;
                            if (b.lastSaveDate === null && a.lastSaveDate !== null) return 1;
                            if (a.lastSaveDate === null && b.lastSaveDate === null) return 0;
                            let aDate: any = new Date(<string>a.lastSaveDate?.toString());
                            let bDate: any = new Date(<string>b.lastSaveDate?.toString());
                            return <any>bDate - <any>aDate;
                        });
                        break;
                    }
                    case SortBy.Oldest: {
                        partials.sort(function (a, b) {
                            if (a.lastSaveDate === null && b.lastSaveDate !== null) return 1;
                            if (b.lastSaveDate === null && a.lastSaveDate !== null) return -1;
                            if (a.lastSaveDate === null && b.lastSaveDate === null) return 0;
                            let aDate: any = new Date(<string>a.lastSaveDate?.toString());
                            let bDate: any = new Date(<string>b.lastSaveDate?.toString());
                            return <any>aDate - <any>bDate;
                        });
                        break;
                    }
                    default:
                        break;
                }
                return partials;
            }
        );
        return "Unable to get Tilesets";
    }

    async getTilesetById(tilesetId: string): Promise<Tileset | string> {
        if (!mongoose.Types.ObjectId.isValid(tilesetId)) { return "Error"; }

        let tileset = await TilesetModel.findById(tilesetId);
        if (tileset === null) { return "Error"; }

        return {
            id: tileset._id.toString(),
            columns: tileset.columns,
            createDate: tileset.createdAt,
            lastSaveDate: tileset.updatedAt,
            image: tileset.image,
            imageHeight: tileset.imageHeight,
            imageWidth: tileset.imageWidth,
            margin: tileset.margin,
            name: tileset.name,
            owner: tileset.owner.toString(),
            properties: <any>tileset.properties,
            isPublished: tileset.isPublished,
        };
            
    }

    async createTileset(userId: string, tileset: Partial<Tileset>): Promise<Tileset | string> {
        if (!mongoose.Types.ObjectId.isValid(userId)) { return "Error"; }

        let existingTileset = await TilesetModel.findOne({ name: tileset.name });
        if (existingTileset !== null) { return "Error"; }

        let user = await UserModel.findById(userId);
        if (user === null) { return "Error"; }
        

        const newTileset = new TilesetModel({
            columns: tileset.columns === null ? 0 : tileset.columns,
            image: tileset.image === null ? "" : tileset.image,
            imageHeight: tileset.imageHeight === null ? 0 : tileset.imageHeight,
            imageWidth: tileset.imageWidth === null ? 0 : tileset.imageWidth,
            margin: tileset.margin === null ? 0 : tileset.margin,
            name: tileset.name,
            owner: user._id,
            properties: tileset.properties === null ? [] : tileset.properties,
            isPublished: false,
        });

        let savedTileset = await newTileset.save();

        return {
            id: newTileset._id.toString(),
            createDate: new Date(newTileset.createdAt),
            lastSaveDate: new Date(newTileset.updatedAt),
            columns: newTileset.columns,
            image: newTileset.image,
            imageHeight: newTileset.imageHeight,
            imageWidth: newTileset.imageWidth,
            margin: newTileset.margin,
            name: newTileset.name,
            owner: newTileset.owner.toString(),
            properties: <Property[]>newTileset.properties,
            isPublished: false,
        };
    }

    async updateTilesetById(tilesetId: string, tileset: Partial<Tileset>): Promise<Tileset | string> {
        if (!mongoose.Types.ObjectId.isValid(tilesetId)) { return "Error"; }

        let updatedTileset = await TilesetModel.findById(tilesetId);
        if (updatedTileset === null) { return "Error"; }

        updatedTileset.columns = tileset.columns ? tileset.columns : updatedTileset.columns;
        updatedTileset.image = tileset.image ? tileset.image : updatedTileset.image;
        updatedTileset.imageHeight = tileset.imageHeight ? tileset.imageHeight : updatedTileset.imageHeight;
        updatedTileset.imageWidth = tileset.imageWidth ? tileset.imageWidth : updatedTileset.imageWidth;
        updatedTileset.margin = tileset.margin ? tileset.margin : updatedTileset.margin;
        updatedTileset.name = tileset.name ? tileset.name : updatedTileset.name;
        updatedTileset.properties = tileset.properties ? <PropertySchemaType[]>tileset.properties : updatedTileset.properties;
        updatedTileset.isPublished = tileset.isPublished ? tileset.isPublished : updatedTileset.isPublished;
        updatedTileset.updatedAt = new Date(Date.now());

        if (tileset.owner) {
            let owner = await UserModel.findById(tileset.owner)
            updatedTileset.owner = owner !== null ? owner._id : updatedTileset.owner;
        }

        let savedTileset = await updatedTileset.save();

        return {
            id: updatedTileset._id.toString(),
            createDate: updatedTileset.createdAt,
            lastSaveDate: updatedTileset.updatedAt,
            columns: updatedTileset.columns,
            image: updatedTileset.image,
            imageHeight: updatedTileset.imageHeight,
            imageWidth: updatedTileset.imageWidth,
            margin: updatedTileset.margin,
            name: updatedTileset.name,
            owner: updatedTileset.owner.toString(),
            properties: <Property[]>updatedTileset.properties,
            isPublished: updatedTileset.isPublished,
        };
    }

    async deleteTilesetById(tilesetId: string): Promise<Partial<Tileset> | string> {
        if (!mongoose.Types.ObjectId.isValid(tilesetId)) { return "Error"; }

        let tileset = await TilesetModel.findOneAndDelete({ _id: tilesetId });
        if (tileset === null) { return "Error"; }

        return { 
            id: tileset._id.toString() 
        }
    }
}
