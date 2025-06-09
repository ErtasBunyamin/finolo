import React, {useEffect, useState} from "react";
import {getDashboardSummary, getMonthlyStats, getPaymentStats, getRecentInvoices} from "../services/dashboardService";
import DashboardCard from "../components/DashboardCard";
import MonthlyBarChart from "../components/MonthlyBarChart";
import PaymentDonutChart from "../components/PaymentDonutChart";
import {FiClock, FiDollarSign, FiFileText, FiUser} from "react-icons/fi";

function Dashboard() {
    const [summary, setSummary] = useState(null);
    const [recentInvoices, setRecentInvoices] = useState([]);
    const [monthlyStats, setMonthlyStats] = useState([]);
    const [paymentStats, setPaymentStats] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const summaryData = await getDashboardSummary();
                if (summaryData.success) setSummary(summaryData.data);

                const recentData = await getRecentInvoices();
                if (recentData.success) setRecentInvoices(recentData.data);

                const statsData = await getMonthlyStats();
                if (statsData.success) {
                    const chartData = Object.entries(statsData.data).map(([month, amount]) => ({
                        month: month.charAt(0) + month.slice(1).toLowerCase(), // Ocak, Şubat vs için düzeltme
                        amount,
                    }));
                    setMonthlyStats(chartData);
                }

                const fetchPayments = await getPaymentStats();
                if (fetchPayments.success) setPaymentStats(fetchPayments.data);
            } catch (err) {
                console.error(err);
                setError("Dashboard verileri alınamadı.");
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-4 sm:p-6 space-y-6">
            <h1 className="text-2xl font-bold mb-6 text-indigo-600">Dashboard</h1>

            {/* Özet Kartlar */}
            {summary && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <DashboardCard icon={FiFileText} label="Toplam Fatura" value={summary.totalInvoices} />
                    <DashboardCard icon={FiUser} label="Toplam Müşteri" value={summary.totalCustomers} />
                    <DashboardCard icon={FiDollarSign} label="Toplam Gelir" value={`${summary.totalRevenue.toFixed(2)} ₺`} />
                    <DashboardCard icon={FiClock} label="Bekleyen Ödeme" value={summary.unpaidInvoices} />
                </div>
            )}

            {/* Son 5 Fatura */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                <h2 className="text-lg font-semibold text-indigo-600 mb-4">Son Faturalar</h2>
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
                            <tr key={inv.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
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

            {/* Grafik ve Tahsilat */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow md:col-span-2">
                    <h2 className="text-lg font-semibold text-indigo-600 mb-4">Aylık Fatura Gelirleri</h2>
                    <MonthlyBarChart data={monthlyStats} />
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                    <h2 className="text-lg font-semibold text-indigo-600 mb-4">Tahsilat Durumu</h2>
                    <PaymentDonutChart data={paymentStats} />
                </div>
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
}

export default Dashboard;
