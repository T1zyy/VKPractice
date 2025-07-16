import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const { userId } = useAuthStore();

    return (
        <nav className="bg-white shadow p-4 flex justify-between">
            <Link to="/" className="font-bold text-xl text-green-700">AgriTradeHub</Link>
            <div className="flex gap-4">
                <Link to="/">Объявления</Link>
                {userId && <Link to={`/profile/${userId}`}>Профиль</Link>}
            </div>
        </nav>
    );
}