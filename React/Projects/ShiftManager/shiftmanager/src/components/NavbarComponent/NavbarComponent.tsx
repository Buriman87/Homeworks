import React, { useEffect, useState } from "react";
import {
  Drawer,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Avatar,
  Collapse,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Logout as LogoutIcon,
  AccountCircle,
  People,
  Assignment,
  Add,
  ManageAccounts,
  History,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./NavbarComponent.module.scss";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import logo from "../../assets/react.svg";

interface INavbarComponentProps {
  logout: () => Promise<void>;
}

const NavbarComponent: React.FC<INavbarComponentProps> = ({ logout }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [username, setUsername] = useState("");
  const [loadingUsername, setLoadingUsername] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [openShifts, setOpenShifts] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => setOpenDrawer(false);

  useEffect(() => {
    const fetchUsername = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUsername(userData.username || "");
          }
        } catch (err) {
          console.error("Failed to fetch username:", err);
        }
      }
      setLoadingUsername(false);
    };

    fetchUsername();
  }, []);

  const handleNavigate = (path: string) => {
    handleClose();
    navigate(path);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className={styles.NavBarContainer}>
      <div className={styles.Logo}>
        <img
          className={styles.LogoImg}
          src={logo}
          alt="Logo"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
      </div>

      <Button onClick={() => setOpenDrawer(true)} className={styles.UserButton}>
        {loadingUsername ? (
          <CircularProgress size={18} />
        ) : (
          <>
            <Avatar sx={{ width: 30, height: 30 }}>
              {username.charAt(0).toUpperCase()}
            </Avatar>
            Hello {username}
          </>
        )}
      </Button>

      <Drawer anchor="right" open={openDrawer} onClose={handleClose}>
        <List sx={{ width: 280 }}>
          {/* Profile */}
          <ListItem disablePadding>
            <ListItemButton
              selected={location.pathname.includes("/myprofile")}
              onClick={() => handleNavigate(`/myprofile/${username}`)}
            >
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItemButton>
          </ListItem>

          {/* Shifts */}
          <ListItemButton onClick={() => setOpenShifts(!openShifts)}>
            <ListItemIcon>
              <Assignment />
            </ListItemIcon>
            <ListItemText primary="Shifts" />
            {openShifts ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openShifts} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                selected={location.pathname === "/shifts"}
                onClick={() => handleNavigate("/shifts")}
              >
                <ListItemText primary="View Shifts" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                selected={location.pathname === "/addnewshift"}
                onClick={() => handleNavigate("/addnewshift")}
              >
                <ListItemText primary="Add Shift" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                selected={location.pathname === "/manageshifts"}
                onClick={() => handleNavigate("/manageshifts")}
              >
                <ListItemText primary="Manage Shifts" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Users */}
          <ListItemButton onClick={() => setOpenUsers(!openUsers)}>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Users" />
            {openUsers ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openUsers} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                selected={location.pathname === "/users"}
                onClick={() => handleNavigate("/users")}
              >
                <ListItemIcon>
                  <People />
                </ListItemIcon>
                <ListItemText primary="View Users" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                selected={location.pathname === "/adduser"}
                onClick={() => handleNavigate("/adduser")}
              >
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Add User" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                selected={location.pathname === "/viewlogs"}
                onClick={() => handleNavigate("/viewlogs")}
              >
                <ListItemIcon>
                  <History />
                </ListItemIcon>
                <ListItemText primary="View Logs" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Logout */}
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout} disabled={loggingOut}>
              <ListItemIcon>
                {loggingOut ? <CircularProgress size={20} /> : <LogoutIcon />}
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default NavbarComponent;
