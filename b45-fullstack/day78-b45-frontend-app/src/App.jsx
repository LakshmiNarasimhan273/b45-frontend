import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User Protected Route */}
      <Route
        path="/home"
        element={
          <ProtectedRoute allowedRole="user">
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Admin Protected Route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRole="admin">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Unknown URL */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;