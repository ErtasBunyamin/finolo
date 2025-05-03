import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
            <h1 className="text-4xl font-bold text-indigo-700 mb-4">Finolo Paneline Hoş Geldiniz 🎉</h1>
            <p className="text-gray-600 text-lg mb-6">
                {user?.email} olarak giriş yaptınız.
            </p>

            <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
                Çıkış Yap
            </button>
        </div>
    );
}

export default Dashboard;
