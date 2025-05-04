import {useEffect, useState} from "react";
import {getInvoices} from "../services/invoiceService";

function Invoices() {
    const [invoices, setInvoices] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        getInvoices()
            .then((data) => setInvoices(data))
            .catch((err) => {
                console.error("Faturalar alınamadı:", err);
                setError("Faturalar alınamadı.");
            });
    }, []);

    const statusBadge = (status) => {
        const base = "px-2 py-1 text-xs font-semibold rounded-full";
        switch (status) {
            case "PAID":
                return <span className={`${base} bg-green-100 text-green-700`}>Ödendi</span>;
            case "SENT":
                return <span className={`${base} bg-blue-100 text-blue-700`}>Gönderildi</span>;
            case "CANCELLED":
                return <span className={`${base} bg-red-100 text-red-700`}>İptal Edildi</span>;
            default:
                return <span className={`${base} bg-gray-100 text-gray-700`}>Taslak</span>;
        }
    };

    return (
        <div className="max-w-5xl mx-auto mt-10 p-4">
            <h2 className="text-2xl font-bold mb-6">Faturalar</h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="overflow-x-auto bg-white rounded shadow">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                    <tr>
                        <th className="px-6 py-3">Fatura No</th>
                        <th className="px-6 py-3">Müşteri</th>
                        <th className="px-6 py-3">Tutar</th>
                        <th className="px-6 py-3">Tarih</th>
                        <th className="px-6 py-3">Durum</th>
                    </tr>
                    </thead>
                    <tbody>
                    {invoices.length > 0 ? (
                        invoices.map((invoice) => (
                            <tr
                                key={invoice.id}
                                className="border-b hover:bg-gray-50 transition"
                            >
                                <td className="px-6 py-3">#{invoice.id}</td>
                                <td className="px-6 py-3">
                                    {invoice.customerId}
                                </td>
                                <td className="px-6 py-3">{invoice.amount} ₺</td>
                                <td className="px-6 py-3">
                                    {new Date(invoice.date).toLocaleDateString("tr-TR")}
                                </td>
                                <td className="px-6 py-3">{statusBadge(invoice.status)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-6 text-gray-500">
                                Henüz fatura bulunmuyor.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Invoices;
