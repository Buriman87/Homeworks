import React, { JSX, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button, TextField } from "@mui/material";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const LoginPageComponent: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<{ [key: string]: string }>({
    email: "",
    password: "",
  });
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TextField
        id="filled-basic"
        name="email"
        type="email"
        label="Email"
        variant="filled"
        onChange={handleInput}
      />
      <TextField
        id="filled-basic"
        name="password"
        type="password"
        label="Password"
        variant="filled"
        onChange={handleInput}
      />
      <br />
      <Button onClick={login}>Login</Button>
    </>
  );
};

export default LoginPageComponent;
