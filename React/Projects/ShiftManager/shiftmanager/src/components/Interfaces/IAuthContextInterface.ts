import { User } from "firebase/auth";
import { IUser } from "./IUserInterface";

export interface IAuthContext {
  user: User | null;
  users?: IUser[];
  isLoading: boolean;
}
