import axios, { AxiosInstance } from 'axios';

axios.defaults.withCredentials = true

const baseURL = 'http://localhost:3000/api'
const AxiosApi = axios.create({baseURL: baseURL})

export default AxiosApi;