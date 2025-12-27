import type { IQuiz, QuizForm } from "../types";

export function convertQuiz(quiz: IQuiz) : QuizForm {

    return {
        title : quiz.title,
        description : quiz.description,
        category : quiz.category,
        difficulty : quiz.difficulty,
        imageURL : quiz.imageURL,
        owner : quiz.owner,
        randomized : quiz.randomized,
        questions : quiz.questions.map((q) => ({
            text: q.text,
            answers: q.answers.map((a) => ({
                key: a._id,
                text: a.text,
                isCorrect: a.isCorrect,
            })),
            multipleAnswers: q.multipleAnswers,
            imageUrl: q.imageUrl,
            key: q._id,
        }))
    }
}