import {useEffect, useState} from "react";
import {getInvoices} from "../services/invoiceService";

function Dashboard() {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        async function fetch() {
            const data = await getInvoices();
            setInvoices(data);
        }
        fetch();
    }, []);

    const totalAmount = invoices.reduce((sum, i) => sum + parseFloat(i.amount || 0), 0);
    const lastInvoice = invoices[invoices.length - 1];

    return (
        <div className="p-4 space-y-6">
            <h2 className="text-2xl font-bold text-indigo-600">Genel Bakış</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded shadow border-l-4 border-indigo-600">
                    <h3 className="text-lg font-semibold">Toplam Fatura</h3>
                    <p className="text-2xl font-bold">{invoices.length} adet</p>
                </div>

                <div className="p-4 bg-white rounded shadow border-l-4 border-green-500">
                    <h3 className="text-lg font-semibold">Toplam Tutar</h3>
                    <p className="text-2xl font-bold">₺{totalAmount.toFixed(2)}</p>
                </div>

                <div className="p-4 bg-white rounded shadow border-l-4 border-yellow-500">
                    <h3 className="text-lg font-semibold">Son Fatura</h3>
                    <p>{lastInvoice?.title || "Yok"}</p>
                    <p className="text-sm text-gray-500">{lastInvoice?.date}</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
