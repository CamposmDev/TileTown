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
    id: string
  ): Promise<AxiosResponse<GetTilesetRes>> {
    return AxiosApi.get<
      GetTilesetRes,
      AxiosResponse<GetTilesetRes>,
      GetTilesetReq
    >(`/tileset/${id}`);
  }

  public async updateTilesetById(
    id: string,
    tileset: Partial<Tileset>
  ): Promise<AxiosResponse<UpdateTilesetRes>> {
    console.log({ tileset: tileset });
    return AxiosApi.putForm<
      UpdateTilesetRes,
      AxiosResponse<UpdateTilesetRes>,
      UpdateTilesetReq
    >(`/tileset/${id}`, { tileset: tileset });
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
