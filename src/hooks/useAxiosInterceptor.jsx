import axios from "axios";
import { useEffect } from "react";

// export const BASE_URL = "http://localhost:8080/event_management_system";
    export const BASE_URL = "https://ollyo.code-thesis.com/event_management_system";
// Create axios instance
export const axiosSecure = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
});

// Hook to add interceptors
const useAxiosInterceptor = () => {
    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("token");
                if (token) {
                    config.headers = {
                        ...config.headers, // Preserve existing headers
                        Authorization: `Bearer ${token}`
                    };
                }
                console.log("Request Headers:", config.headers); // Debugging
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    localStorage.removeItem("token"); // Clear token on unauthorized access
                    window.location.href = "/login"; // Redirect to login page
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, []);
};

export default useAxiosInterceptor;
