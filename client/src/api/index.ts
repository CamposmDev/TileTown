import { Http } from "@mui/icons-material";
import axios from "axios";
import { pid } from "process";
import AxiosUserApi from "./axios/AxiosUserApi";
axios.defaults.withCredentials = true

const api = axios.create({
    baseURL: 'http://localhost:3000/'
})

export const registerUser = (payload: object) => api.post('/', payload)
export const loginUser = (payload: object) => api.post('/login', payload)
export const logoutUser = (payload: object) => api.post('/logout', payload)

const apis = {
    registerUser,
    loginUser,
    logoutUser
}

const UserApi = new AxiosUserApi();
export { UserApi }


export default apis