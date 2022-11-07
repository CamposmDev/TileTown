import axios from "axios";
import AxiosUserApi from "./axios/AxiosUserApi";
axios.defaults.withCredentials = true

const api = axios.create({
    baseURL: 'http://localhost:3000/'
})

const UserApi = new AxiosUserApi();
export { UserApi }