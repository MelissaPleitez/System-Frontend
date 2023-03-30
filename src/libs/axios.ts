import axios from "axios";
import { authStore } from "../Store/authStore";

const authApi = axios.create({
  baseURL: "http://localhost:4000/api/",
  withCredentials: true,
});

authApi.interceptors.request.use((config) => {
  if (!config?.headers) {
    throw new Error(
      `Expected 'config' and 'config.headers' not to be undefined`
    );
  }
  const token = authStore.getState().token;
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default authApi;
