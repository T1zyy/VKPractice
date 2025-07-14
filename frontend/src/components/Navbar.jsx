import { Link } from 'react-router-dom';
import LoginButton from "./LoginButton";

export default function Navbar() {
    return (
        <nav className="bg-white shadow p-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
                TradeHub
            </Link>
            <div className="flex gap-4">
                <LoginButton />
                <Link to="/search" className="text-gray-700 hover:text-blue-500">Поиск</Link>
                <Link to="/create" className="text-gray-700 hover:text-blue-500">Создать</Link>
                <Link to="/profile/1" className="text-gray-700 hover:text-blue-500">Профиль</Link>
            </div>
        </nav>
    );
}