import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Balance() {
    const { userId } = useAuthStore();
    const [balance, setBalance] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            api.get(`/profile/${userId}`)
                .then(res => setBalance(res.data.balance))
                .catch(err => {
                    console.error('Failed to fetch balance:', err);
                });
        }
    }, [userId]);

    return (
        <div
            onClick={() => navigate('/balance')}
    className="cursor-pointer text-gray-700 hover:text-green-700"
    title="Пополнить баланс"
        >
        Баланс: {balance !== null ? `${balance} ₽` : '...'}
    </div>
);
}