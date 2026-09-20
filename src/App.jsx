import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import FacultyLogin from "./pages/FacultyLogin";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const getUser = () => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
};

const ProtectedRoute = ({ children }) => {
    const user = getUser();
    return user && user.role === "faculty" ? children : <Navigate to="/" replace />;
};

const AdminRoute = ({ children }) => {
    const user = getUser();
    return user && user.role === "admin" ? children : <Navigate to="/" replace />;
};

function App() {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />

            <div className="min-h-[calc(100vh-88px)]">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login-faculty" element={<FacultyLogin />} />
                    <Route path="/login-admin" element={<AdminLogin />} />

                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/attendance"
                        element={
                            <ProtectedRoute>
                                <Attendance />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <AdminRoute>
                                <AdminDashboard />
                            </AdminRoute>
                        }
                    />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>

            <Footer />

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
}

export default App;
