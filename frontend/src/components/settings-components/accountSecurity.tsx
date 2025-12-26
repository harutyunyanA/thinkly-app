import { useState } from "react";
import { useForm } from "react-hook-form";
import { Axios } from "../../lib/api";

export function AccountSecurity() {
  type UserPassword = {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserPassword>();

  const handlePasswordUpdate = (data: UserPassword) => {
    Axios.patch("/user/password", {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    })
      .then((res) => {
        setIsSuccess(true);
        setMessage(res.data.message);
      })
      .catch((err) => {
        setIsSuccess(false);
        setMessage(err.response.data.message);
      })
      .finally(() => {
        setTimeout(() => {
          setMessage("");
          setIsSuccess(false);
        }, 5000);
      });
  };

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900">Account Security</h2>
        <p className="text-sm text-gray-500">
          Update your password and security settings
        </p>
      </div>

      <form onSubmit={handleSubmit(handlePasswordUpdate)} className="space-y-5">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Current Password
          </label>
          <input
            type="password"
            {...register("currentPassword", { required: "Required" })}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm
              focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          {errors.currentPassword && (
            <span className="text-xs text-red-500">
              {errors.currentPassword.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            {...register("newPassword", { required: "Required" })}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm
              focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          {errors.newPassword && (
            <span className="text-xs text-red-500">
              {errors.newPassword.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            type="password"
            {...register("confirmNewPassword", {
              required: "Required",
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            })}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm
                focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          {errors.confirmNewPassword && (
            <span className="text-xs text-red-500">
              {errors.confirmNewPassword.message}
            </span>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2
              text-sm font-medium text-white transition
              hover:bg-indigo-700 focus:outline-none focus:ring-2
              focus:ring-indigo-500 focus:ring-offset-2"
          >
            Update Password
          </button>
          {message && (
            <p
              className={
                "mt-2 text-sm " +
                (isSuccess ? "text-green-600" : "text-red-600")
              }
            >
              {message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
