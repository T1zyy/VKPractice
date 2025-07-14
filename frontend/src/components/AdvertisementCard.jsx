export default function AdvertisementCard({ ad }) {
    return (
        <div className="p-4 border rounded shadow">
            <h2 className="text-lg font-bold">{ad.title}</h2>
            <p>{ad.description}</p>
            <p className="text-gray-600">Цена: {ad.price} ₽</p>
            <p className="text-gray-600">Где: {ad.address}</p>
        </div>
    );
}