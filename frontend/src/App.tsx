import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { AuthLayout } from "@/layouts/AuthLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Login } from "@/pages/auth/Login";
import { AdminDashboard } from "@/pages/dashboard/AdminDashboard";
import { EmployeeList } from "@/pages/employees/EmployeeList";
import { ThemeProvider } from "@/components/ThemeProvider";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          {/* Add Register / Forgot Password later */}
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
          {/* Placeholders for other modules */}
          <Route path="/departments" element={<div className="p-8 text-xl font-semibold">Departments Module (Coming Soon)</div>} />
          <Route path="/attendance" element={<div className="p-8 text-xl font-semibold">Attendance Module (Coming Soon)</div>} />
          <Route path="/payroll" element={<div className="p-8 text-xl font-semibold">Payroll Module (Coming Soon)</div>} />
          <Route path="/settings" element={<div className="p-8 text-xl font-semibold">Settings (Coming Soon)</div>} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </ThemeProvider>
  );
}
