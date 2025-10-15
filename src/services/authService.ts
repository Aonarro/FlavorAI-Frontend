import { useAuthStore } from '@/store/useAuthStore';
import {api} from "@/lib/api";

export async function login(email: string, password: string) {
    const setUser = useAuthStore.getState().setUser;

    try {
        const { data } = await api.post(
            '/auth/login',
            { email, password },
            { withCredentials: true }
        );

        setUser(data.user, data.accessToken);

        return data.user;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function fetchUser() {
    const setUser = useAuthStore.getState().setUser;

    try {
        const { data } = await api.get('/auth/me', {
            withCredentials: true,
        });

        setUser(data);

        return data;
    } catch (err) {
        setUser(null);
        return null;
    }
}

export async function logout() {
    const { logout } = useAuthStore.getState();
    try {
        await api.post('/auth/logout', {}, { withCredentials: true });
    } finally {
        logout();
    }
}