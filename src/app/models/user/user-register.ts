import { userRole } from "../../core/enum/user-role";

export interface UserRegister {
  email: string;
  password: string;
  role: userRole;
}
