export namespace AuthDTOs {
  export interface AuthResponse {
    token: string;
    type: string;
    id: number;
    name: string;
    email: string;
    role: string;
  }
}
