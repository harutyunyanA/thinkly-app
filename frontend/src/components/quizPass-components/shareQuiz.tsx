import { Copy } from "lucide-react";
import { useState } from "react";
import { QRGenerator } from "./qrCreator";

export function ShareQuiz() {
  const shareLink = window.location.href;

  const [isCopied, setIsCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(shareLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Share Quiz</h1>
        <p className="text-gray-600 text-sm">
          Share this quiz with students, colleagues, or on social media
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">Share link</p>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={shareLink}
            readOnly
            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            className={`flex items-center justify-center p-2.5 rounded-lg border border-gray-200 transition-colors duration-200 ${
              isCopied
                ? "bg-green-100 text-green-700 border-green-300"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            title="Copy link"
            onClick={copy}
          >
            <Copy size={18} />
          </button>
        </div>
        {isCopied && (
          <p className="text-green-600 text-sm mt-1">Link copied!</p>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <QRGenerator link={shareLink} />
      </div>
    </div>
  );
}
