export interface IUser {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  role: string;
  secretWord: string;
  createdAt?: number;
  lastLoginAt?: number;
  id?: string;
  isActive?: boolean;
  forcePasswordChange?: boolean;
  currentShift?: string;
  phoneNumber: number;
}
