import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Profile from "./pages/Profile";
import PrivateRoute from "./routes/PrivateRoute";
import Layout from "./components/Layout.jsx";
import CustomerForm from "./pages/CustomerForm.jsx";

function App() {
    return (
        <Router>
            <Routes>
                {/* Giriş ve kayıt açık */}
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Giriş yapmış kullanıcılar için layout */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Layout>
                                <Dashboard />
                            </Layout>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/customers"
                    element={
                        <PrivateRoute>
                            <Layout>
                                <Customers />
                            </Layout>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/customers/new"
                    element={
                        <PrivateRoute>
                            <Layout>
                                <CustomerForm />
                            </Layout>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <Layout>
                                <Profile />
                            </Layout>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
