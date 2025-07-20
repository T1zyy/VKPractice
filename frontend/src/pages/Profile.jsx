import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Profile() {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();
    const [ads, setAds] = useState([]);

    useEffect(() => {
        api.get(`/profile/${id}`).then(res => setProfile(res.data));
        api.get(`/profile/${id}/advertisements`).then(res => setAds(res.data));
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

            <h2 className="text-lg font-bold mt-6 mb-2">Объявления пользователя</h2>
            <div className="grid gap-4">
                {ads.map(ad => (
                    <div key={ad.id} className="p-4 border rounded shadow">
                        <h3 className="font-semibold">{ad.title}</h3>
                        <p>{ad.description}</p>
                        <p className="text-green-600 font-bold">{ad.price} ₽</p>
                    </div>
                ))}
            </div>
        </div>

    );
}