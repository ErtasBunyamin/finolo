import {useEffect, useState} from "react";
import {deleteInvoice, getInvoices} from "../services/invoiceService";
import {Link} from "react-router-dom";
import {formatDate} from "../utils/dateUtils";
import {Plus} from "lucide-react";
import PopupModal from "../components/PopupModal";

function Invoices() {
    const [invoices, setInvoices] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getInvoices();
                if (res.success) setInvoices(res.data);
            } catch (err) {
                console.error("Faturalar alınamadı", err);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async () => {
        try {
            const res = await deleteInvoice(selectedId);
            if (res.success) {
                setInvoices(invoices.filter((inv) => inv.id !== selectedId));
                setShowModal(false);
            }
        } catch (err) {
            console.error("Silme işlemi başarısız", err);
        }
    };

    return (
        <div className="overflow-x-auto w-full">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Faturalar</h2>

            <table className="min-w-full w-full text-sm text-left text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 shadow rounded">
                <thead className="bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200">
                <tr>
                    <th className="px-4 py-2 text-left">Fatura No</th>
                    <th className="px-4 py-2 text-left">Müşteri</th>
                    <th className="px-4 py-2 text-left">Tutar</th>
                    <th className="px-4 py-2 text-left">Tarih</th>
                    <th className="px-4 py-2 text-left">Durum</th>
                    <th className="px-4 py-2 text-right">İşlemler</th>
                </tr>
                </thead>
                <tbody>
                {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b text-sm">
                        <td className="px-4 py-2">{invoice.invoiceNumber}</td>
                        <td className="px-4 py-2">{invoice.customerName}</td>
                        <td className="px-4 py-2">{invoice.amount} ₺</td>
                        <td className="px-4 py-2">{formatDate(invoice.date)}</td>
                        <td className="px-4 py-2">
                <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                        invoice.status === "PAID"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                  {invoice.status === "PAID" ? "Ödenmiş" : "Ödenmemiş"}
                </span>
                        </td>
                        <td className="px-4 py-2 text-right space-x-3">
                            <Link
                                to={`/invoices/${invoice.id}`}
                                className="text-indigo-600 hover:underline text-sm"
                            >
                                Detay
                            </Link>
                            <button
                                onClick={() => {
                                    setSelectedId(invoice.id);
                                    setShowModal(true);
                                }}
                                className="text-red-600 hover:underline text-sm"
                            >
                                Sil
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* + Butonu */}
            <Link
                to="/invoice/new"
                className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition"
            >
                <Plus size={24} />
            </Link>

            {/* Silme Onay Modali */}
            {showModal && (
                <PopupModal
                    isOpen={showModal}
                    title="Faturayı Sil"
                    message="Bu faturayı silmek istediğinize emin misiniz?"
                    onConfirm={handleDelete}
                    onCancel={() => setShowModal(false)}
                />
            )}
        </div>
    );
}

export default Invoices;
