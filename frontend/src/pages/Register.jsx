import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {registerRequest} from "../services/authService";
import {useAuth} from "../context/AuthContext";
import finoloLogo from "../assets/finolo-logo.png";

function Register() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        businessName: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await registerRequest(form);
            login(data, data.token); // otomatik giriş
            navigate("/dashboard");
        } catch {
            setError("Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 px-4">
            <img src={finoloLogo} alt="Finolo Logo" className="w-32 mb-6" />

            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded shadow">
                <h2 className="text-xl font-semibold text-center text-indigo-600 mb-4">Kayıt Ol</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="businessName"
                        placeholder="Firma Adı"
                        value={form.businessName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="E-posta"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Şifre"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        required
                    />

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
                    >
                        Kayıt Ol
                    </button>
                </form>

                <p className="mt-4 text-sm text-center">
                    Hesabınız var mı?{" "}
                    <Link to="/login" className="text-indigo-600 hover:underline">
                        Giriş Yap
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
