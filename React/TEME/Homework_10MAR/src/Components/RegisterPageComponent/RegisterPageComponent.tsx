import React, { JSX, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { IUser } from "../../Interfaces/UserInterface";
import { IResponseUser } from "../../Interfaces/AuthContextInterface";
import { useNavigate } from "react-router-dom";

interface IRegisterPageComponentProps {
  register: (user: IUser) => IResponseUser;
}

const RegisterPageComponent: React.FC<IRegisterPageComponentProps> = (
  props
): JSX.Element => {
  const { register } = props;
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const newUser: IUser = {
    id: uuidv4(),
    username: username,
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: password,
  };
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Username"
          required
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="First Name"
          required
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Last Name"
          required
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          onClick={() => {
            const registerResponse: IResponseUser = register(newUser);
            if (registerResponse.success) {
              alert(registerResponse.message);
              navigate("/");
            } else {
              alert(registerResponse.message);
            }
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterPageComponent;
