import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/useRedux";

export default function PrivateRoute() {
  const { isAuthenticated } = useAppSelector((state) => state.account);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
