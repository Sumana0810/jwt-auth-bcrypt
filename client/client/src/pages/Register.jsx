import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { register as registerUser } from "../services/authService";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      navigate("/login");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div>
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            placeholder="Enter your name"
            className="w-full p-2 border rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm">Email</label>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm">Password</label>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Enter your password"
            className="w-full p-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {isSubmitting ? "Creating..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}
