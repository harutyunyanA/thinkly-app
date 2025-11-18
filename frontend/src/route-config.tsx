import { createBrowserRouter } from "react-router-dom";
import { Signup } from "./pages/auth/signup";
import { Login } from "./pages/auth/login";
import { LandingPage } from "./pages/auth/landing-page";
import { Home } from "./pages/main/home";
import { Dashboard } from "./components/dashboard";
import { Quizzes } from "./pages/main/quizzes";
import { Settings } from "./pages/main/settings";

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
    path: "/dashboard",
    element: <Home />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "quizzes", element: <Quizzes /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);
