import { Plus } from "lucide-react";
import type { QuizForm,QuizQuestion } from "../../types"; // Убедись, что IQuestion импортирован
import { EditQuestionItem } from "./editQuestionItem";

interface EditQuizQuestionsProps {
  quiz: QuizForm;
  setQuiz: React.Dispatch<React.SetStateAction<QuizForm>>;
}

function newQuestionForm() {
  const newQuestion: QuizQuestion = {
    text: "",
    answers: [{ text: "", isCorrect: false, key: String(crypto.randomUUID()) }],
    multipleAnswers: false,
    imageUrl: "",
    key: String(crypto.randomUUID()),
  };
  return newQuestion;
}

export function EditQuizQuestions({
  quiz,
  setQuiz,
}: 
EditQuizQuestionsProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Quiz Questions</h2>
      </div>
      {/* ---------------------------------------- */}
      <div id="mainQuestionsBlock" className="space-y-4">
        {quiz.questions.map((q, i) => (
          <div key={q.key}>
            <EditQuestionItem index={i} question={q} setQuiz={setQuiz} />
          </div>
        ))}
      </div>

      {/* ---------------------------------------- */}
      <button
        onClick={() => {
          setQuiz((prev) =>
            prev
              ? {
                  ...prev,
                  questions: [...prev.questions, newQuestionForm()],
                }
              : prev
          );
        }}
        className="w-full py-4 border-2 border-dashed border-zinc-800 rounded-xl text-zinc-400 hover:text-violet-400 hover:border-violet-500/50 hover:bg-violet-500/5 transition-all flex items-center justify-center gap-2 font-medium"
      >
        <Plus className="w-5 h-5" />
        Add Question
      </button>
    </div>
  );
}
