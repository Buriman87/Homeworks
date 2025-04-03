import { JSX } from "@emotion/react/jsx-runtime";
import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  collection,
  CollectionReference,
  DocumentData,
  Firestore,
  getFirestore,
} from "firebase/firestore";

import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const SignInPageComponent: React.FC = (): JSX.Element => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const registerNewUser = async () => {
    try {
      const Variabila = await signInWithEmailAndPassword(auth, email, password);
      console.log(Variabila);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <TextField placeholder="Email" onChange={(e) => setEmail(e.target.value)}>
        Email
      </TextField>
      <TextField
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      >
        Password
      </TextField>
      <Button onClick={registerNewUser}>Register</Button>
    </>
  );
};
