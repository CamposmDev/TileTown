import {
  Tileset,
  TilesetSocialStatistics,
  SocialStatisticsPermissions,
} from "../../../types";

export default interface TilesetDBM {
  getTilesetById(tilesetId: string): Promise<Tileset | string>;

  createTileset(tileset: Partial<Tileset>): Promise<Tileset | string>;

  updateTilesetById(
    tilesetId: string,
    tileset: Partial<Tileset>
  ): Promise<Tileset | string>;

  deleteTilesetById(tilesetId: string): Promise<Tileset | string>;

  getTileSetPartials(
    userId: string,
    search: string,
    sortBy: string
  ): Promise<Tileset | string>;

  addTilemapComment(
    userId: string,
    socialId: string
  ): Promise<TilesetSocialStatistics | string>;

  toggleLike(
    userId: string,
    socialId: string
  ): Promise<TilesetSocialStatistics | string>;

  toggleDislike(
    userId: string,
    socialId: string
  ): Promise<TilesetSocialStatistics | string>;

  addView(
    userId: string,
    socialId: string
  ): Promise<TilesetSocialStatistics | string>;

  updateTilesetPermissions(
    socialId: string,
    permissions: SocialStatisticsPermissions
  ): Promise<TilesetSocialStatistics | string>;
}
