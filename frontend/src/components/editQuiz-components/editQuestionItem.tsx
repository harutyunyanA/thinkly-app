import { Trash2, Plus } from "lucide-react";
import type {
  IQuestion,
  IQuiz,
  QuestionAnswerForm,
} from "../../types";
import { EditSingleAnswerItem } from "./editSingleAnswerItem";
type QuestionItemProps = {
  index: number;
  question: IQuestion;
  setQuiz: React.Dispatch<React.SetStateAction<IQuiz | null>>;
};

export function EditQuestionItem({
  index,
  question,
  setQuiz,
}: QuestionItemProps) {

  const updateQuestion = (updated: Partial<IQuestion>) => {
    setQuiz((prev) =>
      prev
        ? {
            ...prev,
            questions: prev.questions.map((q) =>
              q._id === question._id ? { ...q, ...updated } : q
            ),
          }
        : prev
    );
  };

  const deleteQuestion = (questionKey: string) => {
    setQuiz((prev) =>
      prev
        ? {
            ...prev,
            questions: prev.questions.filter((q) => q._id !== questionKey),
          }
        : prev
    );
  };

  const addAnswer = () => {
    const newAnswer: QuestionAnswerForm = {
      text: "",
      isCorrect: false,
      key: String(crypto.randomUUID()),
    };

    // updateQuestion({
    //   answers: [...question.answers, newAnswer],
    // });
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 space-y-6">
      {/* ---------- Header ---------- */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Question {index + 1}
        </h2>

        <div className="flex items-center gap-3">
          <select
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
            value={question.multipleAnswers ? "multiple" : "single"}
            onChange={(e) =>
              updateQuestion({ multipleAnswers: e.target.value === "multiple" })
            }
          >
            <option value="single">Single Answer</option>
            <option value="multiple">Multiple Answers</option>
          </select>

          <button
            type="button"
            onClick={() => deleteQuestion(question._id || question._id)}
            className="p-2 rounded-full hover:bg-red-50 text-red-500 transition"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ---------- Question text ---------- */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">Question Text</p>
        <textarea
          className="w-full min-h-20 rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900"
          placeholder="Enter your question here..."
          value={question.text}
          onChange={(e) => updateQuestion({ text: e.target.value })}
        />
      </div>

      {/* ---------- Answers ---------- */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-700">Answer Options</p>

          <button
            type="button"
            onClick={addAnswer}
            className="flex items-center gap-2 text-sm text-violet-600 hover:text-violet-800"
          >
            <Plus className="w-4 h-4" />
            Add answer
          </button>
        </div>

        <div className="space-y-2">
          {question.answers.map((answer) =>
            // question.multipleAnswers ? (
            //   <EditMultiAnswerItem
            //     key={answer._id}
            //     question={question}
            //     setQuiz={setQuiz}
            //     answer={answer}
            //   />
            // ) : (
              <EditSingleAnswerItem
                key={answer._id}
                question={question}
                setQuiz={setQuiz}
                answer={answer}
              />
            // )
          )}
        </div>
      </div>
    </div>
  );
}
