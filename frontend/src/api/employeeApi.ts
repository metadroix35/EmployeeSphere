import axiosClient from "./axiosClient";

export interface EmployeeRequest {
  firstName: string;
  middleName?: string;
  lastName: string;
  age: number;
  salary: number;
  address?: string;
  postName: string;
  departmentId?: number;
  status: string;
  joinDate?: string;
}

export interface EmployeeResponse {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  age: number;
  salary: number;
  address?: string;
  postName: string;
  departmentName?: string;
  departmentId?: number;
  status: string;
  joinDate: string;
}

export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const employeeApi = {
  getAll: (params?: { search?: string; page?: number; size?: number; sortBy?: string; sortDir?: string }) =>
    axiosClient.get<ApiResponse<PagedResponse<EmployeeResponse>>>("/employees", { params }),

  getById: (id: number) =>
    axiosClient.get<ApiResponse<EmployeeResponse>>(`/employees/${id}`),

  create: (data: EmployeeRequest) =>
    axiosClient.post<ApiResponse<EmployeeResponse>>("/employees", data),

  update: (id: number, data: EmployeeRequest) =>
    axiosClient.put<ApiResponse<EmployeeResponse>>(`/employees/${id}`, data),

  delete: (id: number) =>
    axiosClient.delete<ApiResponse<void>>(`/employees/${id}`),
};
