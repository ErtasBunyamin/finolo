import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {createCustomer} from "../services/customerService.js";

function CustomerForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCustomer(form);
      navigate("/customers");
    } catch (error) {
      console.error("Kayıt hatası:", error);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Yeni Müşteri</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Ad Soyad" onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="phone" placeholder="Telefon" onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="city" placeholder="Şehir" onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">Kaydet</button>
      </form>
    </div>
  );
}

export default CustomerForm;