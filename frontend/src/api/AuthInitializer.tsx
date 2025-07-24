import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function AuthInitializer() {
    const { setAuth } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const userId = localStorage.getItem('userId');

        if (accessToken && refreshToken && userId) {
            setAuth(accessToken, refreshToken, Number(userId));
        } else {
            navigate('/');
        }
    }, []);

    return null;
}