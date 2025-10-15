import { useAuthStore } from '@/store/useAuthStore';
import { api } from '@/lib/api';
import {LoginPayload, RegisterPayload} from "@/types/auth";
import {AxiosError} from "axios";

export async function login(userData: LoginPayload) {
    const { setUser } = useAuthStore.getState();

    try {
        const { data } = await api.post(
            '/auth/login',
            {
                email: userData.email,
                password: userData.password
            },
            { withCredentials: true }
        );

        setUser(data.user, data.accessToken);
        return data.user;
    } catch (err) {
        console.error('Login error:', err);
        throw err;
    }
}

export async function register(userData: RegisterPayload) {
    const { setUser } = useAuthStore.getState();

    try {
        const { data } = await api.post(
            '/auth/register',
            {
                email: userData.email,
                password: userData.password,
                firstName: userData.firstName,
                lastName: userData.lastName
            },
            { withCredentials: true }
        );

        setUser(data.user, data.accessToken);
        return data.user;
    } catch (err) {
        console.error('Register error:', err);
        throw err;
    }
}

export async function fetchUser() {
    const { setUser, user, logout } = useAuthStore.getState();

    if (user) {
        return user;
    }

    try {
        const { data } = await api.get('/auth/me');
        setUser(data);
        return data;
    } catch (err) {
        if (err instanceof AxiosError && err.response?.status === 401) {
            logout()
            return null;
        }

        console.error('Fetch user error:', err);
        logout()
        throw err;
    }
}

export async function signOut() {
    const { logout } = useAuthStore.getState();
    try {
        await api.post('/auth/logout', {}, { withCredentials: true });
    } catch (err) {
        console.error('Logout error:', err);
    } finally {
        logout();
    }
}