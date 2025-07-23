import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import {AdvertisementPage} from "../hateoas/interfaces";

export default function AdvertisementPage() {
    const { advertisementId } = useParams();
    const [ad, setAd] = useState<AdvertisementPage | null>(null);

    useEffect(() => {
        api.get(`/advertisement/${advertisementId}`)
            .then(res => setAd(res.data))
            .catch(err => {
                console.error('Failed to load advertisement:', err);
            });
    }, [advertisementId]);

    if (!ad) return <p className="p-6 text-lg">Загрузка объявления...</p>;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-4">{ad.title}</h1>
                    <p className="text-gray-700 text-lg mb-2"><strong>Цена:</strong> {ad.price} ₽</p>
                    <p className="text-gray-700 text-lg mb-2"><strong>Вес:</strong> {ad.weight} кг</p>
                    <p className="text-gray-700 text-lg mb-4"><strong>Адрес:</strong> {ad.address}</p>
                    <p className="text-gray-600 whitespace-pre-line">{ad.description}</p>
                </div>
            </div>
        </div>
    );
}