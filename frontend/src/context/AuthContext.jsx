import React, {createContext, useContext, useEffect, useState} from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem("token"));

    // Login olduğunda token kaydet
    const login = (userData, jwt) => {
        setUser(userData);
        setToken(jwt);
        localStorage.setItem("token", jwt);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    };

    // Sayfa yenilendiğinde token varsa user'ı yeniden al
    useEffect(() => {
        if (token && !user) {
            api.get("/user/me")
                .then((res) => setUser(res.data))
                .catch((err) => {
                    console.error("Kullanıcı verisi alınamadı:", err);
                    logout(); // Token geçersizse çıkış yap
                });
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
