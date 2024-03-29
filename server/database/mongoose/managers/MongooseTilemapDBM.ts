import mongoose from "mongoose";

import {
  Tilemap,
  CollaboratorSettings,
  Property,
  SortBy,
  Color,
  Orientation,
  RenderOrder,
} from "@types";

import { TilemapModel } from "../schemas";
import { TilemapDBM } from "../../interface";
import { TilemapSchemaType } from "../types";

export default class MongooseTilemapDBM implements TilemapDBM {
  async getTilemapById(tilemapId: string): Promise<Tilemap | null> {
    if (!mongoose.Types.ObjectId.isValid(tilemapId)) return null;
    let tilemap = await TilemapModel.findById(tilemapId);
    if (tilemap === null) return null;
    return this.parseTilemap(tilemap);
  }
  async getTilemapsById(tilemapIds: string[]): Promise<Tilemap[]> {
    if (!tilemapIds.every((id) => mongoose.Types.ObjectId.isValid(id))) {
      return [];
    }
    let tilemaps = await TilemapModel.find({ _id: { $in: tilemapIds } });
    return tilemaps.map((tilemap) => this.parseTilemap(tilemap));
  }
  async getTilemapByName(name: string): Promise<Tilemap | null> {
    let tilemap = await TilemapModel.findOne({ name: name });
    if (tilemap === null) return null;
    return this.parseTilemap(tilemap);
  }

  //TODO Move sortBy to regex so it's done on database
  async getTilemapPartials(
    userName: string,
    search: string,
    sortBy: SortBy
  ): Promise<Partial<Tilemap>[] | string> {
    const tilemaps = await TilemapModel.find({
      collaboratorNames: userName,
      name: new RegExp(search, "i"),
      isPublish: { $ne: true },
    });

    if (tilemaps == null) return "unable to get partials";
    let partials: Partial<Tilemap>[] = new Array();
    for (let map of tilemaps) {
      let partial: Partial<Tilemap> = {
        id: map._id.toString(),
        image: map.image,
        name: map.name,
        owner: map.owner,
        collaboratorNames: map.collaboratorNames,
        lastSaveDate: map.updatedAt,
      };
      partials.push(partial);
    }
    //TODO Figure out a better workaround this type checking
    //Possibly move to controller or database query
    // switch (sortBy) {
    //   case SortBy.Newest: {
    //     partials.sort(function (a, b) {
    //       if (a.lastSaveDate === null && b.lastSaveDate !== null) return -1;
    //       if (b.lastSaveDate === null && a.lastSaveDate !== null) return 1;
    //       if (a.lastSaveDate === null && b.lastSaveDate === null) return 0;
    //       let aDate: any = new Date(<string>a.lastSaveDate?.toString());
    //       let bDate: any = new Date(<string>b.lastSaveDate?.toString());
    //       return <any>bDate - <any>aDate;
    //     });
    //     break;
    //   }
    //   case SortBy.Oldest: {
    //     partials.sort(function (a, b) {
    //       if (a.lastSaveDate === null && b.lastSaveDate !== null) return 1;
    //       if (b.lastSaveDate === null && a.lastSaveDate !== null) return -1;
    //       if (a.lastSaveDate === null && b.lastSaveDate === null) return 0;
    //       let aDate: any = new Date(<string>a.lastSaveDate?.toString());
    //       let bDate: any = new Date(<string>b.lastSaveDate?.toString());
    //       return <any>aDate - <any>bDate;
    //     });
    //     break;
    //   }
    //   default:
    //     break;
    // }
    // console.log("partials");
    // console.log(partials);
    return partials;
  }

  async createTilemap(
    tilemap: Partial<Tilemap> & { owner: string; name: string }
  ): Promise<Tilemap | null> {
    if (!mongoose.Types.ObjectId.isValid(tilemap.owner)) return null;

    let newTilemap = new TilemapModel({ ...tilemap });
    let savedTilemap = await newTilemap.save();

    if (savedTilemap === null) return null;
    return this.parseTilemap(savedTilemap);
  }

  async updateTilemapById(
    tilemapId: string,
    partial: Partial<Tilemap>
  ): Promise<Tilemap | null> {
    // Verify user is valid mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(tilemapId)) return null;
    // Verify collaborators are all valid mongoose ObjectIds
    if (
      partial.collaborators &&
      partial.collaborators.some((c) => !mongoose.Types.ObjectId.isValid(c))
    ) {
      return null;
    }
    // Verify tilesets are all valid mongoose ObjectIds
    if (
      partial.tilesets &&
      partial.tilesets.some((t) => !mongoose.Types.ObjectId.isValid(t))
    ) {
      return null;
    }

    console.log("Tilesets in DB update: " + partial?.tilesets);

    let tilemap = await TilemapModel.findById(tilemapId);
    if (tilemap === null) return null;

    this.fillTilemapModel(tilemap, partial);
    let savedTilemap = await tilemap.save();

    return this.parseTilemap(savedTilemap);
  }
  async deleteTilemapById(tilemapId: string): Promise<Tilemap | null> {
    if (!mongoose.Types.ObjectId.isValid(tilemapId)) return null;

    let tilemap = await TilemapModel.findByIdAndDelete(tilemapId);
    if (tilemap === null) return null;

    return this.parseTilemap(tilemap);
  }

  async getUserCollaboratedTilemaps(userId: string): Promise<Tilemap[]> {
    let tilemaps = await TilemapModel.find({collaborators: {$all: [userId]}})
    return tilemaps.map(x => this.parseTilemap(x))
  }

  protected parseTilemap(
    tilemap: TilemapSchemaType & { _id: mongoose.Types.ObjectId }
  ): Tilemap {
    return {
      id: tilemap._id.toString(),
      backgroundColor: <Color>tilemap.backgroundColor,
      collaborators: tilemap.collaborators.map((x) => x.toString()),
      collaboratorNames: tilemap.collaboratorNames,
      collaboratorSettings: <CollaboratorSettings>tilemap.collaboratorSettings,
      collaboratorIndex: tilemap.collaboratorIndex,
      createDate: new Date(tilemap.createdAt),
      lastSaveDate: new Date(tilemap.updatedAt),
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
      globalTileIDs: tilemap.globalTileIDs,
    };
  }
  protected fillTilemapModel(
    tilemap: TilemapSchemaType & { _id: mongoose.Types.ObjectId },
    partial: Partial<Tilemap>
  ): void {
    tilemap.backgroundColor = partial.backgroundColor
      ? partial.backgroundColor
      : tilemap.backgroundColor;
    tilemap.collaborators = partial.collaborators
      ? partial.collaborators.map((id) => new mongoose.Types.ObjectId(id))
      : tilemap.collaborators;
    tilemap.collaboratorNames = partial.collaboratorNames
      ? partial.collaboratorNames
      : tilemap.collaboratorNames;
    tilemap.collaboratorSettings = partial.collaboratorSettings
      ? partial.collaboratorSettings
      : tilemap.collaboratorSettings;
    tilemap.collaboratorIndex =
      partial.collaboratorIndex !== undefined
        ? partial.collaboratorIndex
        : tilemap.collaboratorIndex;
    tilemap.image = partial.image ? partial.image : tilemap.image;
    tilemap.height = partial.height ? partial.height : tilemap.height;
    tilemap.width = partial.width ? partial.width : tilemap.width;
    tilemap.layers = partial.layers ? partial.layers : tilemap.layers;
    tilemap.tileHeight = partial.tileHeight
      ? partial.tileHeight
      : tilemap.tileHeight;
    tilemap.tileWidth = partial.tileWidth
      ? partial.tileWidth
      : tilemap.tileWidth;
    tilemap.nextLayerId = partial.nextLayerId
      ? partial.nextLayerId
      : tilemap.nextLayerId;
    tilemap.nextObjectId = partial.nextObjectId
      ? partial.nextObjectId
      : tilemap.nextObjectId;
    tilemap.orientation = partial.orientation
      ? partial.orientation
      : tilemap.orientation;
    tilemap.name = partial.name ? partial.name : tilemap.name;
    tilemap.owner = partial.owner ? partial.owner : tilemap.owner;
    tilemap.properties = partial.properties
      ? partial.properties
      : tilemap.properties;
    tilemap.renderOrder = partial.renderOrder
      ? partial.renderOrder
      : tilemap.renderOrder;
    tilemap.isPublished = partial.isPublished
      ? partial.isPublished
      : tilemap.isPublished;
    tilemap.globalTileIDs = partial.globalTileIDs
      ? partial.globalTileIDs
      : tilemap.globalTileIDs;
    tilemap.createdAt = partial.createDate
      ? partial.createDate
      : tilemap.createdAt;
    tilemap.updatedAt = partial.createDate
      ? partial.createDate
      : tilemap.updatedAt;
    tilemap.tilesets = partial.tilesets
      ? partial.tilesets.map((id) => new mongoose.Types.ObjectId(id))
      : tilemap.tilesets;
  }
}
