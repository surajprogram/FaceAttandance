import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { FaUsers, FaChalkboardTeacher, FaUserPlus, FaTrash, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";

export default function AdminDashboard() {
    const [user, setUser] = useState(null);
    const [faculties, setFaculties] = useState({});
    const [students, setStudents] = useState([]);
    const [deptName, setDeptName] = useState("");
    const [facultyName, setFacultyName] = useState("");
    const [studentName, setStudentName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;
        const parsed = JSON.parse(storedUser);
        if (parsed.role !== "admin") return;
        setUser(parsed);
        fetchData(parsed.token);
    }, []);

    const authHeaders = (token) => ({
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const fetchData = async (token) => {
        try {
            setLoading(true);
            const [facultyRes, studentRes] = await Promise.all([
                axios.get("http://127.0.0.1:5000/api/admin/faculties", authHeaders(token)),
                axios.get("http://127.0.0.1:5000/api/admin/students", authHeaders(token)),
            ]);
            setFaculties(facultyRes.data);
            setStudents(studentRes.data);
        } catch (error) {
            console.error("Admin fetch error:", error);
            toast.error("Failed to load admin data. Check your credentials and backend.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddFaculty = async () => {
        if (!deptName.trim() || !facultyName.trim()) {
            toast.error("Department and faculty name are required.");
            return;
        }

        const token = user?.token;
        if (!token) return;

        try {
            const response = await axios.post(
                "http://127.0.0.1:5000/api/admin/faculties",
                { department: deptName.trim(), name: facultyName.trim() },
                authHeaders(token)
            );
            setFaculties(response.data.faculties);
            setFacultyName("");
            toast.success("Faculty added successfully.");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Could not add faculty.");
        }
    };

    const handleAddStudent = async () => {
        if (!studentName.trim()) {
            toast.error("Student name is required.");
            return;
        }

        const token = user?.token;
        if (!token) return;

        try {
            const response = await axios.post(
                "http://127.0.0.1:5000/api/admin/students",
                { name: studentName.trim() },
                authHeaders(token)
            );
            setStudents(response.data.students);
            setStudentName("");
            toast.success("Student added successfully.");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Could not add student.");
        }
    };

    const handleRemoveFaculty = async (department, name) => {
        const token = user?.token;
        if (!token) return;

        try {
            const response = await axios.delete(
                "http://127.0.0.1:5000/api/admin/faculties",
                {
                    data: { department, name },
                    ...authHeaders(token),
                }
            );
            setFaculties(response.data.faculties);
            toast.success("Faculty removed successfully.");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Could not remove faculty.");
        }
    };

    const handleRemoveStudent = async (name) => {
        const token = user?.token;
        if (!token) return;

        try {
            const response = await axios.delete(
                "http://127.0.0.1:5000/api/admin/students",
                {
                    data: { name },
                    ...authHeaders(token),
                }
            );
            setStudents(response.data.students);
            toast.success("Student removed successfully.");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Could not remove student.");
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
                                <div className="max-w-3xl">
                                    <p className="text-sm uppercase tracking-[0.35em] text-slate-200/70">Admin Dashboard</p>
                                    <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">Manage users and attendance efficiently.</h1>
                                    <p className="mt-4 text-base leading-8 text-slate-200/85 sm:text-lg">
                                        Add or remove faculty and student records with a few clicks. Keep your attendance roster up to date for smarter reporting.
                                    </p>
                                </div>
                                <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/20 p-5 text-right shadow-lg shadow-slate-950/20 backdrop-blur-xl">
                                    <p className="text-sm uppercase tracking-[0.35em] text-slate-300">Signed in as</p>
                                    <p className="mt-3 text-2xl font-semibold text-white">{user.name}</p>
                                    <div className="mt-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80">Admin</div>
                                </div>
                            </div>
                        </section>

                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className="rounded-[2rem] bg-slate-900/90 p-6 shadow-2xl shadow-slate-950/50 ring-1 ring-white/10">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-blue-500/10 text-blue-300">
                                        <FaChalkboardTeacher size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Faculty Management</p>
                                        <h2 className="text-2xl font-semibold text-white">Add faculty members</h2>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-slate-300">Department</label>
                                        <input
                                            value={deptName}
                                            onChange={(e) => setDeptName(e.target.value)}
                                            placeholder="Enter department"
                                            className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950/95 px-4 py-3 text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-slate-300">Faculty Name</label>
                                        <input
                                            value={facultyName}
                                            onChange={(e) => setFacultyName(e.target.value)}
                                            placeholder="Enter faculty name"
                                            className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950/95 px-4 py-3 text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                        />
                                    </div>
                                    <button
                                        onClick={handleAddFaculty}
                                        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                                    >
                                        <FaUserPlus /> Add Faculty
                                    </button>
                                </div>
                            </div>

                            <div className="rounded-[2rem] bg-slate-900/90 p-6 shadow-2xl shadow-slate-950/50 ring-1 ring-white/10">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-indigo-500/10 text-indigo-300">
                                        <FaUsers size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Student Management</p>
                                        <h2 className="text-2xl font-semibold text-white">Add students</h2>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-slate-300">Student Name</label>
                                        <input
                                            value={studentName}
                                            onChange={(e) => setStudentName(e.target.value)}
                                            placeholder="Enter student name"
                                            className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950/95 px-4 py-3 text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                        />
                                    </div>
                                    <button
                                        onClick={handleAddStudent}
                                        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                                    >
                                        <FaSave /> Add Student
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className="rounded-[2rem] bg-slate-900/90 p-6 shadow-2xl shadow-slate-950/50 ring-1 ring-white/10 overflow-hidden">
                                <h3 className="text-xl font-semibold text-white mb-4">Current Faculties</h3>
                                <div className="space-y-4 max-h-96 overflow-auto pr-2">
                                    {Object.keys(faculties).length === 0 ? (
                                        <p className="text-slate-400">No faculties configured yet.</p>
                                    ) : (
                                        Object.entries(faculties).map(([department, names]) => (
                                            <div key={department} className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-4">
                                                <div className="flex items-center justify-between gap-3 mb-3">
                                                    <div>
                                                        <p className="text-sm text-slate-400">Department</p>
                                                        <p className="text-white font-semibold">{department}</p>
                                                    </div>
                                                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-200">{names.length} names</span>
                                                </div>
                                                <div className="space-y-2">
                                                    {names.map((name) => (
                                                        <div key={name} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-900/80 px-4 py-3">
                                                            <span className="text-slate-200">{name}</span>
                                                            <button
                                                                onClick={() => handleRemoveFaculty(department, name)}
                                                                className="rounded-full bg-red-500/10 p-2 text-red-300 transition hover:bg-red-500/20 hover:text-red-200"
                                                            >
                                                                <FaTrash />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            <div className="rounded-[2rem] bg-slate-900/90 p-6 shadow-2xl shadow-slate-950/50 ring-1 ring-white/10 overflow-hidden">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Registered Students</p>
                                        <h3 className="text-2xl font-semibold text-white">Student list</h3>
                                    </div>
                                    <div className="rounded-full bg-slate-800/70 px-4 py-2 text-sm font-semibold text-slate-200">{students.length} entries</div>
                                </div>
                                <div className="space-y-3 max-h-96 overflow-auto pr-2">
                                    {students.length === 0 ? (
                                        <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-6 text-center text-slate-400">No students registered yet.</div>
                                    ) : (
                                        students.map((name) => (
                                            <div key={name} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-900/80 px-4 py-3">
                                                <span className="text-slate-200">{name}</span>
                                                <button
                                                    onClick={() => handleRemoveStudent(name)}
                                                    className="rounded-full bg-red-500/10 p-2 text-red-300 transition hover:bg-red-500/20 hover:text-red-200"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
