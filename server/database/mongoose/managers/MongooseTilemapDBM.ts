import { Tilemap, CollaboratorSettings, TilemapSocialStatistics, SocialStatisticsPermissions } from "../../../types";
import { TilemapDBM } from "../../interface";

export default class MongooseTilemapDBM implements TilemapDBM {

    async getTilemapById(tilemapId: string): Promise<Tilemap | null> {
        throw new Error("Method not implemented.");
    }
    async createTilemap(tilemap: Partial<Tilemap>): Promise<Tilemap | null> {
        throw new Error("Method not implemented.");
    }
    async updateTilemapById(tilemapId: string, tilemap: Partial<Tilemap>): Promise<Tilemap | null> {
        throw new Error("Method not implemented.");
    }
    async deleteTilemapById(tilemapId: string): Promise<string | null> {
        throw new Error("Method not implemented.");
    }
    async updateCollaborators(tilemapId: string, collaborators: string[]): Promise<Tilemap | null> {
        throw new Error("Method not implemented.");
    }
    async updateCollaboratorSettings(tilemapId: string, collaboratorSettings: CollaboratorSettings): Promise<CollaboratorSettings | null> {
        throw new Error("Method not implemented.");
    }
    async addTilemapComment(userId: string, socialId: string): Promise<TilemapSocialStatistics | null> {
        throw new Error("Method not implemented.");
    }
    async toggleLike(userId: string, socialId: string): Promise<TilemapSocialStatistics | null> {
        throw new Error("Method not implemented.");
    }
    async toggleDislike(userId: string, socialId: string): Promise<TilemapSocialStatistics | null> {
        throw new Error("Method not implemented.");
    }
    async addView(userId: string, socialId: string): Promise<TilemapSocialStatistics | null> {
        throw new Error("Method not implemented.");
    }
    async updateTilemapPermissions(socialId: string, permissions: SocialStatisticsPermissions): Promise<TilemapSocialStatistics | null> {
        throw new Error("Method not implemented.");
    }
    
}