import {
  Tileset,
  TilesetSocialStatistics,
  SocialStatisticsPermissions,
  Property,
  SortBy,
  Comment
} from "../../../types";
import { TilesetDBM } from "../../interface";
import TilesetSchema from "../../mongoose/schemas/tilemap";
import UserSchema from '../../mongoose/schemas/user'
import TilesetSocialStatisticsSchema from "../../mongoose/schemas/tileMapSocialStatistics";
import CommentSchema from '../schemas/Comment'
import { Schema } from "mongoose";
import { TilesetSchemaType, UserSchemaType, PropertySchemaType } from "../types";


export default class MongooseTilesetDBM implements TilesetDBM {

    /**
     * 
     * @auhtor Tuyen Vo
     */

    async addTilesetComment(payload: Comment): Promise<TilesetSocialStatistics | null> {
        if (payload !== null) {
            let refId = payload.referenceId
            let social: any = await TilesetSocialStatisticsSchema.findById(refId)
            if (social !== null) {
                let comment = await CommentSchema.create(payload)
                await comment.save()
                return {
                    tileset: social.tileset,
                    name: social.name,
                    owner: social.owner,
                    ownerName: social.ownerName,
                    tags: social.tags,
                    description: social.description,
                    communities: social.communities,
                    likes: social.likes,
                    dislikes: social.dislikes,
                    views: social.views,
                    permissions: social.permissions,
                    comments: social.comments,
                    publishDate: social.publishDate,
                    imageURL: social.imageURL
                }
            }
        }
        return null
    }
    async toggleLike(userId: string, socialId: string): Promise<TilesetSocialStatistics | null> {
        let user = await UserSchema.findById(userId)
        let social: any = await TilesetSocialStatisticsSchema.findById(socialId)
        if ((user !== null) && (social !== null)) {
            let id = user._id.toString()
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
                    tileset: social.tileset,
                    name: social.name,
                    owner: social.owner,
                    ownerName: social.ownerName,
                    tags: social.tags,
                    description: social.description,
                    communities: social.communities,
                    likes: social.likes,
                    dislikes: social.dislikes,
                    views: social.views,
                    permissions: social.permissions,
                    comments: social.comments,
                    publishDate: social.publishDate,
                    imageURL: social.imageURL
                }
            }
        }
        return null
    }
    async toggleDislike(userId: string, socialId: string): Promise<TilesetSocialStatistics | null> {
        let user = await UserSchema.findById(userId)
        let social: any = await TilesetSocialStatisticsSchema.findById(socialId)
        if ((user !== null) && social !== null) {
            let id = user._id.toString()
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
                    tileset: social.tileset,
                    name: social.name,
                    owner: social.owner,
                    ownerName: social.ownerName,
                    tags: social.tags,
                    description: social.description,
                    communities: social.communities,
                    likes: social.likes,
                    dislikes: social.dislikes,
                    views: social.views,
                    permissions: social.permissions,
                    comments: social.comments,
                    publishDate: social.publishDate,
                    imageURL: social.imageURL
                }
            }
        }
        return null
    }
    async addView(userId: string, socialId: string): Promise<TilesetSocialStatistics | null> {
        let user = await UserSchema.findById(userId)
        let social = await TilesetSocialStatisticsSchema.findById(socialId)
        if ((user !== null) && (social !== null)) {
            social.views++
            await social.save()
            return {
                tileset: social.tileset,
                name: social.name,
                owner: social.owner.toString(),
                ownerName: social.ownerName,
                tags: social.tags,
                description: social.description,
                communities: social.communities,
                likes: social.likes,
                dislikes: social.dislikes,
                views: social.views,
                permissions: social.permissions,
                comments: social.comments,
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
        await TilesetSchema.find(
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
                        id: partial._id?.toString(),
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
        await TilesetSchema.findById(
            tilesetId,
            function (err: Error, tileset: TilesetSchemaType) {
                if (err) {
                    return err.message;
                }
                return {
                    id: tileset._id.toString(),
                    columns: tileset.columns,
                    createDate: new Date(tileset.createdAt.toString()),
                    lastSaveDate: new Date(tileset.updatedAt.toString()),
                    image: tileset.image,
                    imageHeight: tileset.imageHeight,
                    imageWidth: tileset.imageWidth,
                    margin: tileset.margin,
                    name: tileset.name,
                    owner: tileset.owner.toString(),
                    properties: tileset.properties,
                    isPublished: tileset.isPublished,
                };
            }
        );
        return "unable to get tileset";
    }
    async createTileset(
        userId: string,
        tileset: Partial<Tileset>
    ): Promise<Tileset | string> {
        await TilesetSchema.findOne(
            { name: tileset.name },
            function (err: Error, tileset: TilesetSchemaType) {
                if (tileset)
                    return `tileset with the name ${tileset.name} already exists`;
            }
        );

        let user = new UserSchema();
        await UserSchema.findOne(
            { _id: userId },
            (err: Error, user: UserSchemaType) => {
                if (err) return err.message;
                user = user;
            }
        );

        const newTileset = new TilesetSchema({
            columns: tileset.columns === null ? 0 : tileset.columns,
            image: tileset.image === null ? "" : tileset.image,
            imageHeight: tileset.imageHeight === null ? 0 : tileset.imageHeight,
            imageWidth: tileset.imageWidth === null ? 0 : tileset.imageWidth,
            margin: tileset.margin === null ? 0 : tileset.margin,
            name: tileset.name,
            owner: tileset.owner,
            properties: tileset.properties === null ? [] : tileset.properties,
            isPublished: false,
        });

        newTileset.save().catch((err: Error) => {
            return err.message;
        });

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
    async updateTilesetById(
        tilesetId: string,
        tileset: Partial<Tileset>
    ): Promise<Tileset | string> {
        let updatedTileset: TilesetSchemaType = new TilesetSchema();
        await TilesetSchema.findOne(
            { _id: tilesetId },
            (err: Error, tileset: TilesetSchemaType) => {
                if (err) return err.message;
                updatedTileset = tileset;
            }
        );

        if (tileset.columns) updatedTileset.columns = tileset.columns;
        if (tileset.image) updatedTileset.image = tileset.image;
        if (tileset.imageHeight) updatedTileset.imageHeight = tileset.imageHeight;
        if (tileset.imageWidth) updatedTileset.imageWidth = tileset.imageWidth;
        if (tileset.margin) updatedTileset.margin = tileset.margin;
        if (tileset.name) updatedTileset.name = tileset.name;
        if (tileset.owner)
            updatedTileset.owner = new Schema.Types.ObjectId(tileset.owner);
        if (tileset.properties)
            updatedTileset.properties = <PropertySchemaType[]>tileset.properties;
        if (tileset.isPublished) updatedTileset.isPublished = tileset.isPublished;

        await TilesetSchema.findOneAndUpdate(
            { _id: tilesetId },
            updatedTileset,
            function (err: Error, tileset: TilesetSchemaType) {
                if (err) return err.message;
            }
        );

        return {
            id: updatedTileset._id.toString(),
            createDate: new Date(updatedTileset.createdAt.toString()),
            lastSaveDate: new Date(updatedTileset.updatedAt.toString()),
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
    async deleteTilesetById(
        tilesetId: string
    ): Promise<Partial<Tileset> | string> {
        let id: string;
        await TilesetSchema.findOneAndDelete(
            { _id: tilesetId },
            function (err: Error, tileset: TilesetSchemaType) {
                if (err) return err.message;
                id = tileset._id.toString();
            }
        );
        return { id: id! };
    }
}
