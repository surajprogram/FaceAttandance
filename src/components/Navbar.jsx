import { useLocation, useNavigate } from "react-router-dom";
import { FaUserTie, FaUserShield, FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const isHome = location.pathname === "/";

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 shadow-lg shadow-slate-950/50 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-8">
                <button
                    onClick={() => navigate("/")}
                    className="text-left transition hover:opacity-80"
                >
                    <h1 className="text-2xl font-bold text-white">Take My Attendance</h1>
                    <p className="text-xs uppercase tracking-[0.15em] text-slate-400">AI Face Recognition</p>
                </button>

                <div className="flex flex-wrap items-center gap-4">
                    {user ? (
                        <>
                            <span className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white">
                                {user.name} • {user.role?.toUpperCase()}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="rounded-lg bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/30"
                            >
                                <FaSignOutAlt className="inline mr-2" size={14} /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate("/login-faculty")}
                                className="rounded-lg border border-blue-400/50 bg-blue-500/10 px-5 py-2.5 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/20 hover:border-blue-400"
                            >
                                <FaUserTie className="inline mr-2" size={14} /> Login as Faculty
                            </button>
                            <button
                                onClick={() => navigate("/login-admin")}
                                className="rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30"
                            >
                                <FaUserShield className="inline mr-2" size={14} /> Login as Admin
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
