import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  IAuthContext,
  IResponseUser,
} from "../Interfaces/AuthContextInterface";
import { IUser } from "../Interfaces/UserInterface";

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loggedUser, setLoggedUser] = useState<IUser | undefined>(undefined);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    const usersArray = storedUsers ? JSON.parse(storedUsers) : [];
    setUsers(usersArray);

    const storedUser = localStorage.getItem("loggedUser");
    const userLoggedIn = storedUser ? JSON.parse(storedUser) : undefined;
    setLoggedUser(userLoggedIn);
  }, []);

  const register = (userData: IUser): IResponseUser => {
    const existingUser = users.find(
      (user) => user.username === userData.username
    );
    if (existingUser) {
      return { success: false, message: "User already exist" };
    }

    const newUser: IUser = {
      ...userData,
      id: uuidv4(),
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setLoggedUser(newUser);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("loggedUser", JSON.stringify(newUser));
    return { success: true, message: "Register succesfully" };
  };

  const login = (username: string, password: string) => {
    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );
    if (!foundUser) {
      return { success: false, message: "Username or password are invalid" };
    }
    localStorage.setItem("loggedUser", JSON.stringify(foundUser));
    setLoggedUser(foundUser);
    return { success: true, message: "Logged in" };
  };

  const logout = () => {
    localStorage.removeItem("loggedUser");
    setLoggedUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ user: loggedUser, users, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("use auth must be used within an AuthProvider");
  }
  return context;
};
