import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthStore } from '../store/authStore';

const categories = [
    'GRAINS', 'OIL_CROPS', 'VEGETABLES', 'FRUITS_BERRIES', 'GREENS', 'SEEDS',
    'CATTLE', 'SMALL_LIVESTOCK', 'POULTRY', 'PIGS', 'FEED',
    'FERTILIZERS', 'PLANT_PROTECTION',
    'DAIRY', 'MEAT', 'EGGS', 'HONEY', 'GRAIN_PRODUCTS', 'GARDEN_PRODUCE',
    'OTHERS'
];

export default function AdvertisementCreate() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        weight: '',
        address: '',
        category: 'OTHERS',
    });

    const navigate = useNavigate();
    const { userId } = useAuthStore();

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const validateForm = () => {
        if (!form.title.trim()) return 'Введите заголовок';
        if (!form.description.trim()) return 'Введите описание';
        if (!form.price || isNaN(form.price) || parseFloat(form.price) <= 0) return 'Введите корректную цену';
        if (!form.weight || isNaN(form.weight) || parseFloat(form.weight) <= 0) return 'Введите корректный вес';
        if (!form.address.trim()) return 'Введите адрес';
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validateForm();
        if (error) return toast.error(error);

        try {
            await api.post('/advertisement', {
                ...form,
                price: parseFloat(form.price),
                weight: parseFloat(form.weight)
            });
            toast.success('Объявление успешно создано!');
            setTimeout(() => navigate(`/profile/${userId}`), 1000);
        } catch (err) {
            toast.error('Ошибка при создании объявления');
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-green-700">Разместить объявление</h1>
            <form onSubmit={handleSubmit} className="grid gap-5">
                <input name="title" placeholder="Заголовок" onChange={handleChange} value={form.title} className="border p-3 rounded w-full" />
                <textarea name="description" placeholder="Описание" onChange={handleChange} value={form.description} className="border p-3 rounded w-full h-28" />
                <input name="price" type="number" step="0.01" placeholder="Цена (₽)" onChange={handleChange} value={form.price} className="border p-3 rounded w-full" />
                <input name="weight" type="number" step="0.01" placeholder="Вес (кг)" onChange={handleChange} value={form.weight} className="border p-3 rounded w-full" />
                <input name="address" placeholder="Адрес" onChange={handleChange} value={form.address} className="border p-3 rounded w-full" />

                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="border p-3 rounded w-full"
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat.replaceAll('_', ' ')}</option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded"
                >
                    Опубликовать
                </button>
            </form>
        </div>
    );
}