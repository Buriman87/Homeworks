import { IUser } from "./UserInterface";

export interface IResponseUser {
  success: boolean;
  message: string;
}

export interface IAuthContext {
  user?: IUser;
  users: IUser[];
  register: (userData: IUser) => IResponseUser;
  login: (username: string, password: string) => IResponseUser;
  logout: () => void;
}
