import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/useRedux";

export default function PublicRoute() {
  const { isAuthenticated } = useAppSelector((state) => state.account);
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}
