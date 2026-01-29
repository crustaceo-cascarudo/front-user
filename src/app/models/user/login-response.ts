import { userRole } from "../../core/enum/user-role";

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: userRole
  }
}
