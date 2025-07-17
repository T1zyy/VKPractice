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

    if (!profile) return <p className="p-4 text-lg">Загрузка профиля...</p>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Профиль пользователя</h1>

            <div className="flex items-start gap-10">
                <img
                    src={profile.photoUrl}
                    alt="Фото пользователя"
                    className="w-40 h-40 rounded-full object-cover border shadow-md"
                />

                <div className="text-lg space-y-3">
                    <p><strong>Имя:</strong> {profile.firstName} {profile.lastName}</p>
                    <p><strong>Город:</strong> {profile.city}</p>
                    <p><strong>Пол:</strong> {profile.sex === 'MALE' ? 'Мужской' : 'Женский'}</p>
                    <p><strong>Баланс:</strong> {profile.balance} ₽</p>
                </div>
            </div>
        </div>
    );
}