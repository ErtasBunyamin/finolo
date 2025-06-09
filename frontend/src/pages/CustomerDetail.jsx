import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomers } from "../services/customerService";
import { getInvoices } from "../services/invoiceService";
import { formatDate } from "../utils/dateUtils";
import { ArrowLeft } from "lucide-react";

function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerList = await getCustomers();
        const found = customerList.find((c) => String(c.id) === String(id));
        setCustomer(found);

        const invRes = await getInvoices();
        if (invRes.success) {
          const related = invRes.data.filter((inv) => inv.customerId === Number(id));
          setInvoices(related);
        }
      } catch (err) {
        setError("Veriler alınamadı.");
      }
    };

    fetchData();
  }, [id]);

  if (!customer) return <p className="text-center text-gray-500">Yükleniyor...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-6">
      <button
        onClick={() => navigate("/customers")}
        className="mb-4 text-sm text-gray-600 hover:text-indigo-600 flex items-center"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Müşterilere Dön
      </button>

      <h2 className="text-xl font-bold text-indigo-600 mb-4">Müşteri Detayı</h2>

      <div className="space-y-1 text-sm mb-6">
        <p>
          <strong>Ad:</strong> {customer.name}
        </p>
        <p>
          <strong>Email:</strong> {customer.email}
        </p>
        <p>
          <strong>Telefon:</strong> {customer.phone}
        </p>
        <p>
          <strong>Adres:</strong> {customer.address}
        </p>
      </div>

      <h3 className="text-lg font-semibold text-indigo-600 mb-2">Faturalar</h3>
      {invoices.length > 0 ? (
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Fatura No</th>
              <th className="px-4 py-2">Tarih</th>
              <th className="px-4 py-2">Tutar</th>
              <th className="px-4 py-2">Durum</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b">
                <td className="px-4 py-2">{inv.invoiceNumber}</td>
                <td className="px-4 py-2">{formatDate(inv.date)}</td>
                <td className="px-4 py-2">{inv.amount} ₺</td>
                <td className="px-4 py-2">
                  {inv.status === "PAID" ? "Ödenmiş" : "Ödenmemiş"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-sm text-gray-500">Bu müşteriye ait fatura bulunmuyor.</p>
      )}

      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
    </div>
  );
}

export default CustomerDetail;
