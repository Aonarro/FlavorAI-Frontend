import {create} from 'zustand';

interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    setUser: (user: User | null, token?: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    accessToken: null,
    setUser: (user, token) => set({
        user: user || null,
        accessToken: token || null
    }),
    logout: () => set({user: null, accessToken: null}),
}));