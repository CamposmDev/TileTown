import { AxiosResponse } from "axios";
import { Comment } from "@types";
import AxiosApi from "./AxiosApi";

import {
    GetTilemapRes, GetTilesetRes,
    CommentTilemapRes, CommentTilesetRes,
    DislikeTilemapRes, DislikeTilesetRes,
    LikeTilemapRes, LikeTilesetRes,
    ViewTilemapRes, ViewTilesetRes
} from "@responses/social"

export default class AxiosSocialApi {

    public static async getTilemapSocialById(socialId: string): Promise<AxiosResponse<GetTilemapRes>> {
        return AxiosApi.get<GetTilemapRes, AxiosResponse<GetTilemapRes>>(`tilemap/social/${socialId}`);
    }

    public static async getTilesetSocialById(socialId: string): Promise<AxiosResponse<GetTilesetRes>> {
        return AxiosApi.get<GetTilesetRes, AxiosResponse<GetTilesetRes>>(`tileset/social/${socialId}`);
    }

    public static async dislikeTilemapById(socialId: string): Promise<AxiosResponse<DislikeTilemapRes>> {
        return AxiosApi.put<DislikeTilemapRes, AxiosResponse<DislikeTilemapRes>>(`tilemap/dislike/${socialId}`)
    }

    public static async dislikeTilesetById(socialId: string): Promise<AxiosResponse<DislikeTilesetRes>> {
        return AxiosApi.put<DislikeTilesetRes, AxiosResponse<DislikeTilesetRes>>(`tileset/dislike/${socialId}`);
    }

    public static async likeTilemapById(socialId: string): Promise<AxiosResponse<LikeTilemapRes>> {
        return AxiosApi.put<LikeTilemapRes, AxiosResponse<LikeTilemapRes>>(`tilemap/like/${socialId}`);
    }

    public static async likeTilesetById(socialId: string): Promise<AxiosResponse<LikeTilesetRes>> {
        return AxiosApi.put<LikeTilesetRes, AxiosResponse<LikeTilesetRes>>(`tileset/like/${socialId}`);
    }

    public static async viewTilemapById(socialId: string): Promise<AxiosResponse<ViewTilemapRes>> {
        return AxiosApi.put<ViewTilemapRes, AxiosResponse<ViewTilemapRes>>(`tilemap/view/${socialId}`);
    }

    public static async viewTilesetById(socialId: string): Promise<AxiosResponse<ViewTilesetRes>> {
        return AxiosApi.put<ViewTilesetRes, AxiosResponse<ViewTilesetRes>>(`tileset/view/${socialId}`);
    }

    public static async commentTilemapById(socialId: string, comment: Comment): Promise<AxiosResponse<{}>> {
        return AxiosApi.post<{}, AxiosResponse<{}>>(`tilemap/comment/${socialId}`, { comment: comment });
    }

    public static async commentTilesetById(socialId: string, comment: Comment): Promise<AxiosResponse<{}>> {
        return AxiosApi.post<{}, AxiosResponse<{}>>(`tileset/comment/${socialId}`, { comment: comment });
    }

}