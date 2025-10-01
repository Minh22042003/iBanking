import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function ProtectedRoute() {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
