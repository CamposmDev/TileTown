import { Tileset, TilesetSocialStatistics, SocialStatisticsPermissions } from "../../../types";
import { TilesetDBM } from "../../interface";

export default class MongooseTilesetDBM implements TilesetDBM {

    async getTilesetById(tilesetId: string): Promise<Tileset | null> {
        throw new Error("Method not implemented.");
    }
    async createTileset(tileset: Partial<Tileset>): Promise<Tileset | null> {
        throw new Error("Method not implemented.");
    }
    async updateTilesetById(tilesetId: string, tileset: Partial<Tileset>): Promise<Tileset | null> {
        throw new Error("Method not implemented.");
    }
    async deleteTilesetById(tilesetId: string): Promise<Tileset | null> {
        throw new Error("Method not implemented.");
    }
    async addTilemapComment(userId: string, socialId: string): Promise<TilesetSocialStatistics | null> {
        throw new Error("Method not implemented.");
    }
    async toggleLike(userId: string, socialId: string): Promise<TilesetSocialStatistics | null> {
        throw new Error("Method not implemented.");
    }
    async toggleDislike(userId: string, socialId: string): Promise<TilesetSocialStatistics | null> {
        throw new Error("Method not implemented.");
    }
    async addView(userId: string, socialId: string): Promise<TilesetSocialStatistics | null> {
        throw new Error("Method not implemented.");
    }
    async updateTilemapPermissions(socialId: string, permissions: SocialStatisticsPermissions): Promise<TilesetSocialStatistics | null> {
        throw new Error("Method not implemented.");
    }

}