import {NavLink, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import {useEffect, useState} from "react";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setMenuOpen(false); // rota değişince menü kapansın
    }, [location.pathname]);

    const linkClasses = ({ isActive }) =>
        isActive
            ? "text-indigo-600 font-semibold"
            : "text-gray-700 hover:text-indigo-600";

    return (
        <nav className="bg-white border-b shadow-sm p-4 flex items-center justify-between relative z-50">
            <div className="text-xl font-bold text-indigo-600 cursor-pointer" onClick={() => navigate("/dashboard")}>
                Finolo
            </div>

            {/* Masaüstü Menü */}
            <div className="hidden md:flex gap-6 items-center">
                <NavLink to="/dashboard" className={linkClasses}>Dashboard</NavLink>
                <NavLink to="/customers" className={linkClasses}>Müşteriler</NavLink>
                <NavLink to="/profile" className={linkClasses}>Profil</NavLink>
            </div>

            <div className="hidden md:flex items-center gap-4">
                <span className="text-sm text-gray-600">{user?.email}</span>
                <button
                    onClick={() => {
                        logout();
                        navigate("/login");
                    }}
                    className="text-sm text-red-500 hover:underline"
                >
                    Çıkış Yap
                </button>
            </div>

            {/* Hamburger */}
            <div className="md:hidden">
                <button onClick={() => setMenuOpen(!menuOpen)} className="text-indigo-600 text-2xl">
                    ☰
                </button>
            </div>

            {/* Mobil Menü */}
            <div
                className={`
          fixed top-0 left-0 w-full h-screen bg-white/90 backdrop-blur-md transition-transform duration-300 ease-in-out
          flex flex-col z-40 px-6 py-4
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-indigo-600">Finolo</h2>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-2xl text-gray-700 hover:text-indigo-600"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-4 text-lg text-gray-700">
          <NavLink to="/dashboard" className={linkClasses}>Dashboard</NavLink>
          <NavLink to="/customers" className={linkClasses}>Müşteriler</NavLink>
            <NavLink to="/invoices" className={linkClasses}>Faturalar</NavLink>
            <NavLink to="/profile" className={linkClasses}>Profil</NavLink>
        </nav>

        <div className="mt-auto pt-6 border-t text-sm text-gray-600">
          <p className="mb-2">{user?.email}</p>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="text-red-500 hover:underline"
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;