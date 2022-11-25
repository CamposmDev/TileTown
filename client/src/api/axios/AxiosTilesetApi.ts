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
  PublishTilesetRes,
  GetUnpublishedTilesetsRes
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
    formData: FormData
  ): Promise<AxiosResponse<UpdateTilesetRes>> {
    return AxiosApi.putForm<
      UpdateTilesetRes,
      AxiosResponse<UpdateTilesetRes>
    >(`/tileset/${id}`, formData);
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

  public async publishTilesetById(id: string, payload: {
    description: string,
    communityName: string,
    permissions: string[],
    tags: string[]
  }) : Promise<AxiosResponse<PublishTilesetRes>> {
    return AxiosApi.post<PublishTilesetRes, AxiosResponse<PublishTilesetRes>>(`/tileset/publish/${id}`, payload);
  }

  public async getPublishedTilesetsByName(query: string, sort: string) {
    return AxiosApi.get(`/tileset/search/${query}/${sort}`)
  }

  public async getUnpublishedTilesets() : Promise<AxiosResponse<GetUnpublishedTilesetsRes>> {
    return AxiosApi.get<GetUnpublishedTilesetsRes, AxiosResponse<GetUnpublishedTilesetsRes>>(`/user/tilesets/unpublished`);
  }

  public async getTilesetSocialByTilesetId(tilesetId: string) {
    return AxiosApi.get(`/tileset/social/tsid/${tilesetId}`)
  }

  public async viewTilesetSocial(tilesetSocialId: string) {
    return AxiosApi.put(`/tileset/view/${tilesetSocialId}`)
  }
}
