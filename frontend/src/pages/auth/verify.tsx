import { useState } from "react";
import { Axios } from "../../lib/api";

type VerifyProps = {
  username: string; // почта или username
  onClose: () => void; // закрыть окно
  onSuccess: () => void; // успешная верификация
};

export function Verify({ username, onClose, onSuccess }: VerifyProps) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleVerify() {
    if (code.length !== 6) {
      setError("Code must be 6 digits");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("helllooooo");
      await Axios.post("/auth/verify", { username, code });
      onSuccess();
    } catch (err) {
      setError("Invalid code. Try again.");
    }

    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white px-8 py-6 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-3">email Verification</h2>

        <p className="text-gray-600 text-sm mb-4">
          Code sent to <span className="font-medium">{username}</span>
        </p>

        <input
          type="text"
          // maxLength="6"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-center tracking-widest text-lg mb-3"
          placeholder="_ _ _ _ _ _"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        <button
          onClick={onClose}
          className="w-full mt-3 text-gray-500 hover:text-gray-700 text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
