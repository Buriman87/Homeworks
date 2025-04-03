import { doc, setDoc } from "firebase/firestore";
import React, { JSX, useState } from "react";
import { db } from "../firebase";
import { UserCredential } from "firebase/auth";

interface IRegisterPageComponentProps {
  register: (
    email: string,
    password: string
  ) => Promise<UserCredential | undefined>;
}
const RegisterPageComponent: React.FC<IRegisterPageComponentProps> = (
  props
): JSX.Element => {
  const { register } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  return (
    <div>
      <input
        type="text"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="LastName"
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="text"
        placeholder="FirstName"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <button
        onClick={async () => {
          const data = await register(email, password);
          await setDoc(doc(db, "users", data!.user.uid), {
            username: username,
            email: email,
            lastName: lastName,
            firstName: firstName,
            id: data?.user.uid,
          });
        }}
      >
        Register
      </button>
    </div>
  );
};

export default RegisterPageComponent;
