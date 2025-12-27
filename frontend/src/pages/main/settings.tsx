import { useOutletContext } from "react-router-dom";
import { AccountSecurity } from "../../components/settings-components/accountSecurity";
import { ProfileInformation } from "../../components/settings-components/profileInformation";

export function Settings() {
  const { userContext, setUserContext } = useOutletContext<{
    userContext: any;
    setUserContext: (u: any) => void;
  }>();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto p-8 py-10 flex flex-col gap-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-8">
          <ProfileInformation user={userContext} setUser={setUserContext} />
          <AccountSecurity />
        </div>
      </div>
    </div>
  );
}
