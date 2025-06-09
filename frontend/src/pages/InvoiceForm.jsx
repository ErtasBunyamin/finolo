import {useEffect, useState} from "react";
import * as Yup from "yup";
    const [formErrors, setFormErrors] = useState({});
    const schema = Yup.object().shape({
        amount: Yup.number().typeError("Tutar sayı olmalı").positive("Tutar pozitif olmalı").required("Tutar gerekli"),
        date: Yup.date().required("Fatura tarihi gerekli"),
        dueDate: Yup.date().nullable(),
        description: Yup.string().required("Açıklama gerekli"),
        customerId: Yup.string().required("Müşteri seçimi gerekli")
    });

            await schema.validate(formData, { abortEarly: false });
            if (err instanceof Yup.ValidationError) {
                const validationErrors = {};
                err.inner.forEach((e) => {
                    if (e.path) validationErrors[e.path] = e.message;
                });
                setFormErrors(validationErrors);
            } else {
                console.error(err);
                setError("Fatura oluşturulamadı.");
            }
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow">
                        min="0"
                    {formErrors.amount && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.amount}</p>
                    )}
                    {formErrors.date && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.date}</p>
                    )}
                    {formErrors.dueDate && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.dueDate}</p>
                    )}
                    {formErrors.description && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
                    )}
                    {formErrors.customerId && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.customerId}</p>
                    )}
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const [formData, setFormData] = useState({
        amount: "",
        date: "",
        dueDate: "",
        description: "",
        customerId: "",
        status: "DRAFT",
        taxRate: 0,
        note: "",
        paymentMethod: ""
    });

    const schema = Yup.object().shape({
        amount: Yup.number().typeError("Tutar sayı olmalı").positive("Tutar pozitif olmalı").required("Tutar gerekli"),
        date: Yup.date().required("Fatura tarihi gerekli"),
        dueDate: Yup.date().nullable(),
        description: Yup.string().required("Açıklama gerekli"),
        customerId: Yup.string().required("Müşteri seçimi gerekli")
    });

    useEffect(() => {
        getCustomers()
            .then((data) => {
                if (Array.isArray(data)) {
                    if (data.length === 0) {
                        setShowModal(true);
                    } else {
                        setCustomers(data);
                        setShowModal(false);
                    }
                } else {
                    console.error("Beklenmedik müşteri yapısı:", data);
                    setError("Müşteri verisi beklenmedik formatta.");
                }
            })
            .catch((err) => {
                console.error("getCustomers hatası:", err);
                setError("Müşteriler alınamadı.");
            });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await schema.validate(formData, { abortEarly: false });
            await createInvoice(formData);
            navigate("/invoices");
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const validationErrors = {};
                err.inner.forEach((e) => {
                    if (e.path) validationErrors[e.path] = e.message;
                });
                setFormErrors(validationErrors);
            } else {
                console.error(err);
                setError("Fatura oluşturulamadı.");
            }
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow">
            <h2 className="text-2xl font-bold mb-6">Fatura Oluştur</h2>
            <form onSubmit={handleSubmit} className="space-y-5">

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tutar</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                        min="0"
                    />
                    {formErrors.amount && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.amount}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fatura Tarihi</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {formErrors.date && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.date}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Son Ödeme Tarihi</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    {formErrors.dueDate && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.dueDate}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {formErrors.description && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Müşteri</label>
                    <select
                        name="customerId"
                        value={formData.customerId}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Müşteri Seç</option>
                        {customers.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name || c.email}
                            </option>
                        ))}
                    </select>
                    {formErrors.customerId && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.customerId}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Durum</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="DRAFT">Taslak</option>
                        <option value="SENT">Gönderildi</option>
                        <option value="PAID">Ödendi</option>
                        <option value="CANCELLED">İptal Edildi</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vergi Oranı (%)</label>
                    <input
                        type="number"
                        name="taxRate"
                        value={formData.taxRate}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ödeme Yöntemi</label>
                    <input
                        type="text"
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Banka, Kredi Kartı vs."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Not (İsteğe bağlı)</label>
                    <textarea
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        rows="3"
                        placeholder="Varsa özel notunuzu girin"
                    />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
                >
                    Kaydet
                </button>
            </form>

            <PopupModal
                isOpen={showModal}
                title="Müşteri Gerekli"
                message="Fatura oluşturmak için önce bir müşteri eklemelisiniz. Müşteri ekleme ekranına gitmek ister misiniz?"
                onConfirm={() => {
                    setShowModal(false);
                    navigate("/customers/new");
                }}
                onCancel={() => {
                    setShowModal(false);
                    navigate("/dashboard");
                }}
            />
        </div>
    );
}

export default InvoiceForm;
