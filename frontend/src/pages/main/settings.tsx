import { useNavigate, useOutletContext } from "react-router-dom";
import { AccountSecurity } from "../../components/settings-components/accountSecurity";
import { ProfileInformation } from "../../components/settings-components/profileInformation";

export function Settings() {
  const { userContext, setUserContext } = useOutletContext<{
    userContext: any;
    setUserContext: (u: any) => void;
  }>();

  const navigate = useNavigate();
  const handleLogout = () => {
    setUserContext(null);
    localStorage.removeItem("ThinklyToken");
    navigate("/");
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto p-8 py-10 flex flex-col gap-10">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <ProfileInformation user={userContext} setUser={setUserContext} />
          <AccountSecurity />
          <button
            onClick={handleLogout}
            className="w-full max-w-xs bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-6 rounded-md transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
