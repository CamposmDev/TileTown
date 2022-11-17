import { AxiosResponse } from "axios";

import AxiosApi from "./AxiosApi";

import {
    CreateTilesetReq,
    DeleteTilesetReq,
    GetTilesetReq,
    UpdateTilesetReq,
} from "@requests/tileset";
import {
    CreateTilesetRes,
    DeleteTilesetRes,
    GetTilesetRes,
    UpdateTilesetRes,
} from "@responses/tileset";
import Tileset from "../../../../@types/Tileset";

export default class AxiosTilesetApi {
    public async createTileset(
        formData: FormData
    ): Promise<AxiosResponse<CreateTilesetRes>> {
        return AxiosApi.postForm<CreateTilesetRes, AxiosResponse<CreateTilesetRes>>(
            `/tileset`,
            formData
        );
    }

    public async getTilesetById(
        id: string,
        payload: GetTilesetReq
    ): Promise<AxiosResponse<GetTilesetRes>> {
        return AxiosApi.get<
            GetTilesetRes,
            AxiosResponse<GetTilesetRes>,
            GetTilesetReq
        >(`/tileset/${id}`, payload);
    }

    public async updateTilesetById(
        id: string,
        payload: UpdateTilesetReq
    ): Promise<AxiosResponse<UpdateTilesetRes>> {
        return AxiosApi.putForm<
            UpdateTilesetRes,
            AxiosResponse<UpdateTilesetRes>,
            UpdateTilesetReq
        >(`/tileset/${id}`, payload);
    }

    public async deleteTilesetById(
        id: string,
        payload: DeleteTilesetReq
    ): Promise<AxiosResponse<DeleteTilesetRes>> {
        return AxiosApi.delete<
            DeleteTilesetRes,
            AxiosResponse<DeleteTilesetRes>,
            DeleteTilesetReq
        >(`/tileset/${id}`, payload);
    }

}
