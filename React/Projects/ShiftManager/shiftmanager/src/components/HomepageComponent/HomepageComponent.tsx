import React from "react";
import NavbarComponent from "../NavbarComponent/NavbarComponent";

interface IHomepageComponentProps {
  logout: () => Promise<void>;
}
const HomepageComponent: React.FC<IHomepageComponentProps> = ({ logout }) => {
  return (
    <div>
      <NavbarComponent logout={logout} />
    </div>
  );
};

export default HomepageComponent;
