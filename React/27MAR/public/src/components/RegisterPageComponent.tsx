import { Button, TextField } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { JSX, useState } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { IUser } from "../Interfaces/Interfaces";

const RegisterPageComponent: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState<{ [key: string]: string }>({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const register = async () => {
    try {
      const data = await createUserWithEmailAndPassword(
        auth,
        registerData.email,
        registerData.password
      );
      const newUser: IUser = {
        email: registerData.email,
        firstName: registerData.firstname,
        lastName: registerData.lastname,
      };
      await setDoc(doc(db, "Users", data.user.uid), newUser);
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
      <TextField
        id="filled-basic"
        name="lastname"
        type="text"
        label="LastName"
        variant="filled"
        onChange={handleInput}
      />
      <TextField
        id="filled-basic"
        name="firstname"
        type="text"
        label="FirstName"
        variant="filled"
        onChange={handleInput}
      />
      <br></br>
      <Button onClick={register}>Register</Button>
    </>
  );
};

export default RegisterPageComponent;
