import { useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const AuthInitializer = () => {
    const { setAuth } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        bridge.send('VKWebAppInit');

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
};

export default AuthInitializer;