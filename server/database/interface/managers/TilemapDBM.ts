import { Tilemap, CollaboratorSettings, TilemapSocialStatistics, SocialStatisticsPermissions } from "../../../types";

export default interface TilemapDBM {
    
    getTilemapById(tilemapId: string): Promise<Tilemap | null>;

    createTilemap(tilemap: Partial<Tilemap>): Promise<Tilemap | null>;

    updateTilemapById(tilemapId: string, tilemap: Partial<Tilemap>): Promise<Tilemap | null>;

    deleteTilemapById(tilemapId: string): Promise<string | null>;

    updateCollaborators(tilemapId: string, collaborators: string[]): Promise<Tilemap | null>;

    updateCollaboratorSettings(tilemapId: string, collaboratorSettings: CollaboratorSettings): Promise<CollaboratorSettings | null>

    addTilemapComment(userId: string, socialId: string): Promise<TilemapSocialStatistics | null>;
    
    toggleLike(userId: string, socialId: string): Promise<TilemapSocialStatistics | null>;

    toggleDislike(userId: string, socialId: string): Promise<TilemapSocialStatistics | null>;

    addView(userId: string, socialId: string): Promise<TilemapSocialStatistics | null>;

    updateTilemapPermissions(socialId: string, permissions: SocialStatisticsPermissions): Promise<TilemapSocialStatistics | null>;

}