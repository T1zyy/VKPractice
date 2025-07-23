import { useState } from 'react';
import api from '../api/axios';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export default function BalancePage() {
    const [amount, setAmount] = useState('');
    const { userId } = useAuthStore();
    const navigate = useNavigate();

    const handleAdd = async () => {
        const value = parseFloat(amount);
        if (!userId || isNaN(value) || value <= 0) {
            alert('Введите корректную сумму');
            return;
        }

        try {
            await api.post('/replenishment', {
                userId: userId,
                amount: value
            });

            alert(`Баланс пополнен на ${value} ₽`);
            navigate('/');
        } catch (err) {
            console.error('Ошибка пополнения:', err);
            alert('Ошибка при пополнении баланса');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Пополнение баланса</h1>
            <input
                type="number"
                placeholder="Введите сумму"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full p-2 border rounded mb-4"
            />
            <button
                onClick={handleAdd}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
                Пополнить
            </button>
        </div>
    );
}