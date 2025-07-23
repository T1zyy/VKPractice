import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { useAuthStore } from './store/authStore';
import Navbar from './components/Navbar';

import Search from './pages/Search';
import Profile from './pages/Profile';
import AdvertisementCreate from './pages/AdvertisementCreate';
import Chat from './pages/Chat';
import { ToastContainer } from 'react-toastify';
import AdvertisementPage from "./pages/AdvertisementPage";

function App() {
    const { setAuth } = useAuthStore();

    useEffect(() => {
        const init = async () => {
            try {
                await bridge.send('VKWebAppInit');

                const accessTokenFromStorage = localStorage.getItem('accessToken');
                const refreshTokenFromStorage = localStorage.getItem('refreshToken');
                const userInfo = await bridge.send('VKWebAppGetUserInfo');
                const vkUserId = userInfo.id;

                if (accessTokenFromStorage && refreshTokenFromStorage) {
                    setAuth(accessTokenFromStorage, refreshTokenFromStorage, vkUserId);
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
                    console.error(`Login failed with status ${res.status}`);
                    return;
                }

                const { accessToken, refreshToken } = await res.json();
                setAuth(accessToken, refreshToken, vkUserId);
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
                <Route path="/advertisement/:advertisementId" element={<AdvertisementPage />} />
            </Routes>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}

export default App;