import { TilesetSocial } from "@types";

export default interface TilesetSocialDBM {
    getTilesetSocialsByName(name: string, sort: string, tags: string[]): Promise<TilesetSocial[]>

    getTilesetSocialsByUserId(userId: string): Promise<TilesetSocial[]>;

    getTilesetSocialByTilesetId(tilesetId: string): Promise<TilesetSocial | null>;

    getTilesetSocialById(socialId: string): Promise<TilesetSocial | null>

    createTilesetSocial(tilesetId: string, partial: Partial<TilesetSocial>): Promise<TilesetSocial | null>;

    updateTilesetSocial(tilesetId: string, partial: Partial<TilesetSocial>): Promise<TilesetSocial | null>;

}