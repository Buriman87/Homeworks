import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

const LoginPageComponent: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "", // identifier: email / username / phone
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Forgot password dialog state
  const [forgotOpen, setForgotOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [secretWordInput, setSecretWordInput] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const usersRef = collection(db, "users");
      const identifier = formData.email.trim();

      const q1 = query(usersRef, where("email", "==", identifier));
      const q2 = query(usersRef, where("username", "==", identifier));
      const q3 = query(usersRef, where("phoneNumber", "==", identifier));

      const [snap1, snap2, snap3] = await Promise.all([
        getDocs(q1),
        getDocs(q2),
        getDocs(q3),
      ]);

      const userDoc = snap1.docs[0] || snap2.docs[0] || snap3.docs[0];

      if (!userDoc) throw new Error();

      const userData = userDoc.data();
      if (!userData.isActive) throw new Error();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        userData.email,
        formData.password
      );

      await updateDoc(doc(db, "users", userCredential.user.uid), {
        lastLoginAt: Date.now(),
      });

      navigate("/");
    } catch {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setResetMessage("");

    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", resetEmail.trim())
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setResetMessage("No user found with this email.");
        return;
      }

      const userDoc = snapshot.docs[0];
      const userData = userDoc.data();

      if (userData.secretWord !== btoa(secretWordInput)) {
        setResetMessage("Secret word does not match.");
        return;
      }

      await updateDoc(doc(db, "users", userDoc.id), {
        isActive: false,
      });

      setForgotOpen(false);
      setConfirmOpen(false);
      navigate("/register");
    } catch (err: any) {
      setResetMessage("Error: " + err.message);
    }
  };

  return (
    <>
      <Paper elevation={3} sx={{ maxWidth: 400, mx: "auto", mt: 6, p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>

        {error && (
          <Box mb={2}>
            <Alert severity="error" onClose={() => setError("")}>
              {error}
            </Alert>
          </Box>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ "& .MuiTextField-root": { m: 1, width: "100%" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            label="Email / Username / Phone"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            required
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box mt={2} textAlign="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            <Button
              variant="text"
              color="secondary"
              sx={{ mt: 1 }}
              onClick={() => {
                setResetMessage("");
                setResetEmail("");
                setSecretWordInput("");
                setForgotOpen(true);
              }}
            >
              Forgot Password?
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* 🔐 Forgot Password Dialog */}
      <Dialog
        open={forgotOpen}
        onClose={() => setForgotOpen(false)}
        aria-labelledby="forgot-password-dialog-title"
      >
        <DialogTitle id="forgot-password-dialog-title">
          Reset Account
        </DialogTitle>

        <DialogContent>
          <TextField
            label="Email"
            fullWidth
            margin="dense"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
          <TextField
            label="Secret Word"
            fullWidth
            margin="dense"
            value={secretWordInput}
            onChange={(e) =>
              setSecretWordInput(e.target.value.replace(/\s/g, ""))
            }
            helperText="This will deactivate your account"
          />
          {resetMessage && (
            <Typography
              variant="body2"
              sx={{ mt: 1 }}
              color={
                resetMessage.toLowerCase().includes("error")
                  ? "error"
                  : "success.main"
              }
            >
              {resetMessage}
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setForgotOpen(false)}>Cancel</Button>
          <Button onClick={() => setConfirmOpen(true)} color="error">
            Deactivate & Reset
          </Button>
        </DialogActions>
      </Dialog>

      {/* ⚠️ Confirmation Dialog */}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        aria-labelledby="confirm-deactivate-title"
      >
        <DialogTitle id="confirm-deactivate-title">Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>
            This will deactivate your account. You’ll need to register again to
            regain access.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handlePasswordReset} color="error">
            Yes, Deactivate
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoginPageComponent;
