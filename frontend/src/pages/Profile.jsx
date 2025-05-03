import {useEffect, useState} from "react";
import api from "../services/api";

function Profile() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get("/user/me")
            .then((res) => setUser(res.data))
            .catch((err) => {
                console.error("Yetkisiz erişim!", err);
                setError("Profil bilgileri alınamadı.");
            });
    }, []);

    if (error) {
        return <div className="text-center text-red-500 mt-8">{error}</div>;
    }

    if (!user) {
        return <div className="text-center text-gray-500 mt-8">Yükleniyor...</div>;
    }

    return (
        <div className="max-w-md mx-auto bg-white mt-12 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4 text-center text-indigo-600">Profil Bilgileri</h2>
            <div className="space-y-2">
                <p><strong>E-posta:</strong> {user.email}</p>
                <p><strong>Firma Adı:</strong> {user.businessName}</p>
                <p><strong>Rol:</strong> {user.role}</p>
            </div>
        </div>
    );
}

export default Profile;
