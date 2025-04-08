// components/Layout/ProtectedLayout.tsx
import React from "react";
import NavbarComponent from "../components/NavbarComponent/NavbarComponent";


interface ProtectedLayoutProps {
  children: React.ReactNode;
  logout: () => Promise<void>;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({
  children,
  logout,
}) => {
  return (
    <>
      <NavbarComponent logout={logout} />
      <main
        style={{ paddingTop: "80px", maxWidth: "1200px", margin: "0 auto" }}
      >
        {children}
      </main>
    </>
  );
};

export default ProtectedLayout;
