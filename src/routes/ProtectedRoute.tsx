import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { paths } from "./paths";
import type { UserRole } from "../types/auth";

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: UserRole[];
}

export function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to={paths.login} replace />;
  }

  if (roles && roles.length > 0) {
    const userRole = user.role;
    if (!userRole || !roles.includes(userRole)) {
      return <Navigate to={paths.menu} replace />;
    }
  }

  return <>{children}</>;
}
