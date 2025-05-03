import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [businessName, setBusinessName] = useState("FINOLO");//will change
    const [email, setEmail] = useState("TEST@FINOLO.COM");//will change
    const [password, setPassword] = useState("123123");//will change
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await api.post("/auth/register", {
                businessName,
                email,
                password,
            });

            navigate("/"); // login sayfasına yönlendir
        } catch (err) {
            console.error("Register error:", err);
            setError("Kayıt başarısız. Lütfen bilgileri kontrol edin.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Kayıt Ol
                </h2>

                {error && (
                    <p className="text-red-600 mb-4 text-sm text-center">{error}</p>
                )}

                <input
                    type="text"
                    placeholder="Firma Adı"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                    required
                />
                <input
                    type="email"
                    placeholder="E-posta"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                    required
                />
                <input
                    type="password"
                    placeholder="Şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-6 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
                >
                    Kayıt Ol
                </button>

                <p className="text-sm text-center text-gray-500 mt-4">
                    Zaten hesabın var mı?{" "}
                    <a href="/" className="text-indigo-600 hover:underline">
                        Giriş Yap
                    </a>
                </p>
            </form>
        </div>
    );
}

export default Register;
