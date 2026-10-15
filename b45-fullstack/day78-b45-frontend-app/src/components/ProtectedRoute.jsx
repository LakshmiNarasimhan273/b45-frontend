import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");

  // No token
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    // Decode token
    const decodedToken = jwtDecode(token);

    // Check role
    if (decodedToken.role !== allowedRole) {
      return <Navigate to="/login" replace />;
    }

    // User is authenticated and has correct role
    return children;

  } catch (error) {
    // Invalid token
    localStorage.removeItem("token");

    return <Navigate to="/login" replace />;
  }
}

export default ProtectedRoute;