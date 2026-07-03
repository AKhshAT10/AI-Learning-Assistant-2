import axios from 'axios';
import {BASE_URL} from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 80000,
    headers: {
        Accept: "application/json",
    },
});

//request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

//response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const status = error.response?.status;
        const requestUrl = error.config?.url || "";

        // The login/register endpoints legitimately return 401 for bad
        // credentials, so let those pages show their own error instead of
        // wiping the session and redirecting.
        const isAuthRequest =
            requestUrl.includes("/auth/login") ||
            requestUrl.includes("/auth/register");

        if (status === 401 && !isAuthRequest) {
            // Token is missing, invalid, or expired ("jwt expired"):
            // clear the stale session and send the user back to login.
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            const onAuthPage =
                window.location.pathname === "/login" ||
                window.location.pathname === "/register";

            if (!onAuthPage) {
                window.location.replace("/login");
            }
        } else if (status === 500) {
            console.error("server error , please try again later");
        } else if (error.code === "ECONNABORTED") {
            console.error("Request timeout , please try again later");
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
