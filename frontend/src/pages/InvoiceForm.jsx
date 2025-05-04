import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {createInvoice} from "../services/invoiceService";
import {getCustomers} from "../services/customerService";
import PopupModal from "../components/PopupModal"; // modal bileşeni

function InvoiceForm() {
    const [form, setForm] = useState({
        title: "",
        amount: "",
        date: "",
        description: "",
        customerId: "",
    });

    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCustomers() {
            try {
                const data = await getCustomers();
                setCustomers(data);

                if (data.length === 0) {
                    setShowModal(true); // müşteri yoksa modal göster
                }
            } catch (err) {
                console.error("Müşteriler alınamadı:", err);
            }
        }

        fetchCustomers();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await createInvoice(form);
            navigate("/invoices");
        } catch (err) {
            console.error("Fatura oluşturulamadı:", err);
            setError("Fatura oluşturulurken bir hata oluştu.");
        }
    };

    const handleModalConfirm = () => {
        setShowModal(false);
        navigate("/customers/new");
    };

    const handleModalCancel = () => {
        setShowModal(false);
        navigate("/invoices");
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Yeni Fatura</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Fatura Başlığı"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="number"
                    name="amount"
                    placeholder="Tutar (₺)"
                    value={form.amount}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Açıklama"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    rows={3}
                ></textarea>

                <select
                    name="customerId"
                    value={form.customerId}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="">Müşteri Seçin</option>
                    {customers.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name} ({c.email})
                        </option>
                    ))}
                </select>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">
                    Faturayı Kaydet
                </button>
            </form>

            {/* Modal */}
            {showModal && (
                <PopupModal
                    title="Müşteri Gerekli"
                    message="Fatura oluşturabilmek için önce müşteri eklemelisiniz. Müşteri ekleme ekranına gitmek ister misiniz?"
                    onConfirm={handleModalConfirm}
                    onCancel={handleModalCancel}
                />
            )}
        </div>
    );
}

export default InvoiceForm;
