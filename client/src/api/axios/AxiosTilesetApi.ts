import { AxiosResponse } from "axios";

import AxiosApi from './AxiosApi';

import { CreateTilesetReq, DeleteTilesetReq, GetTilesetReq, UpdateTilesetReq } from "@requests/tileset";
import { CreateTilesetRes, DeleteTilesetRes, GetTilesetRes, UpdateTilesetRes } from "@responses/tileset";

export default class AxiosTilesetApi {

    public static async createTileset(payload: CreateTilesetReq): Promise<AxiosResponse<CreateTilesetRes>> {
        return AxiosApi.postForm<CreateTilesetRes, AxiosResponse<CreateTilesetRes>, CreateTilesetReq>(`/api/tileset`, payload);
    }

    public static async getTilesetById(id: string, payload: GetTilesetReq): Promise<AxiosResponse<GetTilesetRes>> {
        return AxiosApi.get<GetTilesetRes, AxiosResponse<GetTilesetRes>, GetTilesetReq>(`/api/tileset/${id}`, payload);
    }

    public static async updateTilesetById(id: string, payload: UpdateTilesetReq): Promise<AxiosResponse<UpdateTilesetRes>> {
        return AxiosApi.putForm<UpdateTilesetRes, AxiosResponse<UpdateTilesetRes>, UpdateTilesetReq>(`/api/tileset/${id}`, payload);
    }

    public static async deleteTilesetById(id: string, payload: DeleteTilesetReq): Promise<AxiosResponse<DeleteTilesetRes>> {
        return AxiosApi.delete<DeleteTilesetRes, AxiosResponse<DeleteTilesetRes>, DeleteTilesetReq>(`/api/tileset/${id}`, payload);
    }
}

