import { useForm } from "react-hook-form";
import type { INewUser } from "../../types";
import { Axios } from "../../lib/api";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { AxiosError } from "axios";

export function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewUser>();

  const navigator = useNavigate();
  const [error, setError] = useState<string | undefined>("");

  const handleSignup = (data: INewUser) => {
    setError("");
    console.log(data);
    Axios.post("/auth/signup", data)
      .then(() => {
        navigator("/login");
      })
      .catch((err: AxiosError<{ message: string }>) => {
        let errMessage = err.response?.data.message;
        setError(errMessage);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Create Account
        </h1>

        <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="John Doe"
              className={`w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.name
                  ? "border border-red-500 focus:ring-red-400"
                  : "border border-gray-300 focus:ring-indigo-500"
              }`}
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              {...register("username", { required: true })}
              placeholder="JohnDoe"
              className={`w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.username
                  ? "border border-red-500 focus:ring-red-400"
                  : "border border-gray-300 focus:ring-indigo-500"
              }`}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="name@example.com"
              className={`w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.email
                  ? "border border-red-500 focus:ring-red-400"
                  : "border border-gray-300 focus:ring-indigo-500"
              }`}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="********"
              className={`w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.password
                  ? "border border-red-500 focus:ring-red-400"
                  : "border border-gray-300 focus:ring-indigo-500"
              }`}
            />
          </div>

          {error && <p className="">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition cursor-pointer shadow-sm"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <hr className="flex-1 border-gray-300" />
          <span className="px-2 text-gray-400 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google button */}
        <div className="flex gap-3 mb-5 my-2">
          <button className="flex-1 border border-gray-300 rounded-md py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition cursor-pointer">
            <img src="/google-logo.svg" alt="Google" className="w-5 h-5" />
            <span className="text-sm font-medium text-gray-700">Google</span>
          </button>
        </div>

        {/* Sign in link */}
        <p className="text-center text-sm text-gray-600 mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
