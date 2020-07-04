import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({ baseURL: process.env.REACT_APP_API });

api.interceptors.request.use(
  config => {
    config.headers["Authorization"] = "bearer " + getToken();
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

export default api;
