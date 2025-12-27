import { useState } from "react";
import Avatar from "react-avatar-edit";
import { Axios } from "../../lib/api";
import type { IUser } from "../../types";

type ProfileAvatarProps = {
  setUser: (user: IUser) => void;
  user: IUser;
};

export function ProfileAvatar({ setUser, user }: ProfileAvatarProps) {
  const [preview, setPreview] = useState<string>(user.avatar);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const onCrop = (preview: string) => setPreview(preview);

  const onClose = () => {
    setPreview(user.avatar);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!preview) return;
    setLoading(true);

    try {
      const res = await fetch(preview);
      const blob = await res.blob();
      const file = new File([blob], "avatar.png", { type: blob.type });

      const formData = new FormData();
      formData.append("avatar", file);

      Axios.post("/user/avatar", formData).then((res) => {
        setUser({ ...user, avatar: res.data.payload.location });
        setIsSuccess(true);
        setMessage("Avatar updated successfully");
      });
    } catch {
      setIsSuccess(false);
      setMessage("Error uploading avatar");
    } finally {
      setIsEditing(false);
      setLoading(false);
      setTimeout(() => {
        setMessage("");
        setIsSuccess(false);
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-2xl shadow-sm max-w-sm">
      {/* Avatar preview */}
      <div className="relative">
        <img
          src={preview || user.avatar}
          alt="Profile avatar"
          className="h-28 w-28 rounded-full object-cover border-2 border-gray-200 shadow"
        />
      </div>

      {/* Edit mode */}
      {isEditing ? (
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="rounded-xl overflow-hidden border bg-gray-50">
            <Avatar
              width={220}
              height={220}
              onCrop={onCrop}
              onClose={onClose}
              src=""
            />
          </div>

          <div className="flex gap-3">
            <button
              disabled={loading}
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium
                         hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save"}
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm
                         hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
        >
          Change avatar
        </button>
      )}

      {/* Message */}
      {message && (
        <p
          className={`text-sm text-center ${
            isSuccess ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
