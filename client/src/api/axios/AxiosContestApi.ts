import { AxiosResponse } from "axios";
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

    public async joinContest(id: string): Promise<AxiosResponse<{message: string, user: User, contest: Contest}>> {
        return AxiosApi.put(`/contest/join/${id}`)
    }

    public async leaveContest(id: string): Promise<AxiosResponse<{message: string, user: User, contest: Contest}>> {
        return AxiosApi.put(`/contest/leave/${id}`)
    }
}