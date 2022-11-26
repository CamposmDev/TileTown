import axios from "axios";
import AxiosCommunityApi from "./axios/AxiosCommunityApi";
import AxiosContestApi from "./axios/AxiosContestApi";
import AxiosForumApi from "./axios/AxiosForumApi";
import AxiosTilesetApi from "./axios/AxiosTilesetApi";
import AxiosUserApi from "./axios/AxiosUserApi";
import AxiosCommentApi from "./axios/AxiosCommentApi";
import AxiosMediaApi from "./axios/AxiosMediaApi";
import AxiosSocialApi from "./axios/AxiosSocialApi";

axios.defaults.withCredentials = true

const api = axios.create({
    baseURL: 'http://localhost:3000/'
})

const CommunityApi = new AxiosCommunityApi();
const UserApi = new AxiosUserApi();
const ContestApi = new AxiosContestApi();
const ForumApi = new AxiosForumApi();
const TilesetApi = new AxiosTilesetApi();
const CommentApi = new AxiosCommentApi();
const MediaApi = new AxiosMediaApi();
const SocialApi = new AxiosSocialApi();

export { 
    CommunityApi, 
    UserApi,
    ContestApi,
    ForumApi,
    TilesetApi,
    CommentApi,
    MediaApi,
    SocialApi
}