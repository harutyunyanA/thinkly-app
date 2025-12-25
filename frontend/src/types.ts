export interface INewUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface IResponse<T = unknown> {
  success: boolean;
  message: string;
  payload?: T | null;
  token?: string | null;
}

export interface QuizForm {
  title: string;
  description: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  imageURL: string;
  // isPublic: boolean;
  owner: string;
  randomized: boolean;
  questions: QuizQuestion[];
}

export interface QuestionAnswerForm {
  key: string;
  text: string;
  isCorrect: boolean;
}
export interface QuizQuestion {
  // quiz: IQuiz;
  text: string;
  answers: QuestionAnswerForm[];
  multipleAnswers: boolean;
  imageUrl: string;
  key: string;
}
export interface IQuiz {
  _id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  imageURL: string;
  // isPublic: boolean;
  owner: string;
  randomized: boolean;
  questions: IQuestion[];
  averageRating: number;
  averageScore: number;
  createdAt: Date;
}

export interface IQuestion {
  quiz: IQuiz;
  text: string;
  answers: IAnswer[];
  multipleAnswers: boolean;
  imageUrl: string;
  createdAt: Date;
  _id:string
}

export interface IAnswer {
  text: string;
  isCorrect: boolean;
  _id:string
}

export interface IUser {
  _id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  isVerified: boolean;
  createdAt: Date;
  quizzes: IQuiz[];
}
