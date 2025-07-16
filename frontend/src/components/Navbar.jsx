import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="w-full flex justify-between items-center px-4 py-3 bg-white shadow-md">
            <Link to="/" className="text-xl font-bold text-green-700">AgroHub</Link>
            <Link to="/profile/me" className="text-sm text-gray-600">Профиль</Link>
        </nav>
    );
};

export default Navbar;
