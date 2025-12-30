import { createBrowserRouter } from "react-router-dom";
import { Signup } from "./pages/auth/signup";
import { Login } from "./pages/auth/login";
import { LandingPage } from "./pages/auth/landingPage";
import { Home } from "./pages/main/home";
import { Dashboard } from "./pages/main/dashboard";
import { Quizzes } from "./pages/main/quizzes";
import { Settings } from "./pages/main/settings";
import { CreateQuiz } from "./components/createQuiz-components/createQuiz";
import { QuizPassDetails } from "./pages/main/quizPassDetails";

export const router = createBrowserRouter([
  { path: "", element: <LandingPage /> },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "quizzes", element: <Quizzes /> },
      // { path: "quizzes/createQuiz", element: <CreateQuiz /> },
      { path: "settings", element: <Settings /> },
      { path: "quiz/:quizId", element: <QuizPassDetails /> },
    ],
  },
]);
