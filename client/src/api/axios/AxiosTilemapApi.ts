import { AxiosResponse } from "axios";
import AxiosApi from "./AxiosApi";

import { CreateTilemapReq, PublishTilemapReq } from "@requests/tilemap";
import { GetTilemapRes, CreateTilemapRes, UpdateTilemapRes, DeleteTilemapRes, PublishTilemapRes } from "@responses/tilemap"

export default class AxiosTilemapApi {

    public async createTilemap(payload: CreateTilemapReq): Promise<AxiosResponse<CreateTilemapRes>> {
        return AxiosApi.post<CreateTilemapRes, AxiosResponse<CreateTilemapRes>>(`/tilemap`, payload);
    }
    
    public async getTilemapById(id: string): Promise<AxiosResponse<GetTilemapRes>> {
        return AxiosApi.get<GetTilemapRes, AxiosResponse<GetTilemapRes>>(`/tilemap/${id}`);
    }
    
    public async updateTilemapById(id: string, formData: FormData): Promise<AxiosResponse<UpdateTilemapRes>> {
        return AxiosApi.putForm<UpdateTilemapRes, AxiosResponse<UpdateTilemapRes>>(`/tilemap/${id}`, formData);
    }
    
    public async deleteTilemapById(id: string): Promise<AxiosResponse<DeleteTilemapRes>> {
        return AxiosApi.delete<DeleteTilemapRes, AxiosResponse<DeleteTilemapRes>>(`/tilemaptileset/${id}`);
    }
    
    public async publishTilesetById(id: string, payload: PublishTilemapReq): Promise<AxiosResponse<PublishTilemapRes>> {
        return AxiosApi.post<PublishTilemapRes, AxiosResponse<PublishTilemapRes>>(`/tilemap/publish/${id}`, payload);
    }
    
}