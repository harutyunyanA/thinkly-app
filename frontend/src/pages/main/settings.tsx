import { AccountSecurity } from "../../components/settings-components/accountSecurity";

export function Settings() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>

      {/* account security */}
      <AccountSecurity />
    </div>
  );
}
