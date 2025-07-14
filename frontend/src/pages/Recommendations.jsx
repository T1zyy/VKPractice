import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Recommendations() {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        api.get('/recommendations?page=0')
            .then(res => setAds(res.data.content || []))
            .catch(console.error);
    }, []);

    return (
        <div className="p-4">
            <h1>Рекомендации</h1>
            <ul>
                {ads.map(ad => (
                    <li key={ad.id}>{ad.title} - {ad.price} ₽</li>
                ))}
            </ul>
        </div>
    );
}