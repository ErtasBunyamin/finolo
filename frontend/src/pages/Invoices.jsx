import React, {useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext";
import {deleteInvoice, getInvoices} from "../services/invoiceService";
import {useNavigate} from "react-router-dom";
import {Trash2} from "lucide-react";
import PopupModal from "../components/PopupModal"; // modal importu

function Invoices() {
    const {token} = useAuth();
    const [invoices, setInvoices] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const res = await getInvoices(token);
                setInvoices(res);
            } catch (err) {
                console.error(err);
                setError("Faturalar yüklenemedi.");
            }
        };

        fetchInvoices();
    }, [token]);

    const confirmDelete = (id) => {
        setSelectedInvoiceId(id);
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteInvoice(selectedInvoiceId);
            setInvoices((prev) => prev.filter((inv) => inv.id !== selectedInvoiceId));
        } catch (err) {
            console.error("Silme hatası:", err);
            alert("Fatura silinemedi.");
        } finally {
            setShowModal(false);
            setSelectedInvoiceId(null);
        }
    };

    const handleCancelDelete = () => {
        setShowModal(false);
        setSelectedInvoiceId(null);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Faturalar</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Tarih</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Açıklama</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Müşteri</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Tutar</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Durum</th>
                        <th className="px-6 py-3 text-sm text-right">İşlem</th>
                    </tr>
                    </thead>
                    <tbody>
                    {invoices.map((invoice) => (
                        <tr key={invoice.id} className="border-t hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm">{invoice.date}</td>
                            <td className="px-6 py-4 text-sm">{invoice.description}</td>
                            <td className="px-6 py-4 text-sm">{invoice.customerName}</td>
                            <td className="px-6 py-4 text-sm">{invoice.amount} ₺</td>
                            <td className="px-6 py-4 text-sm">{invoice.status}</td>
                            <td className="px-6 py-4 text-sm text-right">
                                <button
                                    onClick={() => confirmDelete(invoice.id)}
                                    className="text-red-500 hover:text-red-700 transition"
                                    title="Sil"
                                >
                                    <Trash2 size={18}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Float Buton */}
            <button
                onClick={() => navigate("/invoices/new")}
                className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-indigo-700 transition z-50"
                aria-label="Fatura Oluştur"
            >
                +
            </button>

            {/* Silme Modalı */}
            {
                <PopupModal
                    isOpen={showModal}
                    title="Faturayı Sil"
                    message="Bu faturayı silmek istediğinize emin misiniz?"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            }
        </div>
    );
}

export default Invoices;
