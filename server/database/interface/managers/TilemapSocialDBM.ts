import { TilemapSocial, TilemapSocialQuery } from "@types";

export default interface TilemapSocialDBM {

    getTilemapSocialByTilemapId(tilesetId: string): Promise<TilemapSocial | null>;

    getTilemapSocialById(socialId: string): Promise<TilemapSocial | null>

    createTilemapSocial(tilemapId: string, partial: Partial<TilemapSocial>): Promise<TilemapSocial | null>;

    updateTilemapSocial(tilemapId: string, partial: Partial<TilemapSocial>): Promise<TilemapSocial | null>;

    getTilemapSocials(query: TilemapSocialQuery): Promise<TilemapSocial[]>

    getSubmissionIds(contestId: string): Promise<TilemapSocial[]>

    getPopularTop10(): Promise<TilemapSocial[]>

    getPopularCommunityTilemaps(commId: string): Promise<TilemapSocial[]>

    getTilemapSocialsByName(name: string, sort: string, tags: string[]): Promise<TilemapSocial[]>
}