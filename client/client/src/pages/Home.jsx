// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // Fetch all cars
  const fetchCars = async () => {
    try {
      setLoading(true);
      const res = await api.get("/cars");
      setCars(res.data.cars || []);
    } catch (err) {
      console.error("Fetch cars error:", err);
      setError("Failed to load cars.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Filter cars based on search
  const filteredCars = cars.filter(
    (car) =>
      car.brand.toLowerCase().includes(search.toLowerCase()) ||
      car.model.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return <p className="text-center mt-20 text-xl font-semibold">Loading cars...</p>;
  if (error)
    return <p className="text-center mt-20 text-xl font-semibold text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search bar below existing Header */}
      <div className="container mx-auto px-4 py-6">
        <input
          type="text"
          placeholder="Search by brand or model..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Car grid */}
      <div className="container mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCars.map((car) => (
            <div
              key={car._id}
              className="bg-white border rounded-lg shadow hover:shadow-2xl transition transform hover:-translate-y-1 flex flex-col"
            >
              {/* Image */}
              <div className="overflow-hidden rounded-t-lg h-48">
                <img
                  src={car.images[0]}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>

              {/* Car details */}
              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-lg font-bold mb-1 truncate">
                  {car.brand} {car.model}
                </h2>
                <p className="text-gray-500 mb-1">Year: {car.year}</p>
                <p className="text-gray-700 mb-1 font-semibold text-green-700">
                  ${car.price.toLocaleString()}
                </p>
                <p className="text-gray-500 mb-2 text-sm">
                  Fuel: {car.fuelType} | Transmission: {car.transmission}
                </p>
                <p
                  className={`font-semibold mb-2 ${
                    car.sold ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {car.sold ? "Sold" : "Available"}
                </p>

                {/* Buttons */}
                <div className="mt-auto flex gap-2">
                  <button
                    className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    onClick={() => navigate(`/cars/${car._id}`)}
                  >
                    View Details
                  </button>
                  <button className="flex-1 bg-yellow-400 text-black py-2 rounded hover:bg-yellow-500 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredCars.length === 0 && (
            <p className="col-span-full text-center text-gray-500 mt-10">
              No cars found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
