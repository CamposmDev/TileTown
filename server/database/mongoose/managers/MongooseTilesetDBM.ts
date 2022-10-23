import {
  Tileset,
  TilesetSocialStatistics,
  SocialStatisticsPermissions,
} from "../../../types";
import { TilesetDBM } from "../../interface";
import TilesetSchemaType from "../types/TilesetSchemaType";
import TilesetSchema from "../schemas/tileset";

export default class MongooseTilesetDBM implements TilesetDBM {
  async getTileSetPartials(
    userId: string,
    search: string,
    sortBy: string
  ): Promise<string | Tileset> {
    throw new Error("Method not implemented.");
  }
  async updateTilesetPermissions(
    socialId: string,
    permissions: SocialStatisticsPermissions
  ): Promise<string | TilesetSocialStatistics> {
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
          firstgid: tileset.firstgid,
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
  async createTileset(tileset: Partial<Tileset>): Promise<Tileset | string> {
    throw new Error("Method not implemented.");
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
  async addTilemapComment(
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
  async updateTilemapPermissions(
    socialId: string,
    permissions: SocialStatisticsPermissions
  ): Promise<TilesetSocialStatistics | string> {
    throw new Error("Method not implemented.");
  }
}
