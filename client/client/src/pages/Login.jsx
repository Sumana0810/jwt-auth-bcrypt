import React, { useState } from "react";
import car from "../assets/car.jpg";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
      } else {
        // Save token
        if (remember) {
          localStorage.setItem("token", data.token);
        } else {
          sessionStorage.setItem("token", data.token);
        }

        navigate("/dashboard");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-h-screen flex items-center justify-center font-mono">
      <div className="flex shadow-2xl rounded-2xl overflow-hidden">

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center text-center p-16 gap-8 bg-white w-[450px]"
        >
          <h1 className="text-4xl font-bold">Welcome</h1>

          {error && <p className="text-red-500">{error}</p>}

          {/* EMAIL */}
          <div className="flex flex-col text-left gap-1 w-full">
            <span className="text-lg">Email Address</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md p-2 border-2 outline-none focus:border-cyan-400"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col text-left gap-1 w-full">
            <span className="text-lg">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md p-2 border-2 outline-none focus:border-cyan-400"
              placeholder="••••••••"
              required
            />
            <label className="flex items-center gap-2 mt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span className="text-sm">Remember Password</span>
            </label>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-lg rounded-md bg-gradient-to-tr from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          {/* REGISTER LINK */}
          <p className="font-semibold text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:underline">
              Register
            </Link>
          </p>
        </form>

        {/* IMAGE */}
        <div className="hidden xl:block">
          <img
            src={car}
            alt="car"
            className="h-full w-[500px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
