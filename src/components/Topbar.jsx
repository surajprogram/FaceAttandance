import { useState, useEffect } from "react";
import { FaUser, FaBuilding, FaClock } from "react-icons/fa";

export default function Topbar({ faculty }) {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString("en-US", { 
                hour: "2-digit", 
                minute: "2-digit",
                second: "2-digit"
            }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <header className="h-20 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-8">
            {/* Left - Faculty Info */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold">
                    {faculty?.name?.[0] || "F"}
                </div>
                <div>
                    <h3 className="text-white font-semibold">{faculty?.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                        <FaBuilding size={12} />
                        <span>{faculty?.department}</span>
                    </div>
                </div>
            </div>

            {/* Right - Time and Status */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-300">
                    <FaClock size={16} />
                    <span className="font-mono text-sm">
                        {time}
                    </span>
                </div>
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            </div>
        </header>
    );
}