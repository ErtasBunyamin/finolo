import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getCustomers} from "../services/customerService.js";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (error) {
        console.error("Müşteri verisi alınamadı:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Müşteriler</h2>
      <div className="grid grid-cols-1 gap-4">
        {customers.map((c) => (
          <div key={c.id} className="p-4 bg-white rounded shadow">
            <h3 className="text-lg font-semibold">{c.name}</h3>
            <p>{c.email}</p>
            <p>{c.phone}</p>
            <p>{c.address}</p>
          </div>
        ))}
      </div>

      {/* Floating + Button */}
      <button
        onClick={() => navigate("/customers/new")}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white w-14 h-14 rounded-full text-3xl shadow-lg hover:bg-indigo-700"
      >
        +
      </button>
    </div>
  );
}

export default Customers;