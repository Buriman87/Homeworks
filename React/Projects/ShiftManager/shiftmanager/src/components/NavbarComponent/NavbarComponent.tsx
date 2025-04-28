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
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Inbox as InboxIcon,
  Mail as MailIcon,
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
import { AnimatePresence, motion } from "framer-motion";

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

          <ListItemButton onClick={() => setOpenShifts(!openShifts)}>
            <ListItemIcon>
              <Assignment />
            </ListItemIcon>
            <ListItemText primary="Shifts" />
            {openShifts ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <AnimatePresence initial={false}>
            {openShifts && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    selected={location.pathname === "/shifts"}
                    onClick={() => handleNavigate("/shifts")}
                  >
                    <ListItemIcon>
                      <Assignment />
                    </ListItemIcon>
                    <ListItemText primary="View Shifts" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    selected={location.pathname === "/addnewshift"}
                    onClick={() => handleNavigate("/addnewshift")}
                  >
                    <ListItemIcon>
                      <Add />
                    </ListItemIcon>
                    <ListItemText primary="Add Shift" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    selected={location.pathname === "/manageshifts"}
                    onClick={() => handleNavigate("/manageshifts")}
                  >
                    <ListItemIcon>
                      <ManageAccounts />
                    </ListItemIcon>
                    <ListItemText primary="Manage Shifts" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    selected={location.pathname === "/my-shift"}
                    onClick={() => handleNavigate("/my-shift")}
                  >
                    <ListItemIcon>
                      <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary="My Shifts" />
                  </ListItemButton>
                </List>
              </motion.div>
            )}
          </AnimatePresence>

          <ListItemButton onClick={() => setOpenUsers(!openUsers)}>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Users" />
            {openUsers ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <AnimatePresence initial={false}>
            {openUsers && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
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
              </motion.div>
            )}
          </AnimatePresence>

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
