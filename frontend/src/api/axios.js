import axios from "axios";

let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token || null;
};

export const clearAccessToken = () => {
  accessToken = null;
};

export const hasAccessToken = () => Boolean(accessToken);

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else if (config.headers.Authorization) {
    delete config.headers.Authorization;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const requestUrl = originalRequest.url || "";
    const isAuthEndpoint =
      requestUrl.includes("token/") || requestUrl.includes("token/refresh/");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await api.post("token/refresh/");
        setAccessToken(data.access);
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        clearAccessToken();
        window.dispatchEvent(new Event("auth-change"));
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
