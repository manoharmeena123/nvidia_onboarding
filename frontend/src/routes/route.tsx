import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

// Define the type for the component props
type AuthMiddlewareProps = {
  children: ReactNode;
  isAuthenticated: boolean;
};

// AuthMiddleware component
export const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({
  children,
  isAuthenticated
}) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};
