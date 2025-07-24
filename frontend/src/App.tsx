import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import Navbar from './components/Navbar';

import Search from './pages/Search';
import Profile from './pages/Profile';
import AdvertisementCreate from './pages/AdvertisementCreate';
import Chat from './pages/Chat';
import { ToastContainer } from 'react-toastify';
import AdvertisementPage from './pages/AdvertisementPage';
import BalancePage from './pages/BalancePage';
import LoginChoicePage from './pages/LoginChoisePage';

function App() {
    const { setAuth } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        const accessTokenFromStorage = localStorage.getItem('accessToken');
        const refreshTokenFromStorage = localStorage.getItem('refreshToken');
        const vkUserIdFromStorage = localStorage.getItem('vkUserId');

        if (!accessTokenFromStorage || !refreshTokenFromStorage || !vkUserIdFromStorage) {
            navigate('/welcome');
            return;
        }

        setAuth(accessTokenFromStorage, refreshTokenFromStorage, +vkUserIdFromStorage);
    }, []);
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
                <Route path="/" element={<Search />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/create" element={<AdvertisementCreate />} />
                <Route path="/chat/:chatId" element={<Chat />} />
                <Route path="/advertisement/:advertisementId" element={<AdvertisementPage />} />
                <Route path="/balance" element={<BalancePage />} />
                <Route path="/welcome" element={<LoginChoicePage />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}

export default App;