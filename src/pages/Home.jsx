import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-[calc(100vh-88px)] bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
            <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        {/* Feature Badge */}
                        <div className="inline-flex items-center gap-3 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 backdrop-blur">
                            <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                            <span className="text-sm font-medium text-blue-300">Modern AI Technology</span>
                        </div>

                        {/* Hero Title */}
                        <div className="space-y-4">
                            <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl lg:text-5xl xl:text-6xl">
                                AI Based Attendance System
                            </h1>
                            <p className="text-lg leading-8 text-slate-300 md:text-xl">
                                Harnessing Face Recognition technology for precise, effortless attendance tracking. Transform how your institution manages attendance with cutting-edge biometric accuracy.
                            </p>
                        </div>

                        {/* CTA Button */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            <button
                                onClick={() => navigate("/login-faculty")}
                                className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-4 text-base font-semibold text-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30"
                            >
                                Discover More
                            </button>
                        </div>

                        {/* Feature Card */}
                        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur-xl">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-green-500/20">
                                    <FaCheckCircle className="text-green-400" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Secure & Precise</h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-400">
                                        Advanced biometric accuracy with real-time face detection, multi-factor verification, and enterprise-grade security protocols to ensure accurate attendance records.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Visual - Face Recognition Mockup */}
                    <div className="relative flex items-center justify-center">
                        <div className="relative h-[500px] w-full max-w-[400px]">
                            {/* Background Blur Elements */}
                            <div className="absolute -right-20 top-20 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl"></div>
                            <div className="absolute -left-20 bottom-20 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl"></div>

                            {/* Camera Frame Container */}
                            <div className="relative h-full rounded-3xl border-2 border-blue-400/30 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 shadow-2xl shadow-blue-900/30 backdrop-blur-xl">
                                {/* Face Detection Box */}
                                <div className="mx-auto h-64 max-w-xs rounded-2xl border-2 border-dashed border-blue-400/50 bg-black/40 p-4 flex flex-col items-center justify-center relative overflow-hidden">
                                    {/* Animated Scan Lines */}
                                    <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 400 300">
                                        <defs>
                                            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(96, 165, 250, 0.1)" strokeWidth="0.5" />
                                            </pattern>
                                        </defs>
                                        <rect width="400" height="300" fill="url(#grid)" />
                                    </svg>

                                    {/* Face Placeholder Circle */}
                                    <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
                                        <div className="h-24 w-24 rounded-full border-2 border-blue-400/50 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                            <span className="text-5xl">👤</span>
                                        </div>
                                        <p className="text-center text-sm font-medium text-blue-300">Match</p>
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <div className="mt-6 rounded-2xl border border-green-400/50 bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 shadow-lg shadow-green-500/20">
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="flex h-3 w-3 items-center justify-center">
                                            <div className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse"></div>
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-widest text-green-400/80">Status</p>
                                            <p className="text-sm font-semibold text-green-300">Logged In</p>
                                        </div>
                                        <FaCheckCircle className="ml-auto text-green-400" size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured Dashboards Section */}
                <div className="mt-24 space-y-8">
                    <div className="text-center">
                        <p className="text-sm uppercase tracking-widest text-slate-400">Trusted by institutions</p>
                        <h2 className="mt-3 text-3xl font-bold text-white">Powerful platform features</h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur">
                            <div className="mb-4 h-32 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-600/20"></div>
                            <p className="text-sm uppercase tracking-widest text-slate-400">Faculty Dashboard</p>
                            <h3 className="mt-2 text-lg font-semibold text-white">Mark & Export</h3>
                            <p className="mt-3 text-sm leading-6 text-slate-300">Real-time attendance marking with face recognition and instant Excel export.</p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur">
                            <div className="mb-4 h-32 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-600/20"></div>
                            <p className="text-sm uppercase tracking-widest text-slate-400">Reports</p>
                            <h3 className="mt-2 text-lg font-semibold text-white">Analytics & Insights</h3>
                            <p className="mt-3 text-sm leading-6 text-slate-300">Comprehensive attendance reports and trend analysis for institutions.</p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur">
                            <div className="mb-4 h-32 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-600/20"></div>
                            <p className="text-sm uppercase tracking-widest text-slate-400">Admin Control</p>
                            <h3 className="mt-2 text-lg font-semibold text-white">User Management</h3>
                            <p className="mt-3 text-sm leading-6 text-slate-300">Centralized admin panel for managing faculty and student records.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
