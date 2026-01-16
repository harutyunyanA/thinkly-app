import { useState } from "react";
import type { IUser } from "../../types";
import { ProfileAvatar } from "./profileAvatar";
import { Axios } from "../../lib/api";
import Loader from "../loader";

type ProfileInformationProps = {
  user: IUser;
  setUser: (u: IUser) => void;
};

export function ProfileInformation({ user, setUser }: ProfileInformationProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const newName = name.trim() || user.name;
  const newEmail = email.trim() || user.email;

  const isUnchanged = newName === user.name && newEmail === user.email;

  const handleSaveChanges = () => {
    setLoading(true);

    const payload: Partial<IUser> = {};

    if (newName !== user.name) payload.name = newName;
    if (newEmail !== user.email) payload.email = newEmail;

    Axios.patch("/user/profileInfoUpdate", payload)
      .then(() => {
        setUser({
          ...user,
          ...payload,
        });
        setIsSuccess(true);
        setMessage("Profile updated successfully");
      })
      .catch((err) => {
        setIsSuccess(false);
        setMessage(err.response?.data?.message || "Update failed");
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          setMessage("");
          setIsSuccess(false);
        }, 5000);
      });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Profile Information
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Update your profile information and public details
        </p>
      </div>

      <div className="flex gap-8 items-start">
        <div className="shrink-0">
          <ProfileAvatar setUser={setUser} user={user} />
        </div>

        <div className="flex flex-col gap-5 flex-1 max-w-md">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder={user.name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          disabled={loading || isUnchanged}
          onClick={handleSaveChanges}
          className="px-5 py-2 rounded-lg text-sm font-medium text-white
                     bg-indigo-600 hover:bg-indigo-700
                     disabled:bg-gray-400 disabled:cursor-not-allowed
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {loading ? <Loader size={20} /> : "Save changes"}
        </button>

        {message && (
          <p
            className={`text-sm ${
              isSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
