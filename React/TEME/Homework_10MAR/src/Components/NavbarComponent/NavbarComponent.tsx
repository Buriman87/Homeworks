import React, { JSX } from "react";
import { Link } from "react-router-dom";

import { IUser } from "../../Interfaces/UserInterface";

interface INavbarComponentProps {
  user?: IUser;
  logout: () => void;
}

const NavbarComponent: React.FC<INavbarComponentProps> = (
  props
): JSX.Element => {
  const { user, logout } = props;
  return (
    <nav>
      <Link to="/">Home</Link>
      {user ? (
        <div>
          <Link to={`/dashboard/${user.id}`}>Dashboard</Link>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default NavbarComponent;
