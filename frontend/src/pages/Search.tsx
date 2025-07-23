import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { SearchResponse, AdvertisementList } from '../hateoas/interfaces';

export default function Search() {
    const [keyword, setKeyword] = useState('');
    const [place, setPlace] = useState('');
    const [page] = useState(0);
    const [results, setResults] = useState<AdvertisementList[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const endpoint = keyword || place ? '/search' : '/recommendations';
            const params = { keyword, place, page };

            const res = await api.get<SearchResponse>(endpoint, { params });
            const ads = res.data?._embedded?.showAdvertisementList ?? [];
            setResults(ads);
        } catch (e) {
            console.error('Ошибка при загрузке объявлений:', e);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    return (
        <div className="p-4">
            <div className="mb-4 text-gray-700 font-semibold text-lg">Поиск объявлений</div>

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
                    onClick={fetchData}
                >
                    Поиск
                </button>
            </div>

            {loading ? (
                <p className="text-gray-500 text-center">Загрузка...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.length > 0 ? (
                        results.map((ad) => (
                            <div key={ad.id} className="border rounded p-4 bg-white shadow">
                                <Link to={`/advertisement/${ad.id}`} className="text-lg font-semibold mb-2 text-blue-600 hover:underline block">
                                    {ad.title}
                                </Link>
                                <p className="text-sm text-gray-700 mb-1">Цена: {ad.price} ₽</p>
                                <p className="text-sm text-gray-700 mb-1">Вес: {ad.weight} кг</p>
                                <p className="text-sm text-gray-700 mb-1">Адрес: {ad.address}</p>
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-500 col-span-full text-center">Нет объявлений</div>
                    )}
                </div>
            )}
        </div>
    );
}