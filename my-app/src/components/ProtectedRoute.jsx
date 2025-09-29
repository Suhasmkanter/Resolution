import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore();


  if (loading && user === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    // Save the route they wanted in `state` so we can redirect after login
    const location = useLocation();
    localStorage.setItem("redirectAfterLogin", location.pathname); // save path
    return <Navigate to="/login" replace />;
  }

  return children;
}
