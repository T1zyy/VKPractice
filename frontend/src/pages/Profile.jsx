import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

export default function Profile() {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        api.get(`/profile/${id}`).then(res => setUser(res.data));
    }, [id]);

    if (!user) return <p className="p-4">Загрузка профиля...</p>;

    return (
        <div className="p-4">
            <div className="flex items-center gap-4 mb-4">
                <div>
                    <h2 className="text-xl font-bold">{user.firstName} {user.lastName}</h2>
                    <p>{user.city}</p>
                    <p>{user.sex === 'Male' ? 'Мужчина' : 'Женщина'}</p>
                </div>
            </div>
        </div>
    );
}