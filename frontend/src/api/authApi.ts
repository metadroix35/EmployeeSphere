import axiosClient from "./axiosClient";
import { AuthDTOs } from "@/types/api";

export const authApi = {
  login: (data: { email: string; password: string }) =>
    axiosClient.post<{ success: boolean; data: AuthDTOs.AuthResponse }>("/auth/login", data),

  register: (data: { name: string; email: string; password: string; role?: string }) =>
    axiosClient.post<{ success: boolean; data: AuthDTOs.AuthResponse }>("/auth/register", data),
};
