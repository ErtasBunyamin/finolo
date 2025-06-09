import {NavLink, useNavigate, useLocation} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import {useEffect, useState} from "react";
import {useTheme} from "../context/ThemeContext.jsx";
import {Sun, Moon} from "lucide-react";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        setMenuOpen(false); // rota değişince menü kapansın
    }, [location.pathname]);

    const linkClasses = ({ isActive }) =>
        isActive
            ? "text-indigo-600 dark:text-indigo-400 font-semibold"
            : "text-gray-700 dark:text-gray-200 hover:text-indigo-600";

    return (
        <nav className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm p-4 flex items-center justify-between relative z-50">
            <div className="text-xl font-bold text-indigo-600 cursor-pointer" onClick={() => navigate("/dashboard")}>
                Finolo
            </div>

            {/* Masaüstü Menü */}
            <div className="hidden md:flex gap-6 items-center">
                <NavLink to="/dashboard" className={linkClasses}>Dashboard</NavLink>
                {user?.role === "USER" && (
                    <>
                        <NavLink to="/customers" className={linkClasses}>Müşteriler</NavLink>
                        <NavLink to="/invoices" className={linkClasses}>Faturalar</NavLink>
                    </>
                )}
                {user?.role === "ADMIN" && (
                    <NavLink to="/admin" className={linkClasses}>Admin</NavLink>
                )}
                <NavLink to="/profile" className={linkClasses}>Profil</NavLink>
            </div>

            <div className="hidden md:flex items-center gap-4">
                <button onClick={toggleTheme} className="text-xl">
                    {theme === "dark" ? <Sun /> : <Moon />}
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-300">{user?.email}</span>
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
                <button onClick={() => setMenuOpen(!menuOpen)} className="text-indigo-600 dark:text-indigo-400 text-2xl">
                    ☰
                </button>
            </div>

            {/* Mobil Menü */}
            <div
                className={`
          fixed top-0 left-0 w-full h-screen bg-white/90 dark:bg-gray-900/90 backdrop-blur-md transition-transform duration-300 ease-in-out
          flex flex-col z-40 px-6 py-4
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-indigo-600">Finolo</h2>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-2xl text-gray-700 dark:text-gray-200 hover:text-indigo-600"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-4 text-lg text-gray-700 dark:text-gray-200">
          <NavLink to="/dashboard" className={linkClasses}>Dashboard</NavLink>
          {user?.role === "USER" && (
            <>
              <NavLink to="/customers" className={linkClasses}>Müşteriler</NavLink>
              <NavLink to="/invoices" className={linkClasses}>Faturalar</NavLink>
            </>
          )}
          {user?.role === "ADMIN" && (
            <NavLink to="/admin" className={linkClasses}>Admin</NavLink>
          )}
          <NavLink to="/profile" className={linkClasses}>Profil</NavLink>
        </nav>

        <div className="mt-auto pt-6 border-t text-sm text-gray-600 dark:text-gray-300">
          <button onClick={toggleTheme} className="mb-4 flex items-center gap-2">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            <span>Temayı Değiştir</span>
          </button>
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