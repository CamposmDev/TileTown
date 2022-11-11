import { AxiosResponse } from "axios";
import { CreateForumReq, DeleteForumReq, GetForumReq } from "@requests/forum";
import { CreateForumRes, DeleteForumRes, GetForumRes, GetForumsRes } from "@responses/forum";

import AxiosApi  from "./AxiosApi";

export default class AxiosForumApi {

    public static async getForumById(forumId: string): Promise<AxiosResponse<GetForumRes>> {
        return AxiosApi.get<GetForumRes, AxiosResponse<GetForumRes>>(`/forum/${forumId}`);
    }

    public static async createForum(req: CreateForumReq): Promise<AxiosResponse<CreateForumRes>> {
        return AxiosApi.post<CreateForumRes, AxiosResponse<CreateForumRes>, CreateForumReq>(`/forum`, req);
    }

    public static async deleteForumById(forumId: string): Promise<AxiosResponse<DeleteForumRes>> {
        return AxiosApi.delete<DeleteForumRes, AxiosResponse<DeleteForumRes>>(`/forum/${forumId}`);
    }

    public static async getContests(name: string): Promise<AxiosResponse<GetForumsRes>> {
        return AxiosApi.get<GetForumsRes, AxiosResponse<GetForumsRes>>(`/forum`, { params: { name: name } });
    }
}