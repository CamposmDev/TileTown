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
    public async getTilesetSocialsByName(name: string, sort: string, tags: string[]): Promise<AxiosResponse> {
        let params = {
            name: name,
            sort: sort,
            tags: tags
        }
        return AxiosApi.get(`tileset/search/${JSON.stringify(params)}`)
    }

    public async getTilemapSocialById(socialId: string): Promise<AxiosResponse<GetTilemapRes>> {
        return AxiosApi.get<GetTilemapRes, AxiosResponse<GetTilemapRes>>(`tilemap/social/${socialId}`);
    }

    public async getTilesetSocialById(socialId: string): Promise<AxiosResponse<GetTilesetRes>> {
        return AxiosApi.get<GetTilesetRes, AxiosResponse<GetTilesetRes>>(`tileset/social/${socialId}`);
    }

    public async dislikeTilemapById(socialId: string): Promise<AxiosResponse<DislikeTilemapRes>> {
        return AxiosApi.put<DislikeTilemapRes, AxiosResponse<DislikeTilemapRes>>(`tilemap/dislike/${socialId}`)
    }

    public async dislikeTilesetById(socialId: string): Promise<AxiosResponse<DislikeTilesetRes>> {
        return AxiosApi.put<DislikeTilesetRes, AxiosResponse<DislikeTilesetRes>>(`tileset/dislike/${socialId}`);
    }

    public async likeTilemapById(socialId: string): Promise<AxiosResponse<LikeTilemapRes>> {
        return AxiosApi.put<LikeTilemapRes, AxiosResponse<LikeTilemapRes>>(`tilemap/like/${socialId}`);
    }

    public async likeTilesetById(socialId: string): Promise<AxiosResponse<LikeTilesetRes>> {
        return AxiosApi.put<LikeTilesetRes, AxiosResponse<LikeTilesetRes>>(`tileset/like/${socialId}`);
    }

    public async viewTilemapById(socialId: string): Promise<AxiosResponse<ViewTilemapRes>> {
        return AxiosApi.put<ViewTilemapRes, AxiosResponse<ViewTilemapRes>>(`tilemap/view/${socialId}`);
    }

    public async viewTilesetById(socialId: string): Promise<AxiosResponse<ViewTilesetRes>> {
        return AxiosApi.put<ViewTilesetRes, AxiosResponse<ViewTilesetRes>>(`tileset/view/${socialId}`);
    }

    public async commentTilemapById(socialId: string, payload: { comment: { body: string } }): Promise<AxiosResponse<CommentTilemapRes>> {
        return AxiosApi.post<CommentTilemapRes, AxiosResponse<CommentTilemapRes>>(`tilemap/comment/${socialId}`, payload);
    }

    public async commentTilesetById(socialId: string, payload: { comment: { body: string } }): Promise<AxiosResponse<CommentTilesetRes>> {
        return AxiosApi.post<CommentTilesetRes, AxiosResponse<CommentTilesetRes>>(`tileset/comment/${socialId}`, payload);
    }

}