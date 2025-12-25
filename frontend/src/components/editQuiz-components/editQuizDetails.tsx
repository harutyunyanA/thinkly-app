import type { IQuiz, QuizForm } from "../../types";

type EditQuizDetailsProps = {
  quiz: IQuiz;
  setQuiz: React.Dispatch<React.SetStateAction<IQuiz | null>>;
};

export function EditQuizDetails({ quiz, setQuiz }: EditQuizDetailsProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-6 w-full">
      {/* HEADER */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Quiz Details</h2>
        <p className="text-sm text-gray-500">
          Basic information about your quiz
        </p>
      </div>

      {/* TITLE */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Quiz Title</label>
        <input
          type="text"
          value={quiz.title}
          onChange={(e) =>
            setQuiz((prev) =>
              prev ? { ...prev, title: e.target.value } : prev
            )
          }
          placeholder="Enter quiz title"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      {/* DESCRIPTION */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={quiz.description}
          onChange={(e) =>
            setQuiz((prev) =>
              prev ? { ...prev, description: e.target.value } : prev
            )
          }
          placeholder="Describe your quiz..."
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
        ></textarea>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* DIFFICULTY */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Difficulty
          </label>
          <select
            value={quiz.difficulty}
            onChange={(e) =>
              setQuiz((prev) =>
                prev
                  ? {
                      ...prev,
                      difficulty: e.target.value as QuizForm["difficulty"],
                    }
                  : prev
              )
            }
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      {/* RANDOMIZE QUESTIONS */}
      <div className="pt-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-800">
              Randomize Questions
            </span>
            <span className="text-xs text-gray-500">
              Show questions in random order
            </span>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={quiz.randomized}
              onChange={(e) =>
                setQuiz((prev) =>
                  prev ? { ...prev, randomized: e.target.checked } : prev
                )
              }
            />
            <div
              className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer 
                peer-checked:bg-indigo-600 peer-checked:after:translate-x-5 
                after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:h-4 after:w-4 
                after:rounded-full after:transition-all"
            ></div>
          </label>
        </div>
      </div>
    </div>
  );
}
