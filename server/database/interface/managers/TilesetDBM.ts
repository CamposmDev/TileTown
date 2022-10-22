import { Tileset, TilesetSocialStatistics, SocialStatisticsPermissions } from "../../../types";

export default interface TilesetDBM {
    
    getTilesetById(tilesetId: string): Promise<Tileset | null>

    createTileset(tileset: Partial<Tileset>): Promise<Tileset | null>;

    updateTilesetById(tilesetId: string, tileset: Partial<Tileset>): Promise<Tileset | null>;

    deleteTilesetById(tilesetId: string): Promise<Tileset | null>;

    addTilemapComment(userId: string, socialId: string): Promise<TilesetSocialStatistics | null>;
    
    toggleLike(userId: string, socialId: string): Promise<TilesetSocialStatistics | null>;

    toggleDislike(userId: string, socialId: string): Promise<TilesetSocialStatistics | null>;

    addView(userId: string, socialId: string): Promise<TilesetSocialStatistics | null>;

    updateTilemapPermissions(socialId: string, permissions: SocialStatisticsPermissions): Promise<TilesetSocialStatistics | null>;

}