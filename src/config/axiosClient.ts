// Import All the necessary dependencies
import axios from "axios";
import { cookieUtil } from "../utils";
import { ACCESS_TOKEN_KEY_NAME } from "../constant";



const axiosDefaults = {
    baseURL: "http://localhost:8000/api/v1/users"
}
// Creating axios instance 
const axiosClient = axios.create(axiosDefaults);


axiosClient.interceptors.request.use(
    function (config) {
        config.headers.Authorization = `Bearer ${cookieUtil.get(ACCESS_TOKEN_KEY_NAME)}`;
        return config;
    },

    function (error) {
        return Promise.reject(error);
    }

);





export default axiosClient;

