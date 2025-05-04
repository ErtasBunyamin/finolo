import React, {useEffect, useState} from "react";
import {getDashboardSummary, getRecentInvoices} from "../services/dashboardService";

function Dashboard() {
    const [summary, setSummary] = useState(null);
    const [recentInvoices, setRecentInvoices] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const summaryData = await getDashboardSummary();
                if (summaryData.success) {
                    setSummary(summaryData.data);
                }

                const recentData = await getRecentInvoices();
                if (recentData.success) {
                    setRecentInvoices(recentData.data);
                }
            } catch (err) {
                setError("Dashboard verileri alınamadı.");
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-indigo-600">Dashboard</h1>

            {/* Özet Kartlar */}
            {summary && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: "Toplam Fatura", value: summary.totalInvoices },
                        { label: "Toplam Müşteri", value: summary.totalCustomers },
                        { label: "Toplam Gelir", value: `${summary.totalRevenue.toFixed(2)} ₺` },
                        { label: "Bekleyen Ödeme", value: summary.unpaidInvoices },
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-4 rounded shadow">
                            <p className="text-sm text-gray-500">{item.label}</p>
                            <p className="text-xl font-semibold">{item.value}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Son 5 Fatura */}
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-4 text-indigo-600">Son Faturalar</h2>
                {recentInvoices.length > 0 ? (
                    <table className="w-full text-sm">
                        <thead className="text-left border-b">
                        <tr>
                            <th>Numara</th>
                            <th>Müşteri</th>
                            <th>Tarih</th>
                            <th>Tutar</th>
                            <th>Durum</th>
                        </tr>
                        </thead>
                        <tbody>
                        {recentInvoices.map((inv) => (
                            <tr key={inv.id} className="border-b hover:bg-gray-50">
                                <td>{inv.invoiceNumber}</td>
                                <td>{inv.customerName}</td>
                                <td>{inv.date}</td>
                                <td>{inv.amount.toFixed(2)} ₺</td>
                                <td>{inv.status}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">Kayıtlı fatura bulunamadı.</p>
                )}
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
}

export default Dashboard;
