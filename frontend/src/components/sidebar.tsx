import { NavLink, useNavigate } from "react-router-dom";
import { Home, List, Settings } from "lucide-react";

export function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-white shadow-lg p-5 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <div
          className="flex items-center gap-2 mb-8 hover:cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src="/main-logo.svg" className="w-7 h-7" alt="logo" />
          <span className="text-xl font-semibold text-indigo-600">Thinkly</span>
        </div>
      </div>

      <nav className="flex flex-col gap-4">
        <NavLink
          to="/home"
          end
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md ${
              isActive ? "bg-indigo-100 text-indigo-700" : "text-gray-700"
            }`
          }
        >
          <Home size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/home/quizzes"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md ${
              isActive ? "bg-indigo-100 text-indigo-700" : "text-gray-700"
            }`
          }
        >
          <List size={18} />
          My Quizzes
        </NavLink>

        <NavLink
          to="/home/settings"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md ${
              isActive ? "bg-indigo-100 text-indigo-700" : "text-gray-700"
            }`
          }
        >
          <Settings size={18} />
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}
