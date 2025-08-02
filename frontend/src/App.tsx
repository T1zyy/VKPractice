import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';

import Search from './pages/Search';
import Profile from './pages/Profile';
import AdvertisementCreate from './pages/AdvertisementCreate';
import Chat from './pages/Chat';
import AdvertisementPage from './pages/AdvertisementPage';
import BalancePage from './pages/BalancePage';
import LoginChoicePage from './pages/LoginChoisePage';
import AuthInitializer from './api/AuthInitializer';
import { ToastContainer } from 'react-toastify';
import './index.css';

function App() {
    const [ready, setReady] = useState(false);

    if (!ready) {
        return <AuthInitializer onReady={() => setReady(true)} />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
                <Route path="/search" element={<Search />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/create" element={<AdvertisementCreate />} />
                <Route path="/chat/:chatId" element={<Chat />} />
                <Route path="/advertisement/:advertisementId" element={<AdvertisementPage />} />
                <Route path="/balance" element={<BalancePage />} />
                <Route path="/" element={<LoginChoicePage />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}

export default App;