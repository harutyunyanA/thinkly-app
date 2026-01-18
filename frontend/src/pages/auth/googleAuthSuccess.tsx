import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../components/loader";

export default function GoogleAuthSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      localStorage.setItem("ThinklyToken", token);
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  return <Loader fullscreen={true} />;
}
