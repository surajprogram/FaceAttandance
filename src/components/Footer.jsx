export default function Footer() {
    return (
        <footer className="bg-slate-950/90 text-slate-300">
            <div className="mx-auto max-w-7xl px-6 py-8 md:px-8">
                <div className="grid gap-8 md:grid-cols-3">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">SmartAttend</p>
                        <p className="mt-4 text-sm leading-7 text-slate-300">
                            AI-powered face recognition attendance built for modern classrooms and labs.
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Quick Links</p>
                        <ul className="mt-4 space-y-3 text-sm text-slate-300">
                            <li>Dashboard</li>
                            <li>Attendance</li>
                            <li>Admin Tools</li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Contact</p>
                        <p className="mt-4 text-sm leading-7 text-slate-300">
                            suraj27ai069@satiengg.in<br />+918827638142
                        </p>
                    </div>
                </div>
                <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
                    © {new Date().getFullYear()} SmartAttend. Built for intelligent attendance monitoring.
                </div>
            </div>
        </footer>
    );
}
