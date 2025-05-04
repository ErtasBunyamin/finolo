import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Profile from "./pages/Profile";
import PrivateRoute from "./routes/PrivateRoute";
import Layout from "./layout/Layout";

function App() {
    return (
        <Router>
            <Routes>
                {/* Giriş ve kayıt açık */}
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Giriş yapmış kullanıcılar için layout */}
                <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
