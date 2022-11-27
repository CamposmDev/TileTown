import { AxiosResponse } from "axios";
import AxiosApi from "./AxiosApi";

export default class AxiosMediaApi {
    public async getImage(file: string): Promise<AxiosResponse> {
        return AxiosApi.get(`/media/${file}`)
    }
}