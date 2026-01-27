import { userRole } from "../../core/enum/user-role";

export interface UserRegister {
  name: string;
  email: string;
  password: string;
  role: userRole;
}
