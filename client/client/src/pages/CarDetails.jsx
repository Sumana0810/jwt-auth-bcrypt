    // src/pages/CarDetails.jsx
    import React, { useEffect, useState } from "react";
    import { useParams, useNavigate } from "react-router-dom";
    import { api } from "../services/api";
    import { FaArrowLeft, FaGasPump, FaCog, FaCalendarAlt, FaCarSide } from "react-icons/fa";
    import { toast } from "react-toastify";

    export default function CarDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCar = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/cars/${id}`);
            setCar(res.data.car); // assuming backend sends { car: {...} }
        } catch (err) {
            console.error(err);
            setError("Failed to load car details.");
            toast.error("Failed to load car details.");
        } finally {
            setLoading(false);
        }
        };
        fetchCar();
    }, [id]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
    if (!car) return <p className="text-center mt-10">Car not found</p>;

    return (
        <div className="container mx-auto px-4 py-6">
        <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-blue-600 hover:underline"
        >
            <FaArrowLeft /> Back
        </button>

        <h1 className="text-3xl font-bold mb-4">{car.brand} {car.model}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Car Image */}
            <img
            src={car.images[0] || "https://via.placeholder.com/600x400?text=No+Image"}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-96 object-cover rounded-lg"
            />

            {/* Car Details */}
            <div className="space-y-2">
            <p className="text-gray-700">{car.description}</p>
            <p className="font-semibold">Price: ${car.price}</p>
            <p><FaCalendarAlt /> Year: {car.year}</p>
            <p><FaGasPump /> Fuel: {car.fuelType}</p>
            <p><FaCog /> Transmission: {car.transmission}</p>
            <p><FaCarSide /> Color: {car.color}</p>
            <p>Mileage: {car.mileage}</p>
            <p>Condition: {car.condition}</p>
            <p>Location: {car.location}</p>
            <p className={`font-semibold ${car.sold ? "text-red-500" : "text-green-500"}`}>
                {car.sold ? "Sold" : "Available"}
            </p>
            </div>
        </div>
        </div>
    );
    }
