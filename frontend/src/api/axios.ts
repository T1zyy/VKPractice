import axios, {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import { useAuthStore } from '../store/authStore';

const api: AxiosInstance = axios.create({
    baseURL: 'https://vkpractice-production.up.railway.app',
    withCredentials: true,
});

type FailedRequest = {
    resolve: (token: string | null) => void;
    reject: (error: unknown) => void;
};

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Интерцептор ответов — для обработки 403 и обновления токена
api.interceptors.response.use(
    (res: AxiosResponse) => res,
    async err => {
        const originalRequest: any = err.config;
        const { refreshToken, setTokens } = useAuthStore.getState();

        if (err.response?.status === 403 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers.Authorization = 'Bearer ' + token;
                    return api(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const res = await axios.post(
                    'https://vkpractice-production.up.railway.app/auth/refresh',
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${refreshToken}`
                        }
                    }
                );

                const newAccess = res.data.accessToken;
                const newRefresh = res.data.refreshToken;

                setTokens(newAccess, newRefresh);
                originalRequest.headers.Authorization = `Bearer ${newAccess}`;
                processQueue(null, newAccess);
                return api(originalRequest);
            } catch (refreshErr) {
                processQueue(refreshErr, null);
                return Promise.reject(refreshErr);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(err);
    }
);

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
});

export default api;