import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { useAuthStore } from './store/authStore';
import Navbar from './components/Navbar';

import Search from './pages/Search';
import Profile from './pages/Profile';
import AdvertisementCreate from './pages/AdvertisementCreate';
import Chat from './pages/Chat';

function App() {
    const { setAuth } = useAuthStore();

    useEffect(() => {
        const init = async () => {
            try {
                await bridge.send('VKWebAppInit');

                const tokenFromStorage = localStorage.getItem('token');
                const userInfo = await bridge.send('VKWebAppGetUserInfo');
                const vkUserId = userInfo.id;

                if (tokenFromStorage) {
                    setAuth(tokenFromStorage, vkUserId);
                    return;
                }

                const profileData = {
                    id: vkUserId,
                    firstName: userInfo.first_name,
                    lastName: userInfo.last_name,
                    city: userInfo.city?.title || 'Не указан',
                    sex: userInfo.sex === 1 ? 'FEMALE' : 'MALE',
                    photoUrl: userInfo.photo_200 || '',
                    balance: 0,
                    createdAt: new Date().toISOString()
                };

                const res = await fetch('https://vkpractice-production.up.railway.app/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(profileData)
                });

                if (!res.ok) {
                    throw new Error(`Login failed with status ${res.status}`);
                }

                const token = await res.text();
                setAuth(token, vkUserId);
                localStorage.setItem('token', token);
            } catch (err) {
                console.error('Ошибка при инициализации приложения:', err);
            }
        };

        init();
    }, [setAuth]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
                <Route path="/" element={<Search />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/create" element={<AdvertisementCreate />} />
                <Route path="/chat/:chatId" element={<Chat />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default App;