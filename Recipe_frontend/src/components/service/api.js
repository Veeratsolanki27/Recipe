import axios from "axios";

// Automatically use VITE_API_BASE_URL if configured, otherwise fallback to localhost:8080
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const api = axios.create({
  baseURL,
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle session expiration (401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and user state on authentication failure
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

export default api;
