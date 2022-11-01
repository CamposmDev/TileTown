import { Http } from "@mui/icons-material";
import axios from "axios";
import { pid } from "process";
axios.defaults.withCredentials = true

const api = axios.create({
    baseURL: 'http://209.151.152.149:80/api'
})

export const registerUser = (payload: object) => api.post('/', payload)
export const loginUser = (payload: object) => api.post('/login', payload)
export const logoutUser = (payload: object) => api.post('/logout', payload)

const apis = {
    registerUser,
    loginUser,
    logoutUser
}


export default apis