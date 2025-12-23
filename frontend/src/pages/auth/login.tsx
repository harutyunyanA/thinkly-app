import { useForm } from "react-hook-form";
import { Axios } from "../../lib/api";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { AxiosError } from "axios";
import { Verify } from "./verify";

type User = {
  username: string;
  password: string;
};

export function Login() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const [showVerify, setShowVerify] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const navigate = useNavigate();

  const [error, setError] = useState<string | undefined>("");

  const onSubmit = (data: User) => {
    Axios.post("/auth/signin", data)
      .then((res) => {
        const token = res.data.token;

        if (token) {
          localStorage.setItem("token", token);
        }

        navigate("/home");
      })

      .catch((err: AxiosError<{ message: string }>) => {
        if (err.response?.status === 403) {
          setUserName(data.username);
          setShowVerify(true);
        }
        let errMessage = err.response?.data.message;
        setError(errMessage);
      });
  };

  if (showVerify) {
    return (
      <Verify
        username={userName}
        onClose={() => setShowVerify(false)}
        onSuccess={() => navigate("/")}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Sign In
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition cursor-pointer shadow-sm"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center my-5">
          <hr className="flex-1 border-gray-300" />
          <span className="px-2 text-gray-400 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <div className="flex gap-3 mb-5 my-2">
          <button className="flex-1 border border-gray-300 rounded-md py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition cursor-pointer">
            <img src="/google-logo.svg" alt="Google" className="w-5 h-5" />
            <span className="text-sm font-medium text-gray-700">Google</span>
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-5">
          Already have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
