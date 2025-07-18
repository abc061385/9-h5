import axios, { AxiosInstance } from "axios";

// 响应统一数据格式
export interface ApiResponse<T> {
  data: T;
  code: number;
  message: string;
}

const axiosIn: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/app/",
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

// 请求拦截器：注入 token
axiosIn.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  if (token && config.headers) {
    config.headers["auth-token"] = token;
  }

  if (config.method === "post") {
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    config.data = config.params;
    config.params = {};
  }
  return config;
});

// 响应拦截器：直接 return data.data，统一错误处理
axiosIn.interceptors.response.use(
  (res) => {
    if (res.status) return res.data;
  },
  (err) => {
    console.error("API Error", err);
    return Promise.reject(err);
  },
);

export default axiosIn;
