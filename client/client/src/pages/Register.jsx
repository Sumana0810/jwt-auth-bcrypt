import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import car from "../assets/car.jpg";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      navigate("/login");
    } catch (err) {
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-h-screen flex items-center justify-center font-mono ">
      <div className="flex shadow-2xl rounded-2xl overflow-hidden">
        {/* Form Section */}
        <div className="flex flex-col items-center justify-center text-center p-16 gap-6 bg-white">
          <h1 className="text-4xl font-bold">Create Account</h1>

          {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
            <div className="text-left">
              <span className="text-lg">Full Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="John Doe"
                className="w-full rounded-md p-2 border-2 outline-none focus:border-cyan-400"
              />
            </div>

            <div className="text-left">
              <span className="text-lg">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full rounded-md p-2 border-2 outline-none focus:border-cyan-400"
              />
            </div>

            <div className="text-left">
              <span className="text-lg">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Enter your password"
                className="w-full rounded-md p-2 border-2 outline-none focus:border-cyan-400"
              />
            </div>

            <div className="text-left">
              <span className="text-lg">Confirm Password</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Re-enter your password"
                className="w-full rounded-md p-2 border-2 outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 py-2 text-xl rounded-md bg-gradient-to-tr from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white disabled:opacity-50"
            >
              {loading ? "Creating..." : "Register"}
            </button>
          </form>

          <p className="font-semibold">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* Image Section */}
        <img
          src={car}
          alt="car"
          className="w-[450px] object-cover hidden xl:block"
        />
      </div>
    </section>
  );
}
