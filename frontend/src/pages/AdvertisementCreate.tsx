import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthStore } from '../store/authStore';
import axios from "axios";

const categories = [
    { value: 'GRAINS', label: 'Зерновые культуры' },
    { value: 'OIL_CROPS', label: 'Масличные культуры' },
    { value: 'VEGETABLES', label: 'Овощи' },
    { value: 'FRUITS_BERRIES', label: 'Фрукты и ягоды' },
    { value: 'GREENS', label: 'Зелень' },
    { value: 'SEEDS', label: 'Семена' },
    { value: 'CATTLE', label: 'Крупный рогатый скот' },
    { value: 'SMALL_LIVESTOCK', label: 'Мелкий скот' },
    { value: 'POULTRY', label: 'Птица' },
    { value: 'PIGS', label: 'Свиньи' },
    { value: 'FEED', label: 'Корма' },
    { value: 'FERTILIZERS', label: 'Удобрения' },
    { value: 'PLANT_PROTECTION', label: 'Средства защиты растений' },
    { value: 'DAIRY', label: 'Молочная продукция' },
    { value: 'MEAT', label: 'Мясо' },
    { value: 'EGGS', label: 'Яйца' },
    { value: 'HONEY', label: 'Мёд' },
    { value: 'GRAIN_PRODUCTS', label: 'Зерновая продукция' },
    { value: 'GARDEN_PRODUCE', label: 'Садовая продукция' },
    { value: 'OTHERS', label: 'Другое' },
    { value: 'SERVICES', label: 'Услуги' }
];

export default function AdvertisementCreate() {
    const { userId } = useAuthStore();
    const navigate = useNavigate();

    const [submitting, setSubmitting] = useState(false);

    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        weight: '',
        address: '',
        category: 'OTHERS',
        contacts: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!form.title.trim()) return 'Введите заголовок';
        if (!form.description.trim()) return 'Введите описание';
        if (!form.price || isNaN(+form.price) || +form.price <= 0) return 'Введите корректную цену';
        if (!form.weight || isNaN(+form.weight) || +form.weight <= 0) return 'Введите корректный вес';
        if (!form.address.trim()) return 'Введите адрес';
        return null;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const error = validateForm();
        if (error) return toast.error(error);

        if (submitting) return;

        setSubmitting(true);
        try {
            await api.post('/advertisement', {
                ...form,
                price: +form.price,
                weight: +form.weight,
            });
            toast.success('Объявление успешно создано!');
            setTimeout(() => navigate(`/profile/${userId}`), 1000);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error('Ошибка:', err.response);
            } else {
                console.error('Неизвестная ошибка:', err);
            }
            toast.error('Ошибка при создании объявления');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-green-700">Разместить объявление</h1>
            <form onSubmit={handleSubmit} className="grid gap-5">
                <input name="title" placeholder="Заголовок" onChange={handleChange} value={form.title} className="border p-3 rounded w-full" />
                <textarea name="description" placeholder="Описание" onChange={handleChange} value={form.description} className="border p-3 rounded w-full h-28" />
                <input name="price" type="number" inputMode="decimal" placeholder="Цена (₽)" onChange={handleChange} value={form.price} className="border p-3 rounded w-full" />
                <input name="weight" type="number" inputMode="decimal" placeholder="Вес (кг)" onChange={handleChange} value={form.weight} className="border p-3 rounded w-full" />
                <input name="address" placeholder="Адрес" onChange={handleChange} value={form.address} className="border p-3 rounded w-full" />
                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="border p-3 rounded w-full"
                >
                    {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                </select>
                <textarea name="contacts" placeholder="Контакты" onChange={handleChange} value={form.contacts} className="border p-3 rounded w-full h-28" />
                <button
                    type="submit"
                    disabled={submitting}
                    className={`bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded ${submitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                    {submitting ? 'Публикуется...' : 'Опубликовать'}
                </button>
            </form>
        </div>
    );
}