import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

// Khởi tạo instance Axios
// Cấu hình Interceptors
const BASE_URL = import.meta.env.VITE_API_DUMMY;
const TIME_OUT = 25_000;

const refreshAuthLogic = async (failedRequest: any) => {
  const refreshToken = localStorage.getItem("refreshToken");
  const res = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });
  const newToken = res.data.accessToken;

  localStorage.setItem("accessToken", newToken);

  if (failedRequest?.response?.config?.headers) {
    failedRequest.response.config.headers["Authorization"] =
      "Bearer " + newToken;
  }

  return Promise.resolve();
};
const AxiosInstanceDefault = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  headers: {
    "Content-Type": "application/json",
  },
});
AxiosInstanceDefault.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log("<----------------Request---------------->");
    console.log("🌕 BaseUrl:  ", config.baseURL);
    console.log("🌕 Endpoint: ", config.url);
    console.log("🌕 Method:   ", config.method);
    console.log("🌕 Headers:  ", config.headers);
    console.log("🌕 Params:   ", config.params);
    console.log("🌕 Data:     ", config.data);
    return config;
  },
  (error) => Promise.reject(error)
);

AxiosInstanceDefault.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    console.error("API Error:", error.response?.status, error.message);
    return Promise.reject(error);
  }
);

createAuthRefreshInterceptor(AxiosInstanceDefault, refreshAuthLogic);

const httpClient = {
  setAuthorizationHeader(accessToken: string) {
    if (!localStorage.getItem("accessToken")) {
      delete AxiosInstanceDefault.defaults.headers.common["Authorization"];
    } else {
      AxiosInstanceDefault.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
    }
  },

  get(url: string, config?: AxiosRequestConfig) {
    return AxiosInstanceDefault.get(url, config);
  },

  post(url: string, data: any, config?: AxiosRequestConfig) {
    return AxiosInstanceDefault.post(url, data, config);
  },

  put(url: string, data = {}, config?: AxiosRequestConfig) {
    return AxiosInstanceDefault.put(url, data, config);
  },

  patch(url: string, data = {}, config?: AxiosRequestConfig) {
    return AxiosInstanceDefault.patch(url, data, config);
  },

  delete(url: string, config?: AxiosRequestConfig) {
    return AxiosInstanceDefault.delete(url, config);
  },
};
export default httpClient;
