    import React, { useEffect, useState, useRef } from "react";
    import { api } from "../services/api";
    import { useNavigate } from "react-router-dom";

    export default function Dashboard() {
    const [cars, setCars] = useState([]);
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false); 
    const menuRef = useRef(null);
    const navigate = useNavigate();

    // Auth check
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!storedUser || !token) {
        navigate("/dashboard");
        } else {
        setUser(JSON.parse(storedUser));
        }
    }, [navigate]);

    // Fetch cars
    useEffect(() => {
        const fetchCars = async () => {
        try {
            const res = await api.get("/cars", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setCars(res.data.cars);
        } catch (err) {
            console.error("Failed to fetch cars", err);
        }
        };
        fetchCars();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const total = cars.length;
    const sold = cars.filter(car => car.isSold).length;
    const available = total - sold;

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setMenuOpen(false);
        }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-10 relative">
            <div>
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="text-gray-600 mt-1">
                Welcome, <span className="font-semibold">{user?.email}</span>
            </p>
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={menuRef}>
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
            >
                {user?.name || "Profile"} ▼
            </button>

            {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl overflow-hidden z-10">
                <button
                    onClick={() => alert("Edit Profile Clicked")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                    Edit Profile
                </button>
                <button
                    onClick={() => alert("Change Password Clicked")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                    Change Password
                </button>
                <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                >
                    Logout
                </button>
                </div>
            )}
            </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Stat title="Total Cars" value={total} color="from-indigo-500 to-purple-600" />
            <Stat title="Sold Cars" value={sold} color="from-green-500 to-emerald-600" />
            <Stat title="Available Cars" value={available} color="from-orange-500 to-red-500" />
        </div>

        {/* Recent Cars */}
        <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Recently Added Cars</h2>
            {cars.length === 0 ? (
            <p className="text-gray-500">No cars found</p>
            ) : (
            <table className="w-full text-left">
                <thead>
                <tr className="border-b text-gray-600">
                    <th className="py-2">Model</th>
                    <th>Price</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {cars.slice(0, 5).map(car => (
                    <tr key={car._id} className="border-b">
                    <td className="py-2">{car.model}</td>
                    <td>₹{car.price}</td>
                    <td>
                        <span
                        className={`px-3 py-1 rounded-full text-sm ${
                            car.isSold ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                        }`}
                        >
                        {car.isSold ? "Sold" : "Available"}
                        </span>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            )}
        </div>
        </div>
    );
    }

    function Stat({ title, value, color }) {
    return (
        <div className={`p-6 rounded-2xl bg-gradient-to-br ${color} text-white`}>
        <p className="opacity-80">{title}</p>
        <h2 className="text-4xl font-bold mt-2">{value}</h2>
        </div>
    );
    }
