import { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import api from '../api/axios';

export default function LoginButton() {
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

    const login = async () => {
        try {
            // Инициализация VK Bridge и получение информации о пользователе
            await bridge.send('VKWebAppInit');
            const user = await bridge.send('VKWebAppGetUserInfo');

            const profileData = {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                city: user.city?.title || 'Не указан',
                sex: user.sex === 1 ? 'FEMALE' : 'MALE',
                photoUrl: user.photo_200 || '',
                balance: 0,
                createdAt: new Date().toISOString(), // ISO формат для LocalDateTime
            };

            const res = await api.post('/auth/login', profileData);
            const token = res.data;

            localStorage.setItem('token', token);
            localStorage.setItem('userId', user.id);

            setUserId(user.id.toString());
            setLoggedIn(true);

            console.log('Авторизация прошла успешно');
        } catch (err) {
            console.error('Ошибка входа:', err);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setLoggedIn(false);
        setUserId(null);
    };

    const testProtected = async () => {
        try {
            const res = await api.get('/chat');
            console.log('Ответ с сервера:', res.data);
        } catch (err) {
            console.error('Ошибка запроса:', err);
        }
    };

    return (
        <div className="p-4 bg-white rounded shadow w-fit">
            {loggedIn ? (
                <>
                    <p className="mb-2 text-green-600">Вы вошли как: {userId}</p>
                    <button className="bg-red-500 text-white px-4 py-1 rounded mr-2" onClick={logout}>
                        Выйти
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={testProtected}>
                        Тест запроса
                    </button>
                </>
            ) : (
                <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={login}>
                    Войти через VK
                </button>
            )}
        </div>
    );
}