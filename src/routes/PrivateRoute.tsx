import useAuth from "../hooks/useAuth";
import LoginPage from "../pages/Login";
import { Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <LoginPage />;
};
export default PrivateRoute;
