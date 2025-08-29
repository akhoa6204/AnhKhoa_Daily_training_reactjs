import useAuth from "../hooks/useAuth";
import HomePage from "../pages/Home";
import { Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <HomePage /> : <Outlet />;
};
export default PublicRoute;
