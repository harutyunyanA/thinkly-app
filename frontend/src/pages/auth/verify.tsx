import { useEffect, useState } from "react";
import { Axios } from "../../lib/api";

type VerifyProps = {
  username: string;
  onClose: () => void;
  onSuccess: () => void;
};

export function Verify({ username, onClose, onSuccess }: VerifyProps) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    Axios.post("/auth/send-verification", { username }).catch(() => {
      setError("Failed to resend code");
    });
  });

  function handleVerify() {
    if (code.length !== 6) {
      setError("Code must be 6 digits");
      return;
    }

    setLoading(true);
    setError("");

    Axios.post("/auth/verify", { username, code })
      .then(() => {
        onSuccess();
      })
      .catch(() => {
        setError("Invalid code. Try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleResend() {
    setResendLoading(true);
    setError("");

    Axios.post("/auth/send-verification", { username })
      .then(() => {
        setTimer(60);
      })
      .catch(() => {
        setError("Failed to resend code");
      })
      .finally(() => {
        setResendLoading(false);
      });
  }

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white px-8 py-6 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-3">Email verification</h2>

        <input
          type="text"
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
          onClick={handleResend}
          disabled={timer > 0 || resendLoading}
          className="w-full mt-3 text-sm text-indigo-600 hover:text-indigo-800 disabled:text-gray-400"
        >
          {timer > 0
            ? `Resend code in ${timer}s`
            : resendLoading
            ? "Sending..."
            : "Resend verification code"}
        </button>

        <button
          onClick={onClose}
          className="w-full mt-2 text-gray-500 hover:text-gray-700 text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
