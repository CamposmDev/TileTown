import mongoose, { Schema } from "mongoose";

import {
    Tilemap,
    CollaboratorSettings,
    TilemapSocialStatistics,
    SocialStatisticsPermissions,
    Layer,
    Property,
    SortBy,
    Color,
    Comment,
    EditMode,
    Orientation,
    RenderOrder,
} from "../../../types";

import {
    TilemapSchema,
    UserSchema,
    CommentSchema,
    TilemapSocialSchema,
} from "../schemas";
import { TilemapDBM } from "../../interface";
import {
    TilemapSchemaType,
    UserSchemaType,
    LayerSchemaType,
    PropertySchemaType,
} from "../types";

const ObjectId = mongoose.Types.ObjectId;

export default class MongooseTilemapDBM implements TilemapDBM {

    async getTilemapById(tilemapId: string): Promise<Tilemap | string> {
        let tilemap = await TilemapSchema.findById(tilemapId)
        if (tilemap === null) return "unable to get tilemap";

        return {
            id: tilemap._id.toString(),
            backgroundColor: <Color>tilemap.backgroundColor,
            collaborators: tilemap.collaborators.map((x) => x.toString()),
            collaboratorNames: tilemap.collaboratorNames,
            collaboratorSettings: <CollaboratorSettings>(
                tilemap.collaboratorSettings
            ),
            collaboratorIndex: tilemap.collaboratorIndex,
            createDate: new Date(tilemap.createdAt.toString()),
            lastSaveDate: new Date(tilemap.updatedAt.toString()),
            image: tilemap.image,
            height: tilemap.height,
            width: tilemap.width,
            layers: <any>tilemap.layers,
            tileHeight: tilemap.tileHeight,
            tileWidth: tilemap.tileWidth,
            nextLayerId: tilemap.nextLayerId,
            nextObjectId: tilemap.nextObjectId,
            orientation: <Orientation>tilemap.orientation,
            name: tilemap.name,
            owner: tilemap.owner,
            properties: <Property[]>tilemap.properties,
            renderOrder: <RenderOrder>tilemap.renderOrder,
            tilesets: tilemap.tilesets.map((x) => x.toString()),
            isPublished: tilemap.isPublished,
            globalTileIDs: tilemap.globalTileIDs
        };
            
    }
    //TODO Move sortBy to regex so it's done on database
    async getTilemapPartials(
        userId: string,
        search: string,
        sortBy: SortBy
    ): Promise<[Partial<Tilemap>] | string> {
        await TilemapSchema.find(
            {
                collaboratorSettings: [userId],
                name: new RegExp(search, "i"),
                isPublish: { $ne: true },
            },
            function (err: any, tilemapPartials: [Partial<TilemapSchemaType>]) {
                if (err) {
                    console.log(err.message);
                    return err.message;
                }
                let partials: Partial<Tilemap>[] = new Array();
                for (let partial of tilemapPartials) {
                    let newPartial: Partial<Tilemap> = {
                        // id: partial._id.toString(),
                        image: partial.image,
                        name: partial.name,
                        owner: partial.owner,
                        collaboratorNames: partial.collaboratorNames,
                        lastSaveDate: partial.updatedAt,
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
        return "Unable to get Tilemaps";
    }
    async createTilemap(userId: string, tilemap: Partial<Tilemap>): Promise<Tilemap | string> {
        let existingTilemap = await TilemapSchema.findOne({ name: tilemap.name });
        if (existingTilemap !== null) return "Error message";

        
        let user = await UserSchema.findOne({ _id: userId });
        if (user === null) return "Error Message";

        let newTilemap = new TilemapSchema({
            backgroundColor:
            tilemap.backgroundColor === null ? "#FFFFFF" : tilemap.backgroundColor,
            collaborators: [],
            collaboratorNames: [],
            collaboratorSettings: { editMode: "free", timeLimit: 0, tileLimit: 0 },
            collaboratorIndex: -1,
            image: tilemap.image === null ? "" : tilemap.image,
            height: tilemap.height === null ? 12 : tilemap.height,
            width: tilemap.width === null ? 12 : tilemap.width,
            layers: tilemap.layers === null ? [] : tilemap.layers,
            tileHeight: tilemap.tileHeight === null ? -1 : tilemap.tileHeight,
            tileWidth: tilemap.tileWidth === null ? -1 : tilemap.tileWidth,
            nextLayerId: tilemap.nextLayerId === null ? 0 : tilemap.nextLayerId,
            nextObjectId: tilemap.nextObjectId === null ? 0 : tilemap.nextObjectId,
            orientation: "orthogonal",
            name: tilemap.name,
            owner: user._id,
            tilesets: tilemap.tilesets === null ? [] : tilemap.tilesets,
            globalTileIDs: tilemap.globalTileIDs == null ? [0] : tilemap.globalTileIDs,
            properties: tilemap.properties === null ? 0 : tilemap.properties,
            renderOrder: tilemap.renderOrder === null ? "right-down" : tilemap.renderOrder,
            isPublished: false,
        });

        let savedTilemap = await newTilemap.save();

        return {
            id: newTilemap._id.toString(),
            createDate: newTilemap.createdAt,
            lastSaveDate: newTilemap.updatedAt,
            backgroundColor: <Color>newTilemap.backgroundColor,
            collaborators: [],
            collaboratorNames: [],
            collaboratorSettings: { editMode: "free", timeLimit: 0, tileLimit: 0 },
            collaboratorIndex: -1,
            image: newTilemap.image,
            height: newTilemap.height,
            width: newTilemap.width,
            layers: <any>newTilemap.layers,
            tileHeight: newTilemap.tileHeight,
            tileWidth: newTilemap.tileWidth,
            nextLayerId: newTilemap.nextLayerId,
            nextObjectId: newTilemap.nextObjectId,
            orientation: "orthogonal",
            name: newTilemap.name,
            owner: user._id.toString(),
            globalTileIDs: newTilemap.globalTileIDs,
            tilesets: newTilemap.tilesets.map((x) => x.toString()),
            properties: <Property[]>newTilemap.properties,
            renderOrder: <RenderOrder>newTilemap.renderOrder,
            isPublished: false,
        };
    }
    async updateTilemapById(tilemapId: string, tilemap: Partial<Tilemap>): Promise<Tilemap | string> {
        
        let tm = await TilemapSchema.findOne({ _id: tilemapId });
        if (tm === null) return "Error Message";

        tm.backgroundColor = tilemap.backgroundColor ? tilemap.backgroundColor : tm.backgroundColor;
        tm.collaboratorNames = tilemap.collaboratorNames ? tilemap.collaboratorNames : tm.collaboratorNames;
        tm.collaboratorSettings = tilemap.collaboratorSettings ? tilemap.collaboratorSettings : tm.collaboratorSettings;
        tm.collaboratorIndex = tilemap.collaboratorIndex ? tilemap.collaboratorIndex : tm.collaboratorIndex;
        tm.image = tilemap.image ? tilemap.image : tm.image;
        tm.height = tilemap.height ? tilemap.height : tm.height;
        tm.width = tilemap.width ? tilemap.width : tm.width;
        tm.layers = tilemap.layers ? tilemap.layers : tm.layers;
        tm.tileHeight = tilemap.tileHeight ? tilemap.tileHeight : tm.tileHeight;
        tm.tileWidth = tilemap.tileWidth ? tilemap.tileWidth : tm.tileWidth;
        tm.nextLayerId = tilemap.nextLayerId ? tilemap.nextLayerId : tm.nextLayerId;
        tm.nextObjectId = tilemap.nextObjectId ? tilemap.nextObjectId : tm.nextObjectId;
        tm.orientation = tilemap.orientation ? tilemap.orientation : tm.orientation;
        tm.name = tilemap.name ? tilemap.name : tm.name;
        tm.owner = tilemap.owner ? tilemap.owner : tm.owner;
        tm.properties = tilemap.properties ? tilemap.properties : tm.properties;
        tm.renderOrder = tilemap.renderOrder ? tilemap.renderOrder : tm.renderOrder;
        tm.isPublished = tilemap.isPublished ? tilemap.isPublished : tm.isPublished;
        tm.globalTileIDs = tilemap.globalTileIDs ? tilemap.globalTileIDs : tm.globalTileIDs;

        if (tilemap.collaborators) {
            let colabs = new Array<mongoose.Types.ObjectId>();
            for (let id of tilemap.collaborators) {
                if (ObjectId.isValid(id)) {
                    let user = await UserSchema.findById(id);
                    if (user !== null) {
                        colabs.push(user._id);
                    }
                }
            }
            tm.collaborators = colabs;
        }
        
        if (tilemap.tilesets) {
            let tilesets = new Array<mongoose.Types.ObjectId>();
            for (let id of tilemap.tilesets) {
                if (ObjectId.isValid(id)) {
                    let user = await UserSchema.findById(id);
                    if (user !== null) {
                        tilesets.push(user._id);
                    }
                }
            }
            tm.tilesets = tilesets;
        }

        await tm.save();

        return {
            id: tm._id.toString(),
            backgroundColor: <Color>tm.backgroundColor,
            collaborators: tm.collaborators.map((x) => x.toString()),
            collaboratorNames: tm.collaboratorNames,
            collaboratorSettings: <CollaboratorSettings>(
                tm.collaboratorSettings
            ),
            collaboratorIndex: tm.collaboratorIndex,
            createDate: new Date(tm.createdAt.toString()),
            lastSaveDate: new Date(tm.updatedAt.toString()),
            image: tm.image,
            height: tm.height,
            width: tm.width,
            layers: <any>tm.layers,
            tileHeight: tm.tileHeight,
            tileWidth: tm.tileWidth,
            nextLayerId: tm.nextLayerId,
            nextObjectId: tm.nextObjectId,
            orientation: <Orientation>tm.orientation,
            globalTileIDs: tm.globalTileIDs,
            name: tm.name,
            owner: tm.owner,
            properties: <Property[]>tm.properties,
            renderOrder: <RenderOrder>tm.renderOrder,
            tilesets: tm.tilesets.map((x) => x.toString()),
            isPublished: tm.isPublished,
        };
    }
    async deleteTilemapById(tilemapId: string): Promise<Partial<Tilemap> | string> {
        let id: string;
        await TilemapSchema.findOneAndDelete(
            { _id: tilemapId },
            function (err: Error, tilemap: TilemapSchemaType) {
                if (err) return err.message;
                // id = tilemap._id.toString();
            }
        );
        return { id: id! };
    }

    /**
     * @author Tuyen Vo
     */
    async addTilemapComment(
        payload: Comment
    ): Promise<TilemapSocialStatistics | null> {
        if (payload !== null) {
            let refId = payload.referenceId;
            let social = await TilemapSocialSchema.findById(refId);
            if (social !== null) {
                let comment = await CommentSchema.create(payload);
                await comment.save();
                return {
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
                    imageURL: social.imageURL,
                };
            }
        }
        return null;
    }

    async toggleLike(
        userId: string,
        socialId: string
    ): Promise<TilemapSocialStatistics | null> {
        let user = await UserSchema.findById(userId);
        let social = await TilemapSocialSchema.findById(socialId);
        if (user !== null && social !== null) {
            let id = user._id;
            let likes = social.likes;
            let dislikes = social.dislikes;
            if (!dislikes.includes(id)) {
                if (likes.includes(id)) {
                    let i = likes.indexOf(id, 0);
                    likes.splice(i, 1);
                } else {
                    likes.push(id);
                }
                await social.save();
                return {
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
                    imageURL: social.imageURL,
                };
            }
        }
        return null;
    }

    async toggleDislike(
        userId: string,
        socialId: string
    ): Promise<TilemapSocialStatistics | null> {
        let user = await UserSchema.findById(userId);
        let social = await TilemapSocialSchema.findById(socialId);
        if (user !== null && social !== null) {
            let id = user._id;
            let likes = social.likes;
            let dislikes = social.dislikes;
            if (!likes.includes(id)) {
                if (dislikes.includes(id)) {
                    let i = dislikes.indexOf(id, 0);
                    dislikes.splice(i, 1);
                } else {
                    dislikes.push(id);
                }
                await social.save();
                return {
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
                    imageURL: social.imageURL,
                };
            }
        }
        return null;
    }

    async addView(
        userId: string,
        socialId: string
    ): Promise<TilemapSocialStatistics | null> {
        let user = await UserSchema.findById(userId);
        let social = await TilemapSocialSchema.findById(socialId);
        if (user !== null && social !== null) {
            social.views++;
            await social.save();
            return {
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
                imageURL: social.imageURL,
            };
        }
        return null;
    }
    updateTilemapPermissions(
        socialId: string,
        permissions: SocialStatisticsPermissions
    ): Promise<TilemapSocialStatistics | null> {
        throw new Error("Method not implemented.");
    }
}
