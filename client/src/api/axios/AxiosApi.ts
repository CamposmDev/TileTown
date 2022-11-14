import axios, { AxiosInstance } from 'axios';

axios.defaults.withCredentials = true

const baseURL = 'http://209.151.154.164/api'
const AxiosApi = axios.create({baseURL: baseURL})

export default AxiosApi;