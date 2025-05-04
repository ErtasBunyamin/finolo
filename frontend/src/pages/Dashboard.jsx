import React, {useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext";
import {getDashboardSummary} from "../services/dashboardService";

function Dashboard() {
    const { token } = useAuth();
    const [summary, setSummary] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const data = await getDashboardSummary();

                if (data.success) {
                    setSummary(data.data);
                } else {
                    setError(data.message || "Veriler alınamadı.");
                }
            } catch (err) {
                console.error("Dashboard API hatası:", err);
                setError("Dashboard verileri alınamadı.");
            }
        };

        fetchSummary();
    }, [token]);

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!summary) {
        return <p>Yükleniyor...</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold">Toplam Fatura</h2>
                    <p className="text-2xl">{summary.totalInvoices}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold">Toplam Müşteri</h2>
                    <p className="text-2xl">{summary.totalCustomers}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold">Toplam Gelir</h2>
                    <p className="text-2xl">{summary.totalRevenue.toFixed(2)} ₺</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold">Bekleyen Ödemeler</h2>
                    <p className="text-2xl">{summary.unpaidInvoices}</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
