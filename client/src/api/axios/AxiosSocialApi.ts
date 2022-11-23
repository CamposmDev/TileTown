import { AxiosResponse } from "axios";
import { Comment } from "@types";
import AxiosApi from "./AxiosApi";

import {
    GetTilemapRes, GetTilesetRes,
    CommentTilemapRes, CommentTilesetRes,
    DislikeTilemapRes, DislikeTilesetRes,
    LikeTilemapRes, LikeTilesetRes,
    ViewTilemapRes, ViewTilesetRes,
    SearchTilemapRes, SearchTilesetRes
} from "@responses/social"

export default class AxiosSocialApi {

    public async getTilemapSocials(name: string, tags: string[], sortby: string, order: number): Promise<AxiosResponse<SearchTilemapRes>> {
        return AxiosApi.get<SearchTilemapRes, AxiosResponse<SearchTilemapRes>>(`/query/socials/tilemap`, { params: {
            name: name,
            // I'm trying to replace all the whitespace in each tag with the empty string, then join all the tags on a space
            tags: tags.map(tag => tag.replaceAll(/\s/, "")).join(" "), 
            sortby: sortby,
            order: order
        }});
    }

    public async getTilesetSocials(name: string, tags: string[], sortby: string, order: number): Promise<AxiosResponse<SearchTilesetRes>> {
        return AxiosApi.get<SearchTilesetRes, AxiosResponse<SearchTilesetRes>>(`/query/socials/tileset`, { params: {
            name: name,
            tags: tags.map(tag => tag.replaceAll(/\s/, "")).join(" "), 
            sortby: sortby,
            order: order
        }});
    }

    public async getTilemapSocialById(socialId: string): Promise<AxiosResponse<GetTilemapRes>> {
        return AxiosApi.get<GetTilemapRes, AxiosResponse<GetTilemapRes>>(`/tilemap/social/${socialId}`);
    }

    public async getTilesetSocialById(socialId: string): Promise<AxiosResponse<GetTilesetRes>> {
        return AxiosApi.get<GetTilesetRes, AxiosResponse<GetTilesetRes>>(`/tileset/social/${socialId}`);
    }

    public async dislikeTilemapById(socialId: string): Promise<AxiosResponse<DislikeTilemapRes>> {
        return AxiosApi.put<DislikeTilemapRes, AxiosResponse<DislikeTilemapRes>>(`/tilemap/dislike/${socialId}`)
    }

    public async dislikeTilesetById(socialId: string): Promise<AxiosResponse<DislikeTilesetRes>> {
        return AxiosApi.put<DislikeTilesetRes, AxiosResponse<DislikeTilesetRes>>(`/tileset/dislike/${socialId}`);
    }

    public async likeTilemapById(socialId: string): Promise<AxiosResponse<LikeTilemapRes>> {
        return AxiosApi.put<LikeTilemapRes, AxiosResponse<LikeTilemapRes>>(`/tilemap/like/${socialId}`);
    }

    public async likeTilesetById(socialId: string): Promise<AxiosResponse<LikeTilesetRes>> {
        return AxiosApi.put<LikeTilesetRes, AxiosResponse<LikeTilesetRes>>(`/tileset/like/${socialId}`);
    }

    public async viewTilemapById(socialId: string): Promise<AxiosResponse<ViewTilemapRes>> {
        return AxiosApi.put<ViewTilemapRes, AxiosResponse<ViewTilemapRes>>(`/tilemap/view/${socialId}`);
    }

    public async viewTilesetById(socialId: string): Promise<AxiosResponse<ViewTilesetRes>> {
        return AxiosApi.put<ViewTilesetRes, AxiosResponse<ViewTilesetRes>>(`/tileset/view/${socialId}`);
    }

    public async commentTilemapById(socialId: string, comment: Comment): Promise<AxiosResponse<CommentTilemapRes>> {
        return AxiosApi.post<CommentTilemapRes, AxiosResponse<CommentTilemapRes>>(`/tilemap/comment/${socialId}`, { comment: comment });
    }

    public async commentTilesetById(socialId: string, comment: Comment): Promise<AxiosResponse<CommentTilesetRes>> {
        return AxiosApi.post<CommentTilesetRes, AxiosResponse<CommentTilesetRes>>(`/tileset/comment/${socialId}`, { comment: comment });
    }

}