import { useNavigate } from 'react-router-dom';
import bridge from '@vkontakte/vk-bridge';
import { useAuthStore } from '../store/authStore';

export default function LoginChoicePage() {
    const navigate = useNavigate();
    const { setAuth } = useAuthStore();

    const handleLogin = async () => {
        try {
            await bridge.send('VKWebAppInit');
            const userInfo = await bridge.send('VKWebAppGetUserInfo');
            const vkUserId = userInfo.id;

            const profileData = {
                id: vkUserId,
                firstName: userInfo.first_name,
                lastName: userInfo.last_name,
                city: userInfo.city?.title || 'Не указан',
                sex: userInfo.sex === 1 ? 'FEMALE' : 'MALE',
                photoUrl: userInfo.photo_200 || '',
                balance: 0,
                createdAt: new Date().toISOString(),
            };

            const res = await fetch('https://vkpractice-production.up.railway.app/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData),
            });

            if (!res.ok) {
                console.error(`Login failed with status ${res.status}`);
                return;
            }

            const { accessToken, refreshToken } = await res.json();

            localStorage.setItem('vkUserId', vkUserId.toString());

            setAuth(accessToken, refreshToken, vkUserId);
            navigate('/');
        } catch (error) {
            console.error('Ошибка авторизации:', error);
        }
    };
    const handleSkipLogin = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-100 p-4">
            <h1 className="text-2xl font-bold text-green-700">Добро пожаловать в AgriTradeHub</h1>
            <button
                onClick={handleLogin}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded text-lg"
            >
                Войти через VK
            </button>
            <button
                onClick={handleSkipLogin}
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded text-lg"
            >
                Продолжить без входа
            </button>
        </div>
    );
}