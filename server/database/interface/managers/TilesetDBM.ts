import {
    Tileset,
    TilesetSocial,
    SortBy,
} from "../../../types";
import Comment from "../../../types/Comment";

export default interface TilesetDBM {
    getTilesetById(tilesetId: string): Promise<Tileset | null>;
    getTilesetByName(name: string): Promise<Tileset | null>;

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
