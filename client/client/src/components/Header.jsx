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
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          My App
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-gray-900"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-gray-900"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-gray-900">
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-700 hover:text-gray-900"
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
