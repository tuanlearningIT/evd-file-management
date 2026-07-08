import axios, { AxiosError, type AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",

  timeout: 10000,

  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },

  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized");
    }

    if (error.response?.status === 403) {
      console.log("Forbidden");
    }

    if (error.response?.status === 404) {
      console.log("API Not Found");
    }

    if (error.response?.status === 500) {
      console.log("Internal Server Error");
    }

    return Promise.reject(error);
  },
);

export default api;
