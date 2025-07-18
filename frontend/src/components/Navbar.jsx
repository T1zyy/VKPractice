import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const { userId } = useAuthStore();
    return (
        <nav className="bg-white shadow p-4 flex justify-between items-center">
            <Link to="/" className="font-bold text-xl text-green-700">AgriTradeHub</Link>
            <div className="flex gap-4 items-center">

                <Link to="/" className="text-gray-700 hover:text-green-700">Объявления</Link>
                {userId && (
                    <Link
                        to={`/profile/${userId}`}
                        className="text-gray-700 hover:text-green-700"
                    >
                        Профиль
                    </Link>
                )}
            </div>
        </nav>
    );
}