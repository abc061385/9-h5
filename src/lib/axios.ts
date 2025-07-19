import { ContentType } from "@/api/ApiClient";
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

// 响应统一数据格式
export interface ApiResponse<T> {
  data: T;
  code: number;
  message: string;
}

// 构建 axios 实例的函数，可动态传入 baseURL
const createAxiosInstance = (
  baseURL?: string,
  setPost?: (config: InternalAxiosRequestConfig) => void,
): AxiosInstance => {
  const instance = axios.create({
    baseURL: baseURL || process.env.NEXT_PUBLIC_API_URL || "/app/",
    timeout: 10_000,
    headers: { "Content-Type": "application/json" },
  });

  // 请求拦截器：注入 token
  instance.interceptors.request.use((config) => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    if (token && config.headers) {
      config.headers["auth-token"] = token;
    }

    if (config.method === "post") {
      setPost && setPost(config);
    }

    return config;
  });

  // 响应拦截器：返回 data.data，统一处理错误
  instance.interceptors.response.use(
    (res) => {
      if (res.data.code === 200) {
        return res?.data;
      } else {
        return Promise.reject(res.data);
      }
    },
    (err) => {
      console.error("API Error", err);
      return Promise.reject(err);
    },
  );

  return instance;
};

// 默认导出一个主实例（默认 baseURL）
const axiosIn = createAxiosInstance("/app/", (config) => {
  config.headers["Content-Type"] = ContentType.FormData;
  config.data = config.params;
  config.params = {};
});

export { createAxiosInstance };
export default axiosIn;
