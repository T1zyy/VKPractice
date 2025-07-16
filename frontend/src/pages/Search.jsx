import { useEffect, useState } from 'react';
import api from '../api/axios';

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
        if (keyword || place) {
            search();
        } else {
            api.get('/recommendations', { params: { page } })
                .then(res => setResults(res.data.content))
                .catch(() => setResults([]));
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
        </div>
    );
}