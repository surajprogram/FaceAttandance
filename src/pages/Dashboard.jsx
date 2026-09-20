import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { FaClipboardList, FaCamera, FaCheckCircle, FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [downloadLoading, setDownloadLoading] = useState(false);
    const [stats, setStats] = useState({
        totalMarked: 0,
        todayMarked: 0,
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/");
        } else {
            const parsed = JSON.parse(storedUser);
            if (parsed.role !== "faculty") {
                navigate("/");
                return;
            }
            setUser(parsed);
        }
    }, [navigate]);

    const handleDownloadAttendance = async () => {
        setDownloadLoading(true);
        try {
            const response = await axios.get(
                "http://127.0.0.1:5000/api/download-attendance",
                {
                    responseType: "blob",
                }
            );
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
                "download",
                `attendance_${new Date().toISOString().split("T")[0]}.xlsx`
            );
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("✅ Attendance sheet downloaded successfully!");
        } catch (error) {
            console.error("Download error:", error);
            toast.error("❌ No attendance records found or download failed");
        } finally {
            setDownloadLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="flex min-h-screen bg-slate-950 text-slate-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar faculty={user} />

                <main className="flex-1 overflow-auto px-6 py-8 md:px-8">
                    <div className="mx-auto w-full max-w-7xl space-y-8">
                        <section className="rounded-[2rem] bg-gradient-to-r from-indigo-700 via-blue-700 to-sky-600 p-8 shadow-2xl shadow-slate-950/40 ring-1 ring-white/10">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                <div className="max-w-2xl">
                                    <p className="text-sm uppercase tracking-[0.35em] text-slate-200/70">Welcome back</p>
                                    <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">AI Based Attendance System</h1>
                                    <p className="mt-4 text-base leading-8 text-slate-200/85 sm:text-lg">
                                        Fast, accurate face recognition attendance for faculty. Review reports, export records, and manage attendance seamlessly.
                                    </p>
                                    <div className="mt-8 flex flex-wrap gap-4">
                                        <button
                                            onClick={() => navigate("/attendance")}
                                            className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-slate-100"
                                        >
                                            <FaCamera /> Start Attendance
                                        </button>
                                        <button
                                            onClick={handleDownloadAttendance}
                                            className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15 disabled:cursor-not-allowed"
                                        >
                                            <FaDownload /> Download Report
                                        </button>
                                    </div>
                                </div>

                                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="text-sm uppercase tracking-[0.35em] text-slate-300">Faculty</p>
                                            <h2 className="mt-2 text-2xl font-semibold text-white">{user.name}</h2>
                                        </div>
                                        <div className="rounded-3xl bg-white/10 px-4 py-3 text-sm text-white shadow-sm shadow-slate-950/10">{user.department}</div>
                                    </div>
                                    <div className="mt-6 grid gap-3">
                                        <div className="rounded-3xl bg-slate-950/70 p-4">
                                            <p className="text-sm text-slate-400">Today</p>
                                            <p className="mt-1 text-3xl font-bold text-white">{stats.todayMarked}</p>
                                            <p className="mt-2 text-sm text-slate-400">Present students marked</p>
                                        </div>
                                        <div className="rounded-3xl bg-slate-950/70 p-4">
                                            <p className="text-sm text-slate-400">Total</p>
                                            <p className="mt-1 text-3xl font-bold text-white">{stats.totalMarked}</p>
                                            <p className="mt-2 text-sm text-slate-400">Records collected</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="grid gap-6 xl:grid-cols-3">
                            <div className="rounded-[2rem] bg-slate-900/90 p-6 shadow-2xl shadow-slate-950/50 ring-1 ring-white/5 transition hover:-translate-y-1">
                                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Feature</p>
                                <h3 className="mt-4 text-2xl font-semibold text-white">Face Recognition</h3>
                                <p className="mt-3 text-sm leading-6 text-slate-300">Mark attendance automatically using the camera and AI matching.</p>
                            </div>
                            <div className="rounded-[2rem] bg-slate-900/90 p-6 shadow-2xl shadow-slate-950/50 ring-1 ring-white/5 transition hover:-translate-y-1">
                                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Feature</p>
                                <h3 className="mt-4 text-2xl font-semibold text-white">Real-Time Attendance</h3>
                                <p className="mt-3 text-sm leading-6 text-slate-300">See live attendance data and avoid manual record keeping.</p>
                            </div>
                            <div className="rounded-[2rem] bg-slate-900/90 p-6 shadow-2xl shadow-slate-950/50 ring-1 ring-white/5 transition hover:-translate-y-1">
                                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Feature</p>
                                <h3 className="mt-4 text-2xl font-semibold text-white">Reports</h3>
                                <p className="mt-3 text-sm leading-6 text-slate-300">Export attendance sheets and review summaries in one click.</p>
                            </div>
                        </section>

                        <section className="grid gap-6 lg:grid-cols-2">
                            <div className="rounded-[2rem] bg-slate-900/90 p-6 shadow-2xl shadow-slate-950/40 ring-1 ring-white/5">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Quick action</p>
                                        <h3 className="mt-4 text-2xl font-semibold text-white">Start attendance session</h3>
                                    </div>
                                    <div className="rounded-3xl bg-blue-500/15 px-4 py-3 text-blue-200">
                                        <FaCamera />
                                    </div>
                                </div>
                                <p className="mt-4 text-sm leading-6 text-slate-300">Open the attendance module and start capturing student attendance using face recognition instantly.</p>
                                <button
                                    onClick={() => navigate("/attendance")}
                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                                >
                                    Start Now
                                </button>
                            </div>

                            <div className="rounded-[2rem] bg-slate-900/90 p-6 shadow-2xl shadow-slate-950/40 ring-1 ring-white/5">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Report</p>
                                        <h3 className="mt-4 text-2xl font-semibold text-white">Download attendance</h3>
                                    </div>
                                    <div className="rounded-3xl bg-sky-500/15 px-4 py-3 text-sky-200">
                                        <FaDownload />
                                    </div>
                                </div>
                                <p className="mt-4 text-sm leading-6 text-slate-300">Export attendance records to Excel and review class performance, date by date.</p>
                                <button
                                    onClick={handleDownloadAttendance}
                                    disabled={downloadLoading}
                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {downloadLoading ? "Downloading..." : "Download Report"}
                                </button>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}
