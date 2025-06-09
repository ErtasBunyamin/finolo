import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import CustomerForm from "./pages/CustomerForm.jsx";
import Profile from "./pages/Profile";
import PrivateRoute from "./routes/PrivateRoute";
import Layout from "./components/Layout.jsx";
import Invoices from "./pages/Invoices.jsx";
import InvoiceForm from "./pages/InvoiceForm.jsx";
import InvoiceDetail from "./pages/InvoiceDetail";
import AdminPanel from "./pages/AdminPanel.jsx";

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
                    <Route path="/customers/new" element={<CustomerForm />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/invoices/:id" element={<InvoiceDetail />} />
                    <Route path="/invoice/new" element={<InvoiceForm />} />
                    <Route path="/admin" element={<AdminPanel />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
