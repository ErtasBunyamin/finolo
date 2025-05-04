import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getInvoices} from "../services/invoiceService";

function Invoices() {
    const [invoices, setInvoices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getInvoices();
                setInvoices(data);
            } catch (err) {
                console.error("Faturalar alınamadı:", err);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Faturalar</h2>

            <div className="grid grid-cols-1 gap-4">
                {invoices.map((inv) => (
                    <div key={inv.id} className="p-4 bg-white rounded shadow">
                        <h3 className="text-lg font-semibold">{inv.title}</h3>
                        <p>Tutar: ₺{inv.amount}</p>
                        <p>Tarih: {inv.date}</p>
                        <p>Açıklama: {inv.description}</p>
                    </div>
                ))}
            </div>

            {/* FAB Butonu */}
            <button
                onClick={() => navigate("/invoices/new")}
                className="fixed bottom-6 right-6 bg-indigo-600 text-white w-14 h-14 rounded-full text-3xl shadow-lg hover:bg-indigo-700"
            >
                +
            </button>
        </div>
    );
}

export default Invoices;
