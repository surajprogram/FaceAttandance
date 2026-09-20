import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaCamera, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const menuItems = user?.role === "admin"
        ? [
            { label: "Admin Dashboard", icon: FaHome, path: "/admin" },
        ]
        : [
            { label: "Dashboard", icon: FaHome, path: "/dashboard" },
            { label: "Attendance", icon: FaCamera, path: "/attendance" },
        ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg"
            >
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed md:relative w-64 h-screen bg-gradient-to-b from-gray-800 to-gray-900 border-r border-white/10 p-6 flex flex-col z-40 transform md:transform-none transition-transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                }`}
            >
                {/* Logo */}
                <div className="mb-8 mt-12 md:mt-0">
                    <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        SmartAttend
                    </h1>
                    <p className="text-xs text-gray-400 mt-1">Faculty Portal</p>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 space-y-2">
                    {menuItems.map(({ label, icon: Icon, path }) => (
                        <button
                            key={path}
                            onClick={() => {
                                navigate(path);
                                setIsOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                                isActive(path)
                                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                                    : "text-gray-300 hover:bg-white/10"
                            }`}
                        >
                            <Icon size={20} />
                            <span className="font-semibold">{label}</span>
                        </button>
                    ))}
                </nav>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition border border-red-500/20"
                >
                    <FaSignOutAlt size={20} />
                    <span className="font-semibold">Logout</span>
                </button>
            </aside>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 md:hidden z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
