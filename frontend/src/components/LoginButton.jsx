import { useState } from 'react';
import api from '../api/axios';

export default function LoginButton() {
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

    const login = async () => {
        try {
            const res = await api.post('/auth/login', {
                vkUserId: '1' // ← временный id
            });
            const { token, userId } = res.data;

            // сохраняем токен в браузере
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);

            setUserId(userId);
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
            const res = await api.get('/chat'); // пример защищённого запроса
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
                    Войти (vkUserId: 12345)
                </button>
            )}
        </div>
    );
}