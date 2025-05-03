import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Token eklemek için interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // AuthContext yerine doğrudan localStorage kullanılabilir
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
