import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_backend_url as string,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("auth_token");

    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
