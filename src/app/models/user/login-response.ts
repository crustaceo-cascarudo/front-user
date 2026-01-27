export interface LoginResponse {
  token: string;
  userResponse: {
    id: number;
    name: string;
    email: string;
  }
}
