import { create } from 'zustand';

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    userId: number | null;

    setTokens: (accessToken: string, refreshToken: string) => void;
    setAuth: (accessToken: string, refreshToken: string, userId: number) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
        userId: localStorage.getItem('userId') ? +localStorage.getItem('userId')! : null,

        setTokens: (accessToken, refreshToken) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        set({ accessToken, refreshToken });
    },

    setAuth: (accessToken, refreshToken, userId) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userId', userId.toString());
        set({ accessToken, refreshToken, userId });
    },

    logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
        set({ accessToken: null, refreshToken: null, userId: null });
    }
}));