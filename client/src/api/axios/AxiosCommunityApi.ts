import { AxiosResponse } from "axios";

import AxiosApi from "./AxiosApi";

import { 
    JoinCommunityReq, 
    LeaveCommunityReq, 
    UpdateCommunityReq, 
    CreateCommunityReq,
    DeleteCommunityReq
} from "@requests/community";

import {
    JoinCommunityRes, 
    LeaveCommunityRes, 
    UpdateCommunityRes, 
    CreateCommunityRes,
    DeleteCommunityRes,
    GetCommunitiesRes
} from "@responses/community";


export default class AxiosCommunityApi {

    public static async joinCommunity(communityId: string, payload: JoinCommunityReq): Promise<AxiosResponse<JoinCommunityRes>> {
        return AxiosApi.put<JoinCommunityRes, AxiosResponse<JoinCommunityRes>, JoinCommunityReq>(`/community/join/${communityId}`, payload);
    }

    public static async leaveCommunity(communityId: string, payload: LeaveCommunityReq): Promise<AxiosResponse<LeaveCommunityRes>> {
        return AxiosApi.put<LeaveCommunityRes, AxiosResponse<LeaveCommunityRes>, LeaveCommunityReq>(`/community/leave/${communityId}`, payload);
    }

    public static async createCommunity(payload: CreateCommunityReq): Promise<AxiosResponse<CreateCommunityRes>> {
        return AxiosApi.post<CreateCommunityRes, AxiosResponse<CreateCommunityRes>, CreateCommunityReq>(`/community`, payload);
    }

    public static async updateCommunity(communityId: string, payload: UpdateCommunityReq): Promise<AxiosResponse<UpdateCommunityRes>> {
        return AxiosApi.put<UpdateCommunityRes, AxiosResponse<UpdateCommunityRes>, UpdateCommunityReq>(`/community/${communityId}`, payload);
    }

    public static async deleteCommunity(communityId: string, payload: DeleteCommunityReq): Promise<AxiosResponse<DeleteCommunityRes>> {
        return AxiosApi.delete<DeleteCommunityRes, AxiosResponse<DeleteCommunityRes>, DeleteCommunityReq>(`/community/${communityId}`, payload);
    }

    public static async getCommunities(name: string): Promise<AxiosResponse<GetCommunitiesRes>> {
        return AxiosApi.get<GetCommunitiesRes, AxiosResponse<GetCommunitiesRes>>(`/community`, { params: { name: name }});
    }

}