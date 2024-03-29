import { Axios, AxiosResponse } from "axios";
import AxiosApi from "./AxiosApi";

import { 
    GetContestReq, DeleteContestReq, CreateContestReq, UpdateContestReq, SearchContestsReq 
} from "@requests/contest";

import { 
    GetContestRes, DeleteContestRes, CreateContestRes, UpdateContestRes, GetContestsRes
} from "@responses/contest";
import { User, Contest } from '@types'

export default class AxiosContestApi {

    public async getContestById(contestId: string): Promise<AxiosResponse<GetContestRes>> {
        return AxiosApi.get<GetContestRes, AxiosResponse<GetContestRes>, GetContestReq>(`/contest/${contestId}`);
    }

    public async createContest(payload: CreateContestReq): Promise<AxiosResponse<CreateContestRes>> {
        return AxiosApi.post<CreateContestRes, AxiosResponse<CreateContestRes>, CreateContestReq>(`/contest`, payload);
    }

    public async updateContestById(contestId: string, payload: UpdateContestReq): Promise<AxiosResponse<UpdateContestRes>> {
        return AxiosApi.put<UpdateContestRes, AxiosResponse<UpdateContestRes>, UpdateContestReq>(`/contest/${contestId}`, payload);
    }

    public async deleteContestById(contestId: string): Promise<AxiosResponse<DeleteContestRes>> {
        return AxiosApi.delete<DeleteContestRes, AxiosResponse<DeleteContestRes>, DeleteContestReq>(`/contest/${contestId}`);
    }

    public async getContests(name: string | undefined, sort: string): Promise<AxiosResponse<GetContestsRes>> {
        return AxiosApi.get<GetContestsRes, AxiosResponse<GetContestsRes>>(`/contest`, { params: { name: name, sort: sort }});
    }

    public async getTilemapContestName(contestId: string): Promise<AxiosResponse> {
        return AxiosApi.get(`/contest/submission/name/tilemap/${contestId}`)
    }

    public async getTilesetContestName(contestId: string): Promise<AxiosResponse> {
        return AxiosApi.get(`/contest/submission/name/tileset/${contestId}`)
    }

    public async hasSubmitted(contestId: string): Promise<AxiosResponse> {
        return AxiosApi.get(`/contest/submitted/${contestId}`)
    }

    public async getContestNameById(contestId: string): Promise<AxiosResponse> {
        return AxiosApi.get(`/contest/name/${contestId}`)
    }

    public async joinContest(id: string): Promise<AxiosResponse<{message: string, user: User, contest: Contest}>> {
        return AxiosApi.put(`/contest/join/${id}`)
    }

    public async leaveContest(id: string): Promise<AxiosResponse<{message: string, user: User, contest: Contest}>> {
        return AxiosApi.put(`/contest/leave/${id}`)
    }

    public async getTilesetSubmissions(contestId: string): Promise<AxiosResponse> {
        return AxiosApi.get(`/contest/submissions/tileset/${contestId}`)
    }

    public async getTilemapSubmissions(contestId: string): Promise<AxiosResponse> {
        return AxiosApi.get(`/contest/submissions/tilemap/${contestId}`)
    }

    public async getPopularTop10(): Promise<AxiosResponse> {
        return AxiosApi.get(`/contest/popular/top10`)
    }

    public async selectWinner(contestId: string, payload: { userId: string }): Promise<AxiosResponse> {
        return AxiosApi.put(`/contest/winner/${contestId}`, payload)
    }
}