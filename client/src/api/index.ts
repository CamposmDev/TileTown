import axios from "axios";
import AxiosCommunityApi from "./axios/AxiosCommunityApi";
import AxiosContestApi from "./axios/AxiosContestApi";
import AxiosForumApi from "./axios/AxiosForumApi";
import AxiosTilesetApi from "./axios/AxiosTilesetApi";
import AxiosUserApi from "./axios/AxiosUserApi";
import AxiosContestApi from "./axios/AxiosContestApi";
import AxiosForumApi from "./axios/AxiosForumApi";
import AxiosCommunityApi from "./axios/AxiosCommunityApi";

axios.defaults.withCredentials = true

const CommunityApi = new AxiosCommunityApi();
const UserApi = new AxiosUserApi();

const ContestApi = new AxiosContestApi();
const ForumApi = new AxiosForumApi();
const TilesetApi = new AxiosTilesetApi();
export { 
    CommunityApi, 
    UserApi,
    ContestApi,
    ForumApi,
    TilesetApi
}
