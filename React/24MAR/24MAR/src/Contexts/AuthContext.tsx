import React, { createContext, JSX, useContext, useState } from "react";
import { IUser } from "../interfaces/IUserInterface";
import {
  createUserWithEmailAndPassword,
  User,
  UserCredential,
} from "firebase/auth";
import { auth } from "../firebase";
import { jwtDecode } from "jwt-decode";

interface IAuthContext {
  user?: IUser;
  //   login: () => void;
  register: (
    email: string,
    password: string
  ) => Promise<UserCredential | undefined>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}): JSX.Element => {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const register = async (email: string, password: string) => {
    let data;
    try {
      data = await createUserWithEmailAndPassword(auth, email, password);
      console.log(data.user.accessToken);
      const decodedAccTK = jwtDecode(data.user.accessToken);
      console.log(decodedAccTK);
    } catch (error) {
      console.log(error);
    }
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("eroare");
  }
  return context;
};
