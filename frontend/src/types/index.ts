export interface Employee {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  age: number;
  salary: number;
  address: string;
  postName: string;
  department?: string;
  status?: "Active" | "Inactive" | "On Leave";
  joinDate?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "Admin" | "HR" | "Employee";
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface DashboardMetrics {
  totalEmployees: number;
  activeEmployees: number;
  departmentsCount: number;
  attendanceRate: number;
}
