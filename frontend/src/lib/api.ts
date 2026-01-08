import axios from "axios";

export const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // withCredentials: true,
});

Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("ThinklyToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
