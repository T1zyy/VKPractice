import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Profile() {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/profile/${id}`).then(res => setProfile(res.data));
    }, [id]);

    if (!profile) return <p className="p-4">Загрузка профиля...</p>;

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Профиль пользователя</h1>

            <div className="flex gap-4 items-start">
                <img
                    src={profile.photoUrl}
                    alt="Фото пользователя"
                    className="w-24 h-24 rounded-full object-cover border"
                />

                <div>
                    <p><strong>Имя:</strong> {profile.firstName} {profile.lastName}</p>
                    <p><strong>Город:</strong> {profile.city}</p>
                    <p><strong>Пол:</strong> {profile.sex === 'MALE' ? 'Мужской' : 'Женский'}</p>
                    <p><strong>Баланс:</strong> {profile.balance} ₽</p>
                </div>
            </div>

            <button
                onClick={() => navigate('/')}
                className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
            >
                Назад к объявлениям
            </button>
        </div>
    );
}