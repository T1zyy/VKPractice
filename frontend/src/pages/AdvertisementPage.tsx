import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { PageAdvertisement, User } from "../hateoas/interfaces";
import { useAuthStore } from '../store/authStore';

export default function AdvertisementPage() {
    const { advertisementId } = useParams();
    const [ad, setAd] = useState<PageAdvertisement | null>(null);
    const [seller, setSeller] = useState<User | null>(null);
    const navigate = useNavigate();
    const { accessToken } = useAuthStore();

    useEffect(() => {
        if (!advertisementId) return;

        api.get(`/advertisement/${advertisementId}`)
            .then(res => {
                setAd(res.data);
                return api.get(`/user/${res.data.userId}`);
            })
            .then(res => {
                setSeller(res.data);
            })
            .catch(err => {
                console.error('Failed to load advertisement or seller:', err);
            });
    }, [advertisementId]);

    if (!ad || !seller) return <p className="p-6 text-lg">Загрузка объявления...</p>;

    const handleStartChat = async () => {
        try {
            const res = await api.post('/chat', seller.id, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            });

            const chat = res.data;
            if (chat?.id) {
                navigate(`/chat/${chat.id}`);
            } else {
                console.error('Чат не создан или не пришёл chat.id');
            }
        } catch (err) {
            console.error('Ошибка при создании чата:', err);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 flex gap-6">
            {/* Левая часть: объявление */}
            <div className="w-2/3 bg-white rounded-xl shadow-lg overflow-hidden border p-6">
                <h1 className="text-3xl font-bold mb-4">{ad.title}</h1>
                <p className="text-gray-700 text-lg mb-2"><strong>Цена:</strong> {ad.price} ₽</p>
                <p className="text-gray-700 text-lg mb-2"><strong>Вес:</strong> {ad.weight} кг</p>
                <p className="text-gray-700 text-lg mb-4"><strong>Адрес:</strong> {ad.address}</p>
                <p className="text-gray-600 whitespace-pre-line">{ad.description}</p>
            </div>

            {/* Правая часть: продавец */}
            <div className="w-1/3 flex flex-col justify-between">
                <div
                    className="bg-white rounded-xl shadow-lg border p-4 cursor-pointer hover:bg-gray-50 transition"
                    onClick={() => navigate(`/profile/${seller.id}`)}
                >
                    <img
                        src={seller.photoUrl}
                        alt={`${seller.firstName} ${seller.lastName}`}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <p className="text-center text-xl font-semibold">{seller.firstName} {seller.lastName}</p>
                </div>
            </div>
        </div>
    );
}