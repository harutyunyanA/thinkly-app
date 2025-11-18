import { Sidebar } from "../../components/sidebar";
import { Header } from "../../components/header";
import { Outlet } from "react-router-dom";

export function Home() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />

        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
