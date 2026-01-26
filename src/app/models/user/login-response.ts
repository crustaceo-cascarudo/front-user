export interface LoginResponse {
  token: string;
  userResponse: {
    id: number;
    email: string;
  }
}
