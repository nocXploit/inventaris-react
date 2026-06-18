import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
import DetailBarang from "./pages/DetailBarang.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Dashboard from "./pages/Dashboard.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "produk",
        element: <App />,
      },
      {
        path: "produk/:id",
        element: <DetailBarang />,
      },
    ],
  },
  {
    path: "*",
    element: <h2 style={{ padding: "20px" }}>⚠️ 404 - Page Not Found</h2>,
  },
]);
