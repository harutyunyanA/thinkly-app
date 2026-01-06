import { Sidebar } from "../../components/sidebar";
import { Header } from "../../components/header";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Axios } from "../../lib/api";
import type { IResponse, IUser } from "../../types";

export function Home() {
  const [userContext, setUserContext] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    Axios.get<IResponse<IUser>>("/auth/user")
      .then((res) => {
        setUserContext(res.data.payload as IUser);
      })
      .catch(() => {
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />

        <div className="p-6">
          <Outlet context={{ userContext, setUserContext }} />
        </div>
      </div>
    </div>
  );
}
