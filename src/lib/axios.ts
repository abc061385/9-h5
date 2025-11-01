import { ContentType } from "@/api/ApiClient";
import { useUserStore } from "@/store/useUserStore";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import toast from "react-hot-toast";
// import { getIsDev } from "./utils";
import { useStore } from "@/store";
import { APILang } from "@/i18n/routing";
import { navigateTo, routerMap } from "@/i18n/navigation";
import Platform from "./platfrom";
import Bridge from "./dsBridge";

// 响应统一数据格式
export interface ApiResponse<T> {
  data: T;
  code: number;
  message: string;
}

// 构建 axios 实例的函数，可动态传入 baseURL
const createAxiosInstance = (
  baseURL: string,
  setPost?: (config: InternalAxiosRequestConfig) => void,
): AxiosInstance => {
  const instance = axios.create({
    // baseURL: getIsDev() ? baseURL : process.env.NEXT_PUBLIC_API_URL + baseURL,
    baseURL: baseURL,
    timeout: 100_000,
    headers: { "Content-Type": "application/json" },
  });

  // 请求拦截器：注入 token
  instance.interceptors.request.use((config) => {
    const token = useUserStore.getState().token;
    const lang = useStore.getState().lang as keyof typeof APILang;
    if (lang) {
      config.headers["Language"] = APILang[lang];
    }
    if (token && config.headers) {
      config.headers["auth-token"] = token;
    }

    if (config.method === "post") {
      if (setPost) setPost(config);
    }

    return config;
  });

  // 响应拦截器：返回 data.data，统一处理错误
  instance.interceptors.response.use(
    (res) => {
      if (res.data.code === 200) {
        return res?.data;
      } else if (res.data.code === 401) {
        if (Platform.isInApp()) {
          Bridge.jumpTo("/login");
        } else {
          navigateTo(routerMap.login);
        }
      } else {
        if (res.data?.message) toast.error(res.data?.message);
        if (res.data?.msg) toast.error(res.data?.msg);
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
  // 白名单api - 不需要转换成form-data格式。
  const wihteList: string[] = ["/withdraw-address/bind-address"];
  if (!wihteList.includes(config?.url || "")) {
    config.headers["Content-Type"] = ContentType.FormData;
  }
  config.data = config.data
    ? {
        ...Object.fromEntries(
          config.data.entries
            ? config.data.entries()
            : Object.entries(config.data),
        ),
        ...config.params,
      }
    : config.params;
  config.params = {};

  // config.headers["Content-Type"] = ContentType.FormData;
  // config.data = config.data
  //   ? { ...Object.fromEntries(config.data.entries()), ...config.params }
  //   : config.params;
  // config.params = {};
});

export const spotAxios = (() => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SPOT_API,
    timeout: 100_000,
    headers: { "Content-Type": "application/json" },
  });
  // 请求拦截器：注入 token
  instance.interceptors.request.use((config) => {
    const token = useUserStore.getState().token;
    const lang = useStore.getState().lang as keyof typeof APILang;
    if (lang) {
      config.headers["Language"] = APILang[lang];
    }
    if (token && config.headers) {
      config.headers["auth-token"] = token;
    }

    return config;
  });
  instance.interceptors.response.use(
    (res) => {
      if (res.status === 200) {
        return res?.data;
      }
    },
    (err) => {
      console.error("API Error", err);
      return Promise.reject(err);
    },
  );

  return instance;
})();
export { createAxiosInstance };
export default axiosIn;
