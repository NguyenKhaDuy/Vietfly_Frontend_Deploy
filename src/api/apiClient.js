import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,

  // Cho phép browser tự gửi Cookie
  withCredentials: true,

  headers: {
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // auth=false => không gửi credentials
    if (config.auth === false) {
      config.withCredentials = false;
    } else {
      config.withCredentials = true;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      console.log("Token không hợp lệ hoặc đã hết hạn");
    }

    if (error.response?.status === 403) {
      console.log("Không có quyền truy cập");
    }

    return Promise.reject(error);
  },
);

export default apiClient;
