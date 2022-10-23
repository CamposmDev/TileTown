import {
  Tileset,
  TilesetSocialStatistics,
  SocialStatisticsPermissions,
  Property,
} from "../../../types";
import { TilesetDBM } from "../../interface";
import TilesetSchemaType from "../types/TilesetSchemaType";
import TilesetSchema from "../schemas/tileset";
import UserSchemaType from "../types/UserSchemaType";
import UserSchema from "../schemas/user";
import { ObjectId } from "mongoose";
import { Schema } from "mongoose";

export default class MongooseTilesetDBM implements TilesetDBM {
  async getTileSetPartials(
    userId: string,
    search: string,
    sortBy: string
  ): Promise<string | Tileset> {
    throw new Error("Method not implemented.");
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
          createdDate: new Date(tileset.createdAt.toString()),
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
      createdDate: new Date(newTileset.createdAt),
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
    throw new Error("Method not implemented.");
  }
  async deleteTilesetById(tilesetId: string): Promise<Tileset | string> {
    throw new Error("Method not implemented.");
  }
  async addTilesetComment(
    userId: string,
    socialId: string
  ): Promise<TilesetSocialStatistics | string> {
    throw new Error("Method not implemented.");
  }
  async toggleLike(
    userId: string,
    socialId: string
  ): Promise<TilesetSocialStatistics | string> {
    throw new Error("Method not implemented.");
  }
  async toggleDislike(
    userId: string,
    socialId: string
  ): Promise<TilesetSocialStatistics | string> {
    throw new Error("Method not implemented.");
  }
  async addView(
    userId: string,
    socialId: string
  ): Promise<TilesetSocialStatistics | string> {
    throw new Error("Method not implemented.");
  }
  async updateTilesetPermissions(
    socialId: string,
    permissions: SocialStatisticsPermissions
  ): Promise<TilesetSocialStatistics | string> {
    throw new Error("Method not implemented.");
  }
  async addTilemapComment(
    userId: string,
    socialId: string
  ): Promise<string | TilesetSocialStatistics> {
    throw new Error("Method not implemented.");
  }
}
