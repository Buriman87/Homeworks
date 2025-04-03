export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  role: string;
  secretWord: string;
  createdAt?: number;
  lastLoginAt?: number;
  id?: string;
}
