import axios from "axios";
import AxiosUserApi from "./axios/AxiosUserApi";
import AxiosContestApi from "./axios/AxiosContestApi";
import AxiosForumApi from "./axios/AxiosForumApi";
import AxiosCommunityApi from "./axios/AxiosCommunityApi";

axios.defaults.withCredentials = true

const UserApi = new AxiosUserApi();
const CommunityApi = new AxiosCommunityApi();
const ContestApi = new AxiosContestApi();
const ForumApi = new AxiosForumApi();

export { UserApi, CommunityApi, ContestApi, ForumApi }