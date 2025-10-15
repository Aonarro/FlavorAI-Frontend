import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {useAuthStore} from '@/store/useAuthStore';

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
    _retry?: boolean;
}

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown = null) => {
    failedQueue.forEach(({reject}) => {
        reject(error);
    });
    failedQueue = [];
};

api.interceptors.request.use((config) => {
    const {accessToken} = useAuthStore.getState();
    if (accessToken) {
        config.headers = config.headers ?? {};
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfigWithRetry;

        if (originalRequest.url?.includes('/auth/refresh') ||
            originalRequest.url?.includes('/auth/logout')) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {


            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({resolve, reject});
                })
                    .then(() => {
                        const {accessToken} = useAuthStore.getState();
                        originalRequest.headers = originalRequest.headers ?? {};
                        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                        return api(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {

                const {data} = await api.get('/auth/refresh');

                const {setAccessToken} = useAuthStore.getState();
                setAccessToken(data.accessToken);


                processQueue();


                originalRequest.headers = originalRequest.headers ?? {};
                originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

                return api(originalRequest);
            } catch (refreshError) {

                processQueue(refreshError);
                const {logout} = useAuthStore.getState();
                logout();


                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);