import { useEffect, useState } from 'react';
import api from '../api/axios';
import AdvertisementCard from '../components/AdvertisementCard';

export default function Search() {
    const [keyword, setKeyword] = useState('');
    const [place, setPlace] = useState('');
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(0);

    const search = async () => {
        const res = await api.get('/search', {
            params: { keyword, place, page }
        });
        setResults(res.data.content);
    };

    useEffect(() => {
        search();
    }, [page]);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Поиск объявлений</h1>
            <div className="flex gap-2 mb-4">
                <input
                    className="border p-2 rounded w-1/3"
                    placeholder="Что ищем?"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input
                    className="border p-2 rounded w-1/3"
                    placeholder="Где ищем?"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={search}
                >
                    Поиск
                </button>
            </div>
            <div className="grid gap-4">
                {results.map(ad => (
                    <AdvertisementCard key={ad.id} ad={ad} />
                ))}
            </div>
        </div>
    );
}