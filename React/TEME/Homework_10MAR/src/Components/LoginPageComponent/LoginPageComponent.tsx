import React, { JSX, useState } from "react";
import { IResponseUser } from "../../Interfaces/AuthContextInterface";
import { useNavigate } from "react-router-dom";

interface ILoginPageComponentProps {
  login: (username: string, password: string) => IResponseUser;
}

const LoginPageComponent: React.FC<ILoginPageComponentProps> = (
  props
): JSX.Element => {
  const { login } = props;
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
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
          type="password"
          placeholder="password"
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          onClick={() => {
            const registerResponse: IResponseUser = login(username, password);
            if (registerResponse.success) {
              alert(registerResponse.message);
              navigate("/");
            } else {
              alert(registerResponse.message);
            }
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPageComponent;
