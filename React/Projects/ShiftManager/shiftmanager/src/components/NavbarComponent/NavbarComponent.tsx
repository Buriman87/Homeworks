import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import styles from "./NavbarComponent.module.css";

const NavbarComponent: React.FC = () => {
  const pathToLogo = "./src/assets/react.svg";
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => setOpen(false);
  return (
    //   <div className="Navbar">
    //     <div className="Logo">
    //       <img className="LogoImg" src={pathToLogo} />
    //     </div>

    //   </div>
    <div className={styles.NavBarContainer}>
      <div className="Logo">
        <img className="LogoImg" src={pathToLogo} />
      </div>
      <Button onClick={() => setOpen(true)}>Hello Username</Button>
      <Drawer anchor={"right"} open={open} onClose={handleClose}>
        <List>
          {[
            "My Shift Page",
            "Add Shift Page",
            "My Profile",
            "Users",
            "Log Out",
          ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default NavbarComponent;
