import {useEffect, useState} from "react";
import api from "../services/api";

function Customers() {
    const [customers, setCustomers] = useState([]);
    const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
    const [error, setError] = useState(null);

    // Müşterileri çek
    useEffect(() => {
        api.get("/customers")
            .then(res => setCustomers(res.data))
            .catch(() => setError("Müşteri listesi alınamadı."));
    }, []);

    // Form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/customers", form);
            setForm({ name: "", email: "", phone: "", address: "" });
            const res = await api.get("/customers");
            setCustomers(res.data);
        } catch {
            setError("Müşteri eklenemedi.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow rounded-xl">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Müşteriler</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Ad Soyad"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="email"
                    placeholder="E-posta"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Telefon"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Adres"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="border p-2 rounded"
                />
                <button type="submit" className="md:col-span-2 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
                    Ekle
                </button>
            </form>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <ul className="divide-y divide-gray-200">
                {customers.map((c) => (
                    <li key={c.id} className="py-2">
                        <strong>{c.name}</strong> – {c.email} – {c.phone}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Customers;
