import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

function Navbar() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="bg-indigo-600 text-white px-6 py-3 shadow flex justify-between items-center">
            <div className="flex gap-4">
                <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                <Link to="/customers" className="hover:underline">Müşteriler</Link>
                <Link to="/profile" className="hover:underline">Profil</Link>
            </div>
            <div className="flex items-center gap-4">
                {user && <span className="text-sm">{user.email}</span>}
                <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
                    Çıkış
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
