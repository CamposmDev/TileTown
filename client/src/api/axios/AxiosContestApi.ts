import { AxiosResponse } from "axios";
import AxiosApi from "./AxiosApi";

import { 
    GetContestReq, DeleteContestReq, CreateContestReq, UpdateContestReq, SearchContestsReq 
} from "@requests/contest";

import { 
    GetContestRes, DeleteContestRes, CreateContestRes, UpdateContestRes, GetContestsRes
} from "@responses/contest";


export default class AxiosContestApi {

    public static async getContestById(contestId: string): Promise<AxiosResponse<GetContestRes>> {
        return AxiosApi.get<GetContestRes, AxiosResponse<GetContestRes>, GetContestReq>(`/contest/${contestId}`);
    }

    public static async createContest(payload: CreateContestReq): Promise<AxiosResponse<CreateContestRes>> {
        return AxiosApi.post<CreateContestRes, AxiosResponse<CreateContestRes>, CreateContestReq>(`/contest`, payload);
    }

    public static async updateContestById(contestId: string, payload: UpdateContestReq): Promise<AxiosResponse<UpdateContestRes>> {
        return AxiosApi.put<UpdateContestRes, AxiosResponse<UpdateContestRes>, UpdateContestReq>(`/contest/${contestId}`, payload);
    }

    public static async deleteContestById(contestId: string): Promise<AxiosResponse<DeleteContestRes>> {
        return AxiosApi.delete<DeleteContestRes, AxiosResponse<DeleteContestRes>, DeleteContestReq>(`/contest/${contestId}`);
    }

    public static async getContests(name: string): Promise<AxiosResponse<GetContestsRes>> {
        return AxiosApi.get<GetContestsRes, AxiosResponse<GetContestsRes>>(`/contest`, { params: { name: name }});
    }
}