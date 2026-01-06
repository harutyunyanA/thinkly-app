import { useNavigate } from "react-router-dom";
import { Axios } from "../../lib/api";

type ExitQuizContentProps = {
  setIsExitModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  attemptId: string;
};

export function ExitQuizContent({
  setIsExitModalOpen,
  attemptId,
}: ExitQuizContentProps) {
  const navigate = useNavigate();

  const handleExit = () => {
    if (!attemptId) return;
    Axios.delete("/attempt/" + attemptId).then(() => {
      setIsExitModalOpen(false);
      navigate("/home");
    });
  };

  return (
    <div>
      <p className="text-gray-800 font-medium mb-4">
        You haven't finished the quiz yet. Leaving now will result in losing
        your progress.
      </p>
      <div className="flex justify-end gap-4">
        <button
          onClick={() => setIsExitModalOpen(false)}
          className="px-4 py-2 bg-gray-300 rounded-lg text-gray-700 hover:bg-gray-400 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleExit}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Exit anyway
        </button>
      </div>
    </div>
  );
}
