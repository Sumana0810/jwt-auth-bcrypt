import { useForm } from "react-hook-form";
import { UseNavigate } from "react-router-dom";
import { login } from "../services/authService";
export default function Login() {
  const navigate = UseNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      localStorage.setItem("token", res.token);
      navigate("/home");
    } catch (err) {
      alert("login failed");
    }
  };
  return (
    <div className="max-w-md mx-auto mt-20 p-6  bg-white shadow  rounded">
      <h2 className="text-2xl  font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Enter the Password"
            className="w-full p-2 border rounded"
            {...register("email", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-600">{errors.password.message}</p>
          )}
        </div>

        <button className="w-full bg-blue-700 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
