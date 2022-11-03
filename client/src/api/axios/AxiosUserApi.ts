import { AxiosResponse } from 'axios';

import { User, Tilemap, Contest } from "@types";
import { LoginReq, RegisterReq, LogoutReq } from "@requests/user";
import { LoginRes, RegisterRes, LogoutRes } from "@responses/user";

import AxiosApi from './AxiosApi';

export default class AxiosUserApi  {
    
    async register(payload: RegisterReq): Promise<AxiosResponse<RegisterRes>> {
        return AxiosApi.post<RegisterRes, AxiosResponse<RegisterRes>, RegisterReq>("/api/user", payload);
    }
    async login(payload: LoginReq): Promise<AxiosResponse<LoginRes>> {
        return AxiosApi.post<LoginRes, AxiosResponse<LoginRes>, LoginReq>("/api/user/login", payload);
    }
    async logout(): Promise<AxiosResponse<LogoutRes>> {
        return AxiosApi.post<LogoutRes, AxiosResponse<LogoutRes>, LogoutReq>("/api/user/logout");
    }
    async delete(): Promise<AxiosResponse<DeleteRes>> {
        return AxiosApi.delete<DeleteRes, AxiosResponse<DeleteRes>, DeleteReq>("/api/user");
    }
    async tilemaps(): Promise<AxiosResponse<GetTilemapsRes>> {
        return AxiosApi.get<GetTilemapsRes, AxiosResponse<GetTilemapsRes>, GetTilemapsReq>("/api/user/tilemaps");
    }
}






interface DeleteReq {}
interface DeleteRes {
    message: string,
    user: User
}

interface GetTilemapsRes {
    message: string,
    tilemaps: Tilemap[]
}
interface GetTilemapsReq {}
