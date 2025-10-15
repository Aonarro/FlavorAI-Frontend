import axios from 'axios';
import {useAuthStore} from "@/store/useAuthStore";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const {accessToken} = useAuthStore.getState();
    if (accessToken) {
        config.headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {

                const {data} = await api.get('/auth/refresh');
                const setUser = useAuthStore.getState().setUser;


                setUser(data.user, data.accessToken);


                originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                const {logout} = useAuthStore.getState();
                logout();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);