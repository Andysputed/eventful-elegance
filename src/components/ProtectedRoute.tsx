import { useAuth } from "./AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-cream-dark">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  // If not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  // If logged in, render the child routes (The Dashboard)
  return <Outlet />;
};

export default ProtectedRoute;