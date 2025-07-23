import { useEffect, useState } from 'react';
import api from '../api/axios';
import {Link} from 'react-router-dom';

export default function Search() {
    const [keyword, setKeyword] = useState('');
    const [place, setPlace] = useState('');
    const [results, setResults] = useState([]);
    const [page] = useState(0);

    const search = async () => {
        try {
            const res = await api.get('/search', {
                params: { keyword, place, page }
            });
            console.log('Search response:', res.data);
            setResults(res.data?._embedded?.showAdvertisementList ?? []);
        } catch (e) {
            console.error('Search failed:', e);
            setResults([]);
        }
    };

    useEffect(() => {
        const loadRecommendations = async () => {
            try {
                const res = await api.get('/recommendations', { params: { page } });
                console.log('Recommendations response:', res.data);
                setResults(res.data?._embedded?.showAdvertisementList ?? []);
            } catch (e) {
                console.error('Recommendations failed:', e);
                setResults([]);
            }
        };

        if (keyword || place) {
            search();
        } else {
            loadRecommendations();
        }
    }, [page]);

    return (
        <div className="p-4">
            <div className="mb-2 text-gray-700 font-medium">Фильтрация</div>
            <div className="flex flex-wrap items-end gap-4 mb-6">
                <div className="flex flex-col">
                    <label htmlFor="keyword" className="text-sm mb-1">Ключевые слова</label>
                    <input
                        id="keyword"
                        className="border p-2 rounded w-60"
                        placeholder="Введите ключевые слова"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="place" className="text-sm mb-1">Адрес</label>
                    <input
                        id="place"
                        className="border p-2 rounded w-60"
                        placeholder="Введите адрес"
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                    />
                </div>
                <button
                    className="bg-blue-500 text-white px-6 py-2 rounded h-[42px]"
                    onClick={search}
                >
                    Поиск
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.length > 0 ? (
                    results.map((ad, index) => (
                        <div key={index} className="border rounded p-4 bg-white shadow">
                            <Link to={`/advertisement/${ad.id}`} className="text-lg font-semibold mb-2 text-blue-600 hover:underline">
                                {ad.title}
                            </Link>
                            <p className="text-sm text-gray-700 mb-1">Цена: {ad.price} ₽</p>
                            <p className="text-sm text-gray-700 mb-1">Вес: {ad.weight} кг</p>
                            <p className="text-sm text-gray-700 mb-1">Адрес: {ad.address}</p>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500 col-span-full">Нет объявлений</div>
                )}
            </div>
        </div>
    );
}