import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AdminDashboard } from "@/pages/dashboard/AdminDashboard";
import { EmployeeList } from "@/pages/employees/EmployeeList";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route element={<DashboardLayout />}>
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
