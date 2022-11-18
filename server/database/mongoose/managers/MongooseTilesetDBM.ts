import mongoose from "mongoose";

import { Tileset, SortBy } from "@types";
import { TilesetDBM } from "../../interface";
import { TilesetModel } from "../schemas";
import { TilesetSchemaType, PropertySchemaType } from "../types";

/**
 * The mongoose database manager for working with tilesets in tiletown
 * @author Andrew Ojeda, Tuyen Vo, Peter Walsh
 */
export default class MongooseTilesetDBM implements TilesetDBM {
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
                // switch (sortBy) {
                //     case SortBy.Newest: {
                //         partials.sort(function (a, b) {
                //             if (a.lastSaveDate === null && b.lastSaveDate !== null) return -1;
                //             if (b.lastSaveDate === null && a.lastSaveDate !== null) return 1;
                //             if (a.lastSaveDate === null && b.lastSaveDate === null) return 0;
                //             let aDate: any = new Date(<string>a.lastSaveDate?.toString());
                //             let bDate: any = new Date(<string>b.lastSaveDate?.toString());
                //             return <any>bDate - <any>aDate;
                //         });
                //         break;
                //     }
                //     case SortBy.Oldest: {
                //         partials.sort(function (a, b) {
                //             if (a.lastSaveDate === null && b.lastSaveDate !== null) return 1;
                //             if (b.lastSaveDate === null && a.lastSaveDate !== null) return -1;
                //             if (a.lastSaveDate === null && b.lastSaveDate === null) return 0;
                //             let aDate: any = new Date(<string>a.lastSaveDate?.toString());
                //             let bDate: any = new Date(<string>b.lastSaveDate?.toString());
                //             return <any>aDate - <any>bDate;
                //         });
                //         break;
                //     }
                //     default:
                //         break;
                // }
                return partials;
            }
        );
        return "Unable to get Tilesets";
    }

    /** OPERATIONS FOR TILESET CREATION AND EDITING */

    async getTilesetById(tilesetId: string): Promise<Tileset | null> {
        if (!mongoose.Types.ObjectId.isValid(tilesetId)) {
            return null;
        }

        let tileset = await TilesetModel.findById(tilesetId);
        if (tileset === null) {
            return null;
        }
        return this.parseTileset(tileset);
    }

    async getTilesetsById(tilesetIds: string[]): Promise<Tileset[]> {
        if (!tilesetIds.every((id) => mongoose.Types.ObjectId.isValid(id))) {
            return [];
        }
        let tilesets = await TilesetModel.find({ _id: { $in: tilesetIds } });
        return tilesets.map((tileset) => this.parseTileset(tileset));
    }

    async getTilesetByName(name: string): Promise<Tileset | null> {
        let tileset = await TilesetModel.findOne({ name: name });
        if (tileset === null) {
            return null;
        }
        return this.parseTileset(tileset);
    }

    async createTileset(userId: string, tileset: Partial<Tileset>): Promise<Tileset | null> {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return null;
        }

        let newTileset = new TilesetModel({
            columns: tileset.columns ? tileset.columns : 12,
            rows: tileset.rows ? tileset.rows : 12,
            tileHeight: tileset.tileHeight ? tileset.tileHeight : 12,
            tileWidth: tileset.tileWidth ? tileset.tileWidth : 12,
            image: tileset.image ? tileset.image : "dummy.jpg",
            imageHeight: tileset.imageHeight ? tileset.imageHeight : 144,
            imageWidth: tileset.imageWidth ? tileset.imageWidth : 144,
            margin: tileset.margin ? tileset.margin : 0,
            name: tileset.name,
            owner: userId,
            properties: tileset.properties ? tileset.properties : [],
            isPublished: false,
        });

        let savedTileset = await newTileset.save();

        return this.parseTileset(savedTileset);
    }

    async updateTilesetById(
        tilesetId: string,
        partial: Partial<Tileset>
    ): Promise<Tileset | null> {
        if (!mongoose.Types.ObjectId.isValid(tilesetId)) {
            return null;
        }

        let tileset = await TilesetModel.findById(tilesetId);
        if (tileset === null) {
            return null;
        }

        this.fillTileset(tileset, partial);
        let savedTileset = await tileset.save();

        return this.parseTileset(savedTileset);
    }

    async deleteTilesetById(tilesetId: string): Promise<Tileset | null> {
        if (!mongoose.Types.ObjectId.isValid(tilesetId)) {
            return null;
        }
        let tileset = await TilesetModel.findOneAndDelete({ _id: tilesetId });
        if (tileset === null) {
            return null;
        }
        return this.parseTileset(tileset);
    }

    protected parseTileset(tileset: TilesetSchemaType & { _id: mongoose.Types.ObjectId }): Tileset {
        return {
            id: tileset._id.toString(),
            columns: tileset.columns,
            rows: tileset.rows,
            createDate: tileset.createdAt,
            lastSaveDate: tileset.updatedAt,
            image: tileset.image,
            imageHeight: tileset.imageHeight,
            imageWidth: tileset.imageWidth,
            tileHeight: tileset.tileHeight,
            tileWidth: tileset.tileWidth,
            margin: tileset.margin,
            name: tileset.name,
            owner: tileset.owner.toString(),
            properties: <any>tileset.properties,
            isPublished: tileset.isPublished,
        };
    }
    protected fillTileset(tileset: TilesetSchemaType & { _id: mongoose.Types.ObjectId },
        partial: Partial<Tileset>
    ): void {
        tileset.columns = partial.columns ? partial.columns : tileset.columns;
        tileset.rows = partial.rows ? partial.rows : tileset.rows;
        tileset.image = partial.image ? partial.image : tileset.image;
        tileset.imageHeight = partial.imageHeight
            ? partial.imageHeight
            : tileset.imageHeight;
        tileset.imageWidth = partial.imageWidth
            ? partial.imageWidth
            : tileset.imageWidth;
        tileset.tileHeight = partial.tileHeight
            ? partial.tileHeight
            : tileset.tileHeight;
        tileset.tileWidth = partial.tileWidth
            ? partial.tileWidth
            : tileset.tileWidth;
        tileset.margin = partial.margin ? partial.margin : tileset.margin;
        tileset.name = partial.name ? partial.name : tileset.name;
        tileset.properties = partial.properties
            ? <PropertySchemaType[]>partial.properties
            : tileset.properties;
        tileset.isPublished = partial.isPublished
            ? partial.isPublished
            : tileset.isPublished;
        tileset.updatedAt = partial.lastSaveDate
            ? partial.lastSaveDate
            : tileset.updatedAt;
        tileset.createdAt = partial.createDate ? partial.createDate : tileset.createdAt;
    }
}
