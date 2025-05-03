import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            const { token, email: userEmail, role } = response.data;

            login({ email: userEmail, role }, token);
            navigate("/dashboard");
        } catch (err) {
            console.error("Login failed:", err);
            setError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Finolo'ya Giriş
                </h2>

                {error && (
                    <p className="text-red-600 mb-4 text-sm text-center">{error}</p>
                )}

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
                    Giriş Yap
                </button>

                <p className="text-sm text-center text-gray-500 mt-4">
                    Hesabın yok mu?{" "}
                    <a href="/register" className="text-indigo-600 hover:underline">
                        Kayıt ol
                    </a>
                </p>
            </form>
        </div>
    );
}

export default Login;
