    import React from "react";
    import { Link, useNavigate } from "react-router-dom";
    import { logout } from "../services/authService";

    export default function Header() {
    const Nav = useNavigate();
    const user = localStorage.getItem("token");

    const handleLogout = () => {
        logout();
        Nav("/login");
    };

    return (
        <header className="bg-gray-800 text-white mt-auto shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">
            Sumana's Car Collection
            </Link>
            <nav className="flex items-center gap-4">
            <Link to="/" className="text-white hover:text-gray-600">
                Home
            </Link>
            {user ? (
                <>
                <Link
                    to="/dashboard"
                    className="text-white hover:text-gray-600"
                >
                    Dashboard
                </Link>
                <button
                    onClick={handleLogout}
                    className="text-white hover:text-gray-600"
                >
                    Logout
                </button>
                </>
            ) : (
                <>
                <Link to="/login" className="text-white hover:text-gray-600">
                    Login
                </Link>
                <Link
                    to="/register"
                    className="text-white hover:text-gray-600"
                >
                    Register
                </Link>
                </>
            )}
            </nav>
        </div>
        </header>
    );
    }