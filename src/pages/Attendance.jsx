import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import axios from "axios";
import { toast } from "react-toastify";
import { FaCamera, FaStop, FaSpinner, FaBolt } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Attendance() {
    const navigate = useNavigate();
    const webcamRef = useRef(null);

    const [user, setUser] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [attendance, setAttendance] = useState([]);
    const [showScanning, setShowScanning] = useState(false);

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

    const stopWebcamStream = () => {
        const video = webcamRef.current?.video;
        const stream = webcamRef.current?.stream || (video && video.srcObject);

        if (stream && stream.getTracks) {
            stream.getTracks().forEach((track) => track.stop());
        }
    };

    const startAttendance = async () => {
        setLoading(true);
        setShowScanning(true);
        stopWebcamStream();
        setIsActive(false);

        try {
            toast.info("📹 Starting face recognition... Please look at the camera.", { autoClose: 2000 });
            const response = await axios.get("http://127.0.0.1:5000/start-attendance", {
                timeout: 15000,
                params: {
                    faculty: user?.name,
                    department: user?.department,
                },
            });

            const message = response.data.message;
            const studentName = message.includes("for")
                ? message.split("for ")[1].trim()
                : "You";

            if (response.data.success) {
                if (response.data.alreadyMarked) {
                    toast.info(`ℹ️ ${studentName} has already been marked present today.`);
                } else {
                    toast.success(`✅ ${studentName}, attendance marked successfully!`);
                    const newEntry = {
                        id: Date.now(),
                        name: studentName,
                        time: new Date().toLocaleTimeString(),
                        status: "Present",
                    };
                    setAttendance((prevAttendance) => [newEntry, ...prevAttendance]);
                }
            } else {
                toast.error(response.data.message || "❌ Your face did not match any registered student. Please try again.");
            }
        } catch (error) {
            console.error("Attendance error:", error);
            if (error.code === "ECONNABORTED") {
                toast.error("❌ Request timeout. Face recognition took too long. Please try again.");
            } else if (error.message.includes("Network Error") || !error.response) {
                toast.error("❌ Cannot connect to backend server. Make sure the Python Flask server is running on port 5000.");
            } else if (error.response?.status === 400) {
                toast.error("❌ No face detected. Please position yourself properly and try again.");
            } else {
                toast.error(`❌ Error: ${error.response?.data?.error || error.message || "Unknown error"}`);
            }
        } finally {
            setLoading(false);
            setShowScanning(false);
            setIsActive(false);
        }
    };

    const stopAttendance = () => {
        setIsActive(false);
        setShowScanning(false);
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
                                    <p className="text-sm uppercase tracking-[0.35em] text-slate-200/70">Attendance Control</p>
                                    <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">Real-time face recognition attendance</h1>
                                    <p className="mt-4 text-base leading-8 text-slate-200/85 sm:text-lg">
                                        Use your webcam to capture student attendance, then export comprehensive records from this dashboard.
                                    </p>
                                </div>
                                <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/20 p-5 text-right shadow-lg shadow-slate-950/20 backdrop-blur-xl">
                                    <p className="text-sm uppercase tracking-[0.35em] text-slate-300">Faculty</p>
                                    <p className="mt-3 text-2xl font-semibold text-white">{user.name}</p>
                                    <p className="text-sm text-slate-300">{user.department}</p>
                                </div>
                            </div>
                        </section>

                        <div className="grid gap-6 xl:grid-cols-3">
                            <div className="xl:col-span-2 rounded-[2rem] bg-slate-900/90 p-6 shadow-2xl shadow-slate-950/50 ring-1 ring-white/10">
                                <div className="flex items-center justify-between gap-4 mb-6">
                                    <div>
                                        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Live capture</p>
                                        <h2 className="mt-2 text-2xl font-semibold text-white">Camera preview</h2>
                                    </div>
                                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200">
                                        <FaBolt /> Fast capture
                                    </div>
                                </div>
                                <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/80 h-[28rem]">
                                    {isActive ? (
                                        <Webcam
                                            ref={webcamRef}
                                            className="h-full w-full object-cover"
                                            mirrored={true}
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            <div className="text-center">
                                                <FaCamera className="mx-auto text-slate-500 mb-4" size={54} />
                                                <p className="text-slate-400">Click start to activate the webcam and scan student faces.</p>
                                            </div>
                                        </div>
                                    )}
                                    {showScanning && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80">
                                            <div className="text-center">
                                                <FaSpinner className="animate-spin text-sky-400 mx-auto mb-4" size={40} />
                                                <p className="text-white text-lg font-semibold">Scanning student faces...</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="rounded-[2rem] bg-slate-900/90 p-6 shadow-2xl shadow-slate-950/50 ring-1 ring-white/10">
                                <h2 className="text-xl font-semibold text-white mb-4">Attendance controls</h2>
                                <div className="space-y-4">
                                    <div className="rounded-3xl bg-slate-950/80 p-4 text-slate-300">
                                        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Current Date</p>
                                        <p className="mt-2 text-lg font-semibold text-white">{new Date().toLocaleDateString()}</p>
                                    </div>
                                    <div className="rounded-3xl bg-slate-950/80 p-4 text-slate-300">
                                        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Teacher</p>
                                        <p className="mt-2 text-lg font-semibold text-white">{user.name}</p>
                                        <p className="text-sm text-slate-400">{user.department}</p>
                                    </div>
                                    <div className="space-y-3">
                                        <button
                                            onClick={startAttendance}
                                            disabled={loading || isActive}
                                            className="w-full rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {loading ? "Starting..." : "Start Attendance"}
                                        </button>
                                        {isActive && (
                                            <button
                                                onClick={stopAttendance}
                                                className="w-full rounded-full border border-white/10 bg-slate-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                                            >
                                                Stop Scan
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-8 rounded-[1.5rem] bg-white/5 p-5">
                                    <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Guidance</p>
                                    <ul className="mt-4 space-y-3 text-slate-300">
                                        <li>• Keep the student face centered.</li>
                                        <li>• Make sure the lighting is stable.</li>
                                        <li>• Avoid multiple faces in view.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <section className="rounded-[2rem] bg-slate-900/90 p-6 shadow-2xl shadow-slate-950/50 ring-1 ring-white/10">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Attendance Log</p>
                                    <h2 className="mt-2 text-2xl font-semibold text-white">Recent entries</h2>
                                </div>
                                <div className="rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200">{attendance.length} records</div>
                            </div>

                            {attendance.length === 0 ? (
                                <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-10 text-center text-slate-400">
                                    No attendance records yet. Start scanning students to populate the list.
                                </div>
                            ) : (
                                <div className="mt-6 overflow-x-auto">
                                    <table className="min-w-full text-left text-sm text-slate-300">
                                        <thead className="border-b border-white/10 text-slate-400">
                                            <tr>
                                                <th className="px-6 py-4">Name</th>
                                                <th className="px-6 py-4">Time</th>
                                                <th className="px-6 py-4">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {attendance.map((record) => (
                                                <tr key={record.id} className="border-b border-white/10 hover:bg-white/5 transition">
                                                    <td className="px-6 py-4 text-white">{record.name}</td>
                                                    <td className="px-6 py-4 text-slate-400">{record.time}</td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-300">
                                                            {record.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}

