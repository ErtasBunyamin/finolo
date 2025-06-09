import { useEffect, useState } from "react";
import { getProfile } from "../services/authService";
import { updateUser } from "../services/userService";

function Settings() {
  const [form, setForm] = useState({
    businessName: "",
    password: "",
    themePreference: "light",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getProfile();
        setForm((f) => ({
          ...f,
          businessName: data.businessName || "",
          themePreference: data.themePreference || "light",
        }));
      } catch (err) {
        console.error("Profil bilgisi alınamadı", err);
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await updateUser(form);
      setMessage("Ayarlar güncellendi");
    } catch (err) {
      console.error("Güncelleme başarısız", err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Ayarlar</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="businessName"
          placeholder="Firma Adı"
          value={form.businessName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Yeni Şifre"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="themePreference"
          value={form.themePreference}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="light">Aydınlık</option>
          <option value="dark">Karanlık</option>
        </select>
        <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">
          Kaydet
        </button>
      </form>
      {message && <p className="text-green-600 mt-2">{message}</p>}
    </div>
  );
}

export default Settings;
