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
        bridge.send('VKWebAppInit');
        bridge.send('VKWebAppGetAuthToken', {
            app_id: 53862226,
            scope: ''
        });

        const handler = async ({ detail: { type } }: any) => {
            if (type === 'VKWebAppAccessTokenReceived') {
                const user = await bridge.send('VKWebAppGetUserInfo');
                const vkUserId = user.id.toString();

                const res = await fetch('https://vkpractice-production.up.railway.app/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ vk_user_id: vkUserId })
                });

                const token = await res.text();
                console.log("TOKEN:", token);
                setAuth(token, vkUserId);

                try {
                    await fetch('https://vkpractice-production.up.railway.app/profile', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            id: Number(vkUserId),
                            firstName: user.first_name,
                            lastName: user.last_name,
                            city: user.city?.title || 'Не указан',
                            sex: user.sex === 1 ? 'FEMALE' : 'MALE',
                            balance: 0
                        })
                    });
                } catch (e) {
                    console.warn("Профиль уже существует или ошибка создания", e);
                }
            }
        };

        bridge.subscribe(handler);

        return () => {
            bridge.unsubscribe(handler);
        };
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