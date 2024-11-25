import { useData } from "@/hooks/useData";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const { data } = useData();
  const navigate = useNavigate();

  if (!data.currentUser) {
    navigate("/login");
  }

  return <Outlet />;
};

export default AuthLayout;
