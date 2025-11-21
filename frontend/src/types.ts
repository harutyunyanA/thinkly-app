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

export interface IQuiz {
  _id: string;
  title: string;
  description: string;
  category: string;
  difficulty: ["easy", "medium", "hard"];
  imageURL: string;
  isPublic: boolean;
  owner: IUser;
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
}

export interface IAnswer {
  text: string;
  isCorrect: boolean;
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
