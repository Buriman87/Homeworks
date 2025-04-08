import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  LinearProgress,
  InputAdornment,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, InfoOutlined } from "@mui/icons-material";

const getPasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 6) strength += 25;
  if (/[A-Z]/.test(password)) strength += 25;
  if (/\d/.test(password)) strength += 25;
  if (/[^A-Za-z0-9]/.test(password)) strength += 25;
  return strength;
};

const RegisterPageComponent: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    age: "",
    secretWord: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordStrength = getPasswordStrength(formData.password);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    if (name === "secretWord") value = value.replace(/\s/g, ""); // remove spaces
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validate = () => {
    const { email, password, firstName, lastName, age, secretWord } = formData;

    if (!email.includes("@")) return "Invalid email.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (firstName.trim().length < 2)
      return "First name must be at least 2 non-space characters.";
    if (lastName.trim().length < 2)
      return "Last name must be at least 2 non-space characters.";
    if (/\s/.test(secretWord)) return "Secret word must not contain spaces.";
    if (secretWord.length < 1) return "Secret word is required.";

    const ageNum = Number(age);
    if (isNaN(ageNum) || ageNum < 6 || ageNum > 130)
      return "Age must be between 6 and 130.";

    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const errorMsg = validate();
    if (errorMsg) {
      setError(errorMsg);
      setLoading(false);
      return;
    }

    try {
      const usersRef = collection(db, "users");

      // Check for duplicates unless user is inactive
      const emailQuery = query(
        usersRef,
        where("email", "==", formData.email.trim())
      );
      const emailSnap = await getDocs(emailQuery);
      if (!emailSnap.empty && emailSnap.docs[0].data().isActive !== false) {
        setError("This email is already in use.");
        setLoading(false);
        return;
      }

      const usernameQuery = query(
        usersRef,
        where("username", "==", formData.username.trim())
      );
      const usernameSnap = await getDocs(usernameQuery);
      if (
        !usernameSnap.empty &&
        usernameSnap.docs[0].data().isActive !== false
      ) {
        setError("Username is already taken.");
        setLoading(false);
        return;
      }

      const phoneQuery = query(
        usersRef,
        where("phoneNumber", "==", formData.phoneNumber.trim())
      );
      const phoneSnap = await getDocs(phoneQuery);
      if (!phoneSnap.empty && phoneSnap.docs[0].data().isActive !== false) {
        setError("Phone number is already registered.");
        setLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      const allUsersSnapshot = await getDocs(usersRef);
      const isFirstUser = allUsersSnapshot.empty;
      const role = isFirstUser ? "owner" : "user";

      await setDoc(doc(db, "users", user.uid), {
        email: formData.email.trim(),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        username: formData.username.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        age: Number(formData.age),
        secretWord: btoa(formData.secretWord),
        role,
        createdAt: Date.now(),
        lastLoginAt: Date.now(),
        isActive: true,
        forcePasswordChange: false,
        currentShift: "",
      });

      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 400, mx: "auto", mt: 6, p: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Register
      </Typography>

      {error && (
        <Typography color="error" align="center" mb={2}>
          {error}
        </Typography>
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
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <Tooltip
          title={
            <Box sx={{ p: 1 }}>
              <Typography fontSize="small">Password should include:</Typography>
              <ul style={{ paddingLeft: "1.2em", margin: 0 }}>
                <li>At least 6 characters</li>
                <li>1 uppercase letter</li>
                <li>1 number</li>
                <li>1 special character</li>
              </ul>
            </Box>
          }
          arrow
          placement="right"
        >
          <TextField
            required
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={formData.password.length > 0 && formData.password.length < 6}
            helperText={
              formData.password.length > 0 && formData.password.length < 6
                ? "Password must be at least 6 characters"
                : "Use a strong password"
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              startAdornment: (
                <InputAdornment position="start">
                  <InfoOutlined color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </Tooltip>

        {formData.password && (
          <Box mx={1} mt={-1} mb={2}>
            <LinearProgress
              variant="determinate"
              value={passwordStrength}
              sx={{
                height: 8,
                borderRadius: 5,
                backgroundColor: "#eee",
                "& .MuiLinearProgress-bar": {
                  backgroundColor:
                    passwordStrength < 50
                      ? "#d32f2f"
                      : passwordStrength < 75
                      ? "#f9a825"
                      : "#2e7d32",
                },
              }}
            />
            <Typography variant="caption" color="textSecondary">
              Password Strength: {passwordStrength}%
            </Typography>
          </Box>
        )}

        <TextField
          required
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          required
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextField
          required
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          required
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <TextField
          required
          label="Age"
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        <TextField
          required
          label="Secret Word"
          name="secretWord"
          value={formData.secretWord}
          onChange={handleChange}
          helperText="No spaces allowed"
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
            {loading ? "Registering..." : "Register"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default RegisterPageComponent;
