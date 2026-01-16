import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { Axios } from "../../lib/api";
import type { IUser } from "../../types";
import Loader from "../loader";

type ProfileAvatarProps = {
  setUser: (user: IUser) => void;
  user: IUser;
};

export function ProfileAvatar({ setUser, user }: ProfileAvatarProps) {
  const editorRef = useRef<AvatarEditor | null>(null);
  console.log(user);
  const [image, setImage] = useState<string>(user.avatar);
  const [preview, setPreview] = useState<string>(user.avatar);
  const [isEditing, setIsEditing] = useState(false);
  const [scale, setScale] = useState(1.2);

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setIsEditing(true);
    };
    reader.readAsDataURL(file);
  };

  const onClose = () => {
    setImage(user.avatar);
    setPreview(user.avatar);
    setIsEditing(false);
    setScale(1.2);
  };

  const handleSave = async () => {
    if (!editorRef.current) return;

    setLoading(true);

    try {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const blob: Blob | null = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      if (!blob) throw new Error("Canvas error");

      const file = new File([blob], "avatar.png", { type: "image/png" });

      const formData = new FormData();
      formData.append("avatar", file);

      const res = await Axios.post("/user/avatar", formData);

      const newAvatar = res.data.payload.location;

      setUser({ ...user, avatar: newAvatar });
      setPreview(newAvatar);
      setIsSuccess(true);
      setMessage("Avatar updated successfully");
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
      <div className="relative">
        <img
          src={preview || user.avatar}
          alt="Profile avatar"
          className="h-28 w-28 rounded-full object-cover border-2 border-gray-200 shadow"
        />
      </div>

      {!isEditing && (
        <>
          <label
            htmlFor="avatar-upload"
            className="text-sm font-medium text-blue-600 cursor-pointer hover:underline"
          >
            Change avatar
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </>
      )}

      {isEditing && (
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="rounded-xl overflow-hidden border bg-gray-50 p-2">
            <AvatarEditor
              ref={editorRef}
              image={image}
              width={220}
              height={220}
              border={30}
              borderRadius={110}
              scale={scale}
            />
          </div>

          <input
            type="range"
            min="1"
            max="3"
            step="0.01"
            value={scale}
            onChange={(e) => setScale(+e.target.value)}
            className="w-full"
          />

          <div className="flex gap-3">
            <button
              disabled={loading}
              onClick={handleSave}
              className={`
    px-4 py-2 rounded-lg text-sm font-medium transition
    ${
      loading
        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
        : "bg-blue-600 text-white hover:bg-blue-700"
    }
    flex items-center justify-center gap-2
  `}
            >
              {loading ? (
                <Loader size={20} /> 
              ) : (
                "Save"
              )}
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
      )}

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
