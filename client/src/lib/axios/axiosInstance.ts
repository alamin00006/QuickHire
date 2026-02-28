import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { getBaseUrl } from "@/lib/config/envConfig";

const instance: AxiosInstance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/* =====================
   Request Interceptor
===================== */
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => Promise.reject(error),
);

/* =====================
   Response Interceptor
===================== */
instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // Just pass error directly
    return Promise.reject(error);
  },
);

export { instance };
