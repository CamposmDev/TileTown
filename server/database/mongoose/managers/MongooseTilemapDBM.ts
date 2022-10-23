import {
  Tilemap,
  CollaboratorSettings,
  TilemapSocialStatistics,
  SocialStatisticsPermissions,
  Layer,
  Property,
  SortBy,
} from "../../../types";
import TilemapSchema from "../../mongoose/schemas/tilemap";
import UserSchema from "../../mongoose/schemas/user";
import { TilemapDBM } from "../../interface";
import TilemapSchemaType from "../types/TilemapSchemaType";
import { EditMode, Orientation, RenderOrder } from "../../../types/Tilemap";
import UserSchemaType from "../types/UserSchemaType";
import { ObjectId } from "mongoose";
import { Schema } from "mongoose";
import LayerSchemaType from "../types/LayerSchemaType";
import PropertySchemaType from "../types/PropertySchemaType";

export default class MongooseTilemapDBM implements TilemapDBM {
  async getTilemapById(tilemapId: string): Promise<Tilemap | string> {
    await TilemapSchema.findById(
      tilemapId,
      function (err: Error, tilemap: TilemapSchemaType) {
        if (err) {
          console.log(err.message);
          return err.message;
        }
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
          layers: <Layer[]>tilemap.layers,
          tileHeight: tilemap.tileHeight,
          tileWidth: tilemap.tileWidth,
          nextLayerId: tilemap.nextLayerId,
          nextObjectId: tilemap.nextObjectId,
          orientation: tilemap.orientation,
          name: tilemap.name,
          owner: tilemap.owner,
          properties: <Property[]>tilemap.properties,
          renderOrder: <RenderOrder>tilemap.renderOrder,
          tilesets: tilemap.tilesets.map((x) => x.toString()),
          isPublished: tilemap.isPublished,
        };
      }
    );
    return "unable to get tilemap";
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
            id: partial._id?.toString(),
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
  async createTilemap(
    userId: string,
    tilemap: Partial<Tilemap>
  ): Promise<Tilemap | string> {
    await TilemapSchema.findOne(
      { name: tilemap.name },
      function (err: Error, tilemap: TilemapSchemaType) {
        if (tilemap)
          return `tilemap with the name ${tilemap.name} already exists`;
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

    const newTilemap = new TilemapSchema({
      backgroundColor: "#FFFFFF",
      collaborators: [],
      collaboratorNames: [],
      collaboratorSettings: { editMode: "free", timeLimit: 0, tileLimit: 0 },
      collaboratorIndex: -1,
      image: "",
      height: tilemap.height === null ? 12 : tilemap.height,
      width: tilemap.width === null ? 12 : tilemap.width,
      layers: [],
      tileHeight: tilemap.tileHeight === null ? -1 : tilemap.tileHeight,
      tileWidth: tilemap.tileWidth === null ? -1 : tilemap.tileWidth,
      nextLayerId: 0,
      nextObjectId: 0,
      orientation: "orthogonal",
      name: tilemap.name,
      owner: user._id,
      tilesets: tilemap.tilesets === null ? [] : tilemap.tilesets,
      globalTileIDs:
        tilemap.globalTileIDs == null ? [0] : tilemap.globalTileIDs,
      properties: [],
      renderOrder: "right-down",
      isPublished: false,
    });

    newTilemap.save().catch((err: Error) => {
      return err.message;
    });

    return {
      id: newTilemap._id.toString(),
      createDate: new Date(newTilemap.createdAt),
      lastSaveDate: new Date(newTilemap.updatedAt),
      backgroundColor: "#FFFFFF",
      collaborators: [],
      collaboratorNames: [],
      collaboratorSettings: { editMode: "free", timeLimit: 0, tileLimit: 0 },
      collaboratorIndex: -1,
      image: "",
      height: newTilemap.height,
      width: newTilemap.width,
      layers: [],
      tileHeight: newTilemap.tileHeight,
      tileWidth: newTilemap.tileWidth,
      nextLayerId: 0,
      nextObjectId: 0,
      orientation: "orthogonal",
      name: newTilemap.name,
      owner: user._id,
      globalTileIDs: newTilemap.globalTileIDs,
      tilesets: newTilemap.tilesets.map((x) => x.toString()),
      properties: [],
      renderOrder: "right-down",
      isPublished: false,
    };
  }
  async updateTilemapById(
    tilemapId: string,
    tilemap: Partial<Tilemap>
  ): Promise<Tilemap | string> {
    let updatedTilemap: TilemapSchemaType = new TilemapSchema();
    await TilemapSchema.findOne(
      { _id: tilemapId },
      (err: Error, tilemap: TilemapSchemaType) => {
        if (err) return err.message;
        updatedTilemap = tilemap;
      }
    );
    if (tilemap.backgroundColor)
      updatedTilemap.backgroundColor = tilemap.backgroundColor;
    if (tilemap.collaborators)
      updatedTilemap.collaborators = tilemap.collaborators.map(
        (x) => new Schema.Types.ObjectId(x)
      );
    if (tilemap.collaboratorNames)
      updatedTilemap.collaboratorNames = tilemap.collaboratorNames;
    if (tilemap.collaboratorSettings)
      updatedTilemap.collaboratorSettings = tilemap.collaboratorSettings;
    if (tilemap.collaboratorIndex)
      updatedTilemap.collaboratorIndex = tilemap.collaboratorIndex;
    if (tilemap.image) updatedTilemap.image = tilemap.image;
    if (tilemap.height) updatedTilemap.height = tilemap.height;
    if (tilemap.width) updatedTilemap.width = tilemap.width;
    if (tilemap.layers)
      updatedTilemap.layers = <LayerSchemaType[]>tilemap.layers;
    if (tilemap.tileHeight) updatedTilemap.tileHeight = tilemap.tileHeight;
    if (tilemap.tileWidth) updatedTilemap.tileWidth = tilemap.tileWidth;
    if (tilemap.nextLayerId) updatedTilemap.nextLayerId = tilemap.nextLayerId;
    if (tilemap.nextObjectId)
      updatedTilemap.nextObjectId = tilemap.nextObjectId;
    if (tilemap.orientation) updatedTilemap.orientation = tilemap.orientation;
    if (tilemap.name) updatedTilemap.name = tilemap.name;
    if (tilemap.owner) updatedTilemap.owner = tilemap.owner;
    if (tilemap.tilesets)
      updatedTilemap.tilesets = tilemap.tilesets.map(
        (x) => new Schema.Types.ObjectId(x)
      );
    if (tilemap.globalTileIDs)
      updatedTilemap.globalTileIDs = tilemap.globalTileIDs;
    if (tilemap.properties)
      updatedTilemap.properties = <PropertySchemaType[]>tilemap.properties;
    if (tilemap.renderOrder) updatedTilemap.renderOrder = tilemap.renderOrder;
    if (tilemap.isPublished) updatedTilemap.isPublished = tilemap.isPublished;

    await TilemapSchema.findOneAndUpdate(
      { _id: tilemapId },
      updatedTilemap,
      function (err: Error, tilemap: TilemapSchemaType) {
        if (err) return err.message;
      }
    );

    return {
      id: updatedTilemap._id.toString(),
      backgroundColor: <Color>updatedTilemap.backgroundColor,
      collaborators: updatedTilemap.collaborators.map((x) => x.toString()),
      collaboratorNames: updatedTilemap.collaboratorNames,
      collaboratorSettings: <CollaboratorSettings>(
        updatedTilemap.collaboratorSettings
      ),
      collaboratorIndex: updatedTilemap.collaboratorIndex,
      createDate: new Date(updatedTilemap.createdAt.toString()),
      lastSaveDate: new Date(updatedTilemap.updatedAt.toString()),
      image: updatedTilemap.image,
      height: updatedTilemap.height,
      width: updatedTilemap.width,
      layers: <Layer[]>updatedTilemap.layers,
      tileHeight: updatedTilemap.tileHeight,
      tileWidth: updatedTilemap.tileWidth,
      nextLayerId: updatedTilemap.nextLayerId,
      nextObjectId: updatedTilemap.nextObjectId,
      orientation: <Orientation>updatedTilemap.orientation,
      globalTileIDs: updatedTilemap.globalTileIDs,
      name: updatedTilemap.name,
      owner: updatedTilemap.owner,
      properties: <Property[]>updatedTilemap.properties,
      renderOrder: <RenderOrder>updatedTilemap.renderOrder,
      tilesets: updatedTilemap.tilesets.map((x) => x.toString()),
      isPublished: updatedTilemap.isPublished,
    };
  }
  async deleteTilemapById(
    tilemapId: string
  ): Promise<Partial<Tilemap> | string> {
    let id: string;
    await TilemapSchema.findOneAndDelete(
      { _id: tilemapId },
      function (err: Error, tilemap: TilemapSchemaType) {
        if (err) return err.message;
        id = tilemap._id.toString();
      }
    );
    return { id: id! };
  }

  addTilemapComment(
    userId: string,
    socialId: string
  ): Promise<TilemapSocialStatistics | string> {
    throw new Error("Method not implemented.");
  }
  toggleLike(
    userId: string,
    socialId: string
  ): Promise<TilemapSocialStatistics | string> {
    throw new Error("Method not implemented.");
  }
  toggleDislike(
    userId: string,
    socialId: string
  ): Promise<TilemapSocialStatistics | string> {
    throw new Error("Method not implemented.");
  }
  addView(
    userId: string,
    socialId: string
  ): Promise<TilemapSocialStatistics | string> {
    throw new Error("Method not implemented.");
  }
  updateTilemapPermissions(
    socialId: string,
    permissions: SocialStatisticsPermissions
  ): Promise<TilemapSocialStatistics | string> {
    throw new Error("Method not implemented.");
  }
}
