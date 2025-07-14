import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function AdvertisementCreate() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        weight: '',
        address: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/advertisement', form);
            navigate('/');
        } catch (err) {
            alert('Ошибка при создании объявления');
        }
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Создание объявления</h1>
            <form onSubmit={handleSubmit} className="grid gap-4">
                <input name="title" placeholder="Заголовок" onChange={handleChange} required className="border p-2 rounded" />
                <textarea name="description" placeholder="Описание" onChange={handleChange} required className="border p-2 rounded" />
                <input name="price" type="number" placeholder="Цена" onChange={handleChange} required className="border p-2 rounded" />
                <input name="weight" type="number" placeholder="Вес" onChange={handleChange} required className="border p-2 rounded" />
                <input name="address" placeholder="Адрес" onChange={handleChange} required className="border p-2 rounded" />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                    Опубликовать
                </button>
            </form>
        </div>
    );
}
