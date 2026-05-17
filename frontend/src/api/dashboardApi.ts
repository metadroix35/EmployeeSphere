import axiosClient from "./axiosClient";

export interface DashboardMetrics {
  totalEmployees: number;
  activeEmployees: number;
  totalDepartments: number;
  attendanceRate: number;
  employeeGrowth: { name: string; employees: number }[];
  departmentDistribution: { name: string; count: number }[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const dashboardApi = {
  getMetrics: () =>
    axiosClient.get<ApiResponse<DashboardMetrics>>("/dashboard/metrics"),
};
