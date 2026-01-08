import axios from "axios";

export const Axios = axios.create({
  baseURL: "https://thinkly-backend-9l4w.onrender.com",
  // withCredentials: true,
});

Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("ThinklyToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
