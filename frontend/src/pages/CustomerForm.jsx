import {useState} from "react";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import {createCustomer} from "../services/customerService.js";

function CustomerForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    name: Yup.string().required("İsim gerekli"),
    email: Yup.string().email("Geçerli bir email girin").required("Email gerekli"),
    phone: Yup.string()
      .matches(/^\+?\d{10,15}$/, "Geçerli bir telefon numarası girin")
      .required("Telefon gerekli"),
    address: Yup.string().required("Adres gerekli")
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(form, { abortEarly: false });
      await createCustomer(form);
      navigate("/customers");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          if (err.path) validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error("Kayıt hatası:", error);
      }
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Yeni Müşteri</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Ad Soyad"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <input
            type="text"
            name="phone"
            placeholder="Telefon"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <input
            type="text"
            name="address"
            placeholder="Adres"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">Kaydet</button>
      </form>
    </div>
  );
}

export default CustomerForm;
