// Import All the necessary dependencies
import axios from "axios";


const axiosDefaults = {}
// Creating axios instance 
const axiosClient = axios.create(axiosDefaults);

axiosClient.interceptors.request.use(
    function (config) {
        config.headers.Authorization = 'afsdgasd'
        return config;
    },

    function (error) {
        return Promise.reject(error);
    }

);





export default axiosClient;

