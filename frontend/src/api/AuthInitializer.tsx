import { useEffect, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const AuthInitializer = ({ onReady }: { onReady: () => void }) => {
    const { setAuth } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        const init = async () => {
            try {
                await bridge.send('VKWebAppInit');

                const accessToken = localStorage.getItem('accessToken');
                const refreshToken = localStorage.getItem('refreshToken');
                const userId = localStorage.getItem('userId');

                if (accessToken && refreshToken && userId) {
                    setAuth(accessToken, refreshToken, Number(userId));
                } else {
                    navigate('/');
                }

                onReady();
            } catch (err) {
                console.error('VK Bridge init failed:', err);
                navigate('/');
                onReady();
            }
        };

        init();
    }, []);

    return null;
};

export default AuthInitializer;