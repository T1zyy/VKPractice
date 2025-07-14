import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Search from './pages/Search';
import Profile from './pages/Profile';
import AdvertisementCreate from './pages/AdvertisementCreate';
import Chat from './pages/Chat';
import Navbar from './components/Navbar';

function App() {
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