import {
    Tileset,
    TilesetSocial,
    SortBy,
} from "@types";

export default interface TilesetDBM {
    getTilesetById(tilesetId: string): Promise<Tileset | null>;
    getTilesetsById(tilesetIds: string[]): Promise<Tileset[]>
    getTilesetByName(name: string): Promise<Tileset | null>;
    getTilesets(tileset: Partial<Tileset>): Promise<Tileset[]>

    getPublishedTilesetsByName(name: string, sort?: string): Promise<Tileset[]>

    createTileset(userId: string,
        tileset: Partial<Tileset>
    ): Promise<Tileset | null>;

    updateTilesetById(
        tilesetId: string,
        tileset: Partial<Tileset>
    ): Promise<Tileset | null>;

    deleteTilesetById(tilesetId: string): Promise<Tileset | null>;

    getTilesetPartials(
        userId: string,
        search: string,
        sortBy: SortBy
    ): Promise<[Partial<Tileset>] | string>;

}
