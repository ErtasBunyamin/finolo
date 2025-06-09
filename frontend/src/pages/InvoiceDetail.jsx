import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getInvoiceById, updateInvoice} from "../services/invoiceService";
import {getCustomers} from "../services/customerService";
import dayjs from "dayjs";
import {ArrowLeft} from "lucide-react";

function InvoiceDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [invoice, setInvoice] = useState(null);
    const [form, setForm] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const invoiceData = await getInvoiceById(id);
                if (invoiceData.success) {
                    setInvoice(invoiceData.data);
                    setForm(invoiceData.data);
                }

                const customerData = await getCustomers();
                if (customerData.success) {
                    setCustomers(customerData.data);
                }
            } catch (err) {
                console.error(err);
                setError("Fatura detayları alınamadı.");
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await updateInvoice(id, form);
            if (res.success) {
                setInvoice(res.data);
                setEditing(false);
            }
        } catch {
            setError("Fatura güncellenemedi.");
        }
    };

    if (!invoice) return <p className="text-center text-gray-500">Yükleniyor...</p>;

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-6">
            {/* Geri Butonu */}
            <button
                onClick={() => navigate("/invoices")}
                className="mb-4 text-sm text-gray-600 hover:text-indigo-600 flex items-center"
            >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Faturalara Dön
            </button>

            <h2 className="text-xl font-bold text-indigo-600 mb-4">Fatura Detayı</h2>

            {editing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="date"
                        name="date"
                        value={dayjs(form.date).format("YYYY-MM-DD")}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />

                    <select
                        name="customerId"
                        value={form.customerId || ""}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="">Müşteri Seçin</option>
                        {customers.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Tutar"
                    />

                    <input
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Açıklama"
                    />

                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="PAID">Ödenmiş</option>
                        <option value="UNPAID">Ödenmemiş</option>
                    </select>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                        >
                            Kaydet
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditing(false)}
                            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            İptal
                        </button>
                    </div>
                </form>
            ) : (
                <div className="space-y-2 text-sm">
                    <p>
                        <strong>Tarih:</strong>{" "}
                        {dayjs(invoice.date).format("DD.MM.YYYY")}
                    </p>
                    <p>
                        <strong>Müşteri:</strong> {invoice.customerName}
                    </p>
                    <p>
                        <strong>Tutar:</strong> {invoice.amount} ₺
                    </p>
                    <p>
                        <strong>Açıklama:</strong> {invoice.description}
                    </p>
                    <p>
                        <strong>Durum:</strong>{" "}
                        {invoice.status === "PAID" ? "Ödenmiş" : "Ödenmemiş"}
                    </p>

                    <button
                        onClick={() => setEditing(true)}
                        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    >
                        Düzenle
                    </button>
                </div>
            )}

            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        </div>
    );
}

export default InvoiceDetail;
