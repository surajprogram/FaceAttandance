import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaSpinner, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

export default function FacultyLogin() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!form.email.trim() || !form.password.trim()) {
            toast.error("Please enter both email and password.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:5000/api/login", form);
            const { token, user } = response.data;
            localStorage.setItem("user", JSON.stringify({ ...user, token }));
            toast.success(`Welcome back, ${user.name}!`);

            if (user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Login error:", error);
            const message = error.response?.data?.message || error.message;
            toast.error(`Login failed: ${message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-88px)] bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden flex items-center justify-center px-4">
            {/* Animated Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

            {/* Forest Silhouette */}
            <div className="absolute bottom-0 left-0 right-0 h-64 opacity-30">
                <svg viewBox="0 0 1200 400" className="w-full h-full" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="treeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(0,0,0,0.3)" />
                            <stop offset="100%" stopColor="rgba(0,0,0,0.8)" />
                        </linearGradient>
                    </defs>
                    <path d="M 0 200 L 50 100 L 100 200 L 150 80 L 200 200 L 250 120 L 300 200 L 350 90 L 400 200 L 450 110 L 500 200 L 550 95 L 600 200 L 650 100 L 700 200 L 750 85 L 800 200 L 850 105 L 900 200 L 950 92 L 1000 200 L 1050 115 L 1100 200 L 1150 88 L 1200 200" 
                          fill="url(#treeGradient)" stroke="none" />
                </svg>
            </div>

            {/* Decorative Circle */}
            <div className="absolute top-12 right-16 w-20 h-20 bg-purple-300/30 rounded-full blur-2xl"></div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md">
                <button
                    onClick={() => navigate("/")}
                    className="mb-6 flex items-center gap-2 text-purple-200 hover:text-white transition group"
                >
                    <FaArrowLeft size={16} className="group-hover:-translate-x-1 transition" />
                    <span className="text-sm font-medium">Back</span>
                </button>

                <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl shadow-black/30">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-white mb-2">Login</h1>
                        <p className="text-purple-200/80 text-sm">Access your faculty account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <div className="relative group">
                                <FaUser className="absolute left-4 top-4 text-purple-300/60 group-focus-within:text-purple-300 transition" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition backdrop-blur"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="relative group">
                                <FaLock className="absolute left-4 top-4 text-purple-300/60 group-focus-within:text-purple-300 transition" size={18} />
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition backdrop-blur"
                                />
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded bg-white/20 border border-white/30 cursor-pointer accent-purple-400"
                                />
                                <span className="text-white/80 group-hover:text-white transition">Remember Me</span>
                            </label>
                            <button
                                type="button"
                                onClick={() => navigate("/")}
                                className="text-purple-300/80 hover:text-purple-200 transition font-medium"
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-white text-purple-900 font-semibold rounded-xl hover:bg-purple-50 disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                        >
                            {loading ? <FaSpinner className="animate-spin" /> : null}
                            {loading ? "Logging in..." : "Submit"}
                        </button>
                    </form>

                    {/* Register Link */}
                    <div className="mt-6 text-center">
                        <p className="text-white/70 text-sm">
                            Don't have an account?{" "}
                            <button
                                onClick={() => navigate("/")}
                                className="text-purple-300 hover:text-purple-200 font-semibold transition"
                            >
                                Register
                            </button>
                        </p>
                    </div>
                </div>

                {/* Footer Text */}
                <p className="text-center text-white/50 text-xs mt-6">
                    © 2026 Take My Attendance. All rights reserved.
                </p>
            </div>
        </div>
    );
}

