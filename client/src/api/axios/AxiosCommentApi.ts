import { Axios, AxiosResponse } from "axios";
import AxiosApi from "./AxiosApi";
import { Comment } from "@types";

export default class AxiosCommentApi {

    public async getCommentById(id: string): Promise<AxiosResponse<{comment?: Comment, message: string}>> {
        return AxiosApi.get<{comment?: Comment, message: string}, AxiosResponse<{comment?: Comment, message: string}>>(`/comment/${id}`)
    }

}