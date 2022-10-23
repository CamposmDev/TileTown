import {
  Tileset,
  TilesetSocialStatistics,
  SocialStatisticsPermissions,
  SortBy,
} from "../../../types";

export default interface TilesetDBM {
  getTilesetById(tilesetId: string): Promise<Tileset | string>;

  createTileset(
    userId: string,
    tileset: Partial<Tileset>
  ): Promise<Tileset | string>;

  updateTilesetById(
    tilesetId: string,
    tileset: Partial<Tileset>
  ): Promise<Tileset | string>;

  deleteTilesetById(tilesetId: string): Promise<Tileset | string>;

  getTilesetPartials(
    userId: string,
    search: string,
    sortBy: SortBy
  ): Promise<[Partial<Tileset>] | string>;

  addTilesetComment(
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
