import { AxiosResponse } from "axios";
import { CreateForumReq, DeleteForumReq, GetForumReq, UpdateForumReq } from "@requests/forum";
import { 
    CreateForumRes, DeleteForumRes, GetForumRes, GetForumsRes, UpdateForumRes
} from "@responses/forum";

import AxiosApi  from "./AxiosApi";
import GetForumsReq from "@requests/forum/GetForumsReq";
import { ViewForumRes } from "@responses/forum/ViewForumRes";
import { ViewForumReq } from "@requests/forum/ViewForumReq";
import { LikeForumRes } from "@responses/forum/LikeForumRes";
import { LikeForumReq } from "@requests/forum/LikeForumReq";
import { DislikeForumRes } from "@responses/forum/DIslikeForumRes";
import { DislikeForumReq } from "@requests/forum/DislikeForumReq";
import { CommentForumReq } from "@requests/forum/CommentForumReq";
import { CommentForumRes } from "@responses/forum/CommentForumRes";

export default class AxiosForumApi {

    public async getForumById(forumId: string): Promise<AxiosResponse<GetForumRes>> {
        return AxiosApi.get<GetForumRes, AxiosResponse<GetForumRes>>(`/forum/${forumId}`);
    }

    public async createForum(req: CreateForumReq): Promise<AxiosResponse<CreateForumRes>> {
        return AxiosApi.post<CreateForumRes, AxiosResponse<CreateForumRes>, CreateForumReq>(`/forum`, req);
    }

    public async deleteForumById(forumId: string): Promise<AxiosResponse<DeleteForumRes>> {
        return AxiosApi.delete<DeleteForumRes, AxiosResponse<DeleteForumRes>>(`/forum/${forumId}`);
    }

    public async getForums(name: string): Promise<AxiosResponse<GetForumsRes>> {
        return AxiosApi.get<GetForumsRes, AxiosResponse<GetForumsRes>, GetForumsReq>(`/forum`, { params: { title: name } });

    }

    public async updateForumById(forumId: string, payload: UpdateForumReq): Promise<AxiosResponse<UpdateForumRes>> {
        return AxiosApi.put<UpdateForumRes, AxiosResponse<UpdateForumRes>, UpdateForumReq>(`/forum/${forumId}`, payload);
    }

    public async viewForumById(forumId: string): Promise<AxiosResponse<ViewForumRes>> {
        return AxiosApi.put<ViewForumRes, AxiosResponse<ViewForumRes>, ViewForumReq>(`/forum/view/${forumId}`)
    }

    public async likeForumById(forumId: string): Promise<AxiosResponse<LikeForumRes>> {
        return AxiosApi.put<LikeForumRes, AxiosResponse<LikeForumRes>, LikeForumReq>(`/forum/like/${forumId}`)
    }

    public async dislikeForumById(forumId: string): Promise<AxiosResponse<DislikeForumRes>> {
        return AxiosApi.put<DislikeForumRes, AxiosResponse<DislikeForumRes>, DislikeForumReq>(`/forum/dislike/${forumId}`)
    }

    public async commentForumById(forumId: string, payload: CommentForumReq): Promise<AxiosResponse<CommentForumRes>> {
        return AxiosApi.post<CommentForumRes, AxiosResponse<CommentForumRes>, CommentForumReq>(`/forum/comment/${forumId}`, payload)
    }
}