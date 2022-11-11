import { AxiosResponse } from 'axios';

import { User, Tilemap } from "@types";
import { LoginReq, RegisterReq, LogoutReq, UpdateUsernameReq, UpdateEmailReq, UpdatePasswordReq } from "@requests/user";
import { LoginRes, RegisterRes, LogoutRes, UpdateUsernameRes, UpdateEmailRes, UpdatePasswordRes } from "@responses/user";

import AxiosApi from './AxiosApi';

export default class AxiosUserApi  {
    
    async register(payload: RegisterReq): Promise<AxiosResponse<RegisterRes>> {
        return AxiosApi.post<RegisterRes, AxiosResponse<RegisterRes>, RegisterReq>("/user", payload);
    }
    async login(payload: LoginReq): Promise<AxiosResponse<LoginRes>> {
        return AxiosApi.post<LoginRes, AxiosResponse<LoginRes>, LoginReq>("/user/login", payload);
    }
    async getLoggedIn(): Promise<AxiosResponse<{user: User, message: string}>> {
        return AxiosApi.get<{user: User, message: string}>("/user")
    }
    async logout(): Promise<AxiosResponse<LogoutRes>> {
        return AxiosApi.post<LogoutRes, AxiosResponse<LogoutRes>, LogoutReq>("/user/logout");
    }
    async delete(): Promise<AxiosResponse<DeleteRes>> {
        return AxiosApi.delete<DeleteRes, AxiosResponse<DeleteRes>, DeleteReq>("/user");
    }
    async updateUsername(payload: UpdateUsernameReq): Promise<AxiosResponse> {
        return AxiosApi.put<UpdateUsernameRes, AxiosResponse<UpdateUsernameRes>, UpdateUsernameReq>('/user/username', payload)
    }
    async updateEmail(payload: UpdateEmailReq): Promise<AxiosResponse> {
        return AxiosApi.put<UpdateEmailRes, AxiosResponse<UpdateEmailRes>, UpdateEmailReq>('/user/email', payload)
    }
    async updatePassword(payload: UpdatePasswordReq): Promise<AxiosResponse<UpdatePasswordRes>> {
        return AxiosApi.put<UpdatePasswordRes, AxiosResponse<UpdatePasswordRes>, UpdatePasswordReq>('/user/password', payload)
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
