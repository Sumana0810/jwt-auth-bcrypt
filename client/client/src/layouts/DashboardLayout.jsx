        import React from "react";
        import { Link, Outlet, useNavigate } from "react-router-dom";

        export default function DashboardLayout() {
        const navigate = useNavigate();

        const handleLogout = () => {
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
            navigate("/login");
        };

        return (
            <div className="min-h-screen flex bg-gray-100">
            
            {/* SIDEBAR */}
            <aside className="w-64 bg-gray-900 text-white p-6 hidden md:block">
                <h1 className="text-2xl font-bold mb-8">🚗 Car Dashboard</h1>

                <nav className="flex flex-col gap-4">
                <Link
                    to="/dashboard"
                    className="hover:bg-gray-700 px-4 py-2 rounded"
                >
                    Dashboard
                </Link>

                <Link
                    to="/dashboard/manage-cars"
                    className="hover:bg-gray-700 px-4 py-2 rounded"
                >
                    Manage Cars
                </Link>

                <button
                    onClick={handleLogout}
                    className="mt-6 bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                >
                    Logout
                </button>
                </nav>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 p-8 bg-gradient-to-br from-gray-100 to-gray-200">
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
        <Outlet />
    </div>
    </main>

            </div>
        );
        }
