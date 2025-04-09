import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { auth, db } from "../../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface ShowPasswords {
  old: boolean;
  new: boolean;
  secret: boolean;
}

const MyProfilePageComponent: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newSecretWord, setNewSecretWord] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showPasswords, setShowPasswords] = useState<ShowPasswords>({
    old: false,
    new: false,
    secret: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfile(data);
        }
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (!profile || !auth.currentUser) return;

    setSaving(true);
    setSuccess("");
    setError("");

    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user.email || "",
      oldPassword
    );

    try {
      await reauthenticateWithCredential(user, credential);

      const updates: any = {};

      if (newPassword.length >= 6) {
        await updatePassword(user, newPassword);
        updates.passwordChanged = true;
      }

      if (newSecretWord.length > 0) {
        updates.secretWord = btoa(newSecretWord);
      }

      if (Object.keys(updates).length > 0) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, updates);

        await addDoc(collection(db, "logs"), {
          userId: user.uid,
          modifiedBy: user.uid,
          action: "Profile updated",
          changes: Object.keys(updates),
          timestamp: serverTimestamp(),
        });
      }

      setSuccess("Changes saved. You will be logged out.");
      setTimeout(() => {
        auth.signOut();
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Error saving changes:", err);
      setError("Invalid current password or operation failed.");
    } finally {
      setSaving(false);
    }
  };

  const toggleVisibility = (field: keyof ShowPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ maxWidth: 600, mx: "auto", mt: 6, p: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        My Profile
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Email"
        value={profile.email}
        fullWidth
        disabled
        sx={{ mb: 2 }}
      />
      <TextField
        label="First Name"
        value={profile.firstName}
        fullWidth
        disabled
        sx={{ mb: 2 }}
      />
      <TextField
        label="Last Name"
        value={profile.lastName}
        fullWidth
        disabled
        sx={{ mb: 2 }}
      />
      <TextField
        label="Username"
        value={profile.username}
        fullWidth
        disabled
        sx={{ mb: 2 }}
      />
      <TextField
        label="Role"
        value={profile.role}
        fullWidth
        disabled
        sx={{ mb: 2 }}
      />
      <TextField
        label="Age"
        value={profile.age}
        fullWidth
        disabled
        sx={{ mb: 2 }}
      />

      <TextField
        label="Current Password"
        type={showPasswords.old ? "text" : "password"}
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => toggleVisibility("old")} edge="end">
                {showPasswords.old ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="New Password"
        type={showPasswords.new ? "text" : "password"}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        helperText="Password must be at least 6 characters"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => toggleVisibility("new")} edge="end">
                {showPasswords.new ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="New Secret Word"
        type={showPasswords.secret ? "text" : "password"}
        value={newSecretWord}
        onChange={(e) => setNewSecretWord(e.target.value.replace(/\s/g, ""))}
        fullWidth
        sx={{ mb: 3 }}
        helperText="Enter new secret word (no spaces)"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => toggleVisibility("secret")} edge="end">
                {showPasswords.secret ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? <CircularProgress size={24} /> : "Save Changes"}
      </Button>
    </Paper>
  );
};

export default MyProfilePageComponent;
