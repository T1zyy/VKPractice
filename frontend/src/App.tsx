import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

        bridge.subscribe(async ({ detail: { type, data } }) => {
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
                setAuth(token, vkUserId);
            }
        });

        bridge.send('VKWebAppGetAuthToken', {
            app_id: 53862226, // Заменить на свой app_id
            scope: ''
        });
    }, []);

    return (
        <Router>
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
        </Router>
    );
}

export default App;
