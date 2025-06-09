import {useEffect, useState} from "react";
import {getProfile} from "../services/authService";

function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const data = await getProfile();
                setUser(data);
            } catch (err) {
                console.error("Profil bilgisi alınamadı:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, []);

    if (loading) return <div className="p-4">Yükleniyor...</div>;

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Profil Bilgileri</h2>
            <div className="space-y-2">
                <p><strong>Firma Adı:</strong> {user.businessName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Rol:</strong> {user.role}</p>
            </div>
        </div>
    );
}

export default Profile;
