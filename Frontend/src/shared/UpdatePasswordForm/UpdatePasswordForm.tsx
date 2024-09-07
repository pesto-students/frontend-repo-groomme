import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import { updatePasswordService } from "../../services/authentication";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import ForgotPassword from "../../Components/Auth/ForgotPassword/ForgotPassword";

const UpdatePasswordForm: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleUpdatePassword = async () => {
    if (newPassword === "" || confirmNewPassword === "" || newPassword === "") {
      setError("Fields cannot be empty");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match");
      return;
    }

    const isSuccess = await updatePasswordService({
      currentPassword,
      newPassword,
    });
    if (isSuccess) {
      setError(null);
      setSuccess(null);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "30%",
        margin: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        alignItems: "center",
      }}
    >
      {showForgotPassword ? (
        <ForgotPassword
          setShowForgotPassword={setShowForgotPassword}
          isFromSignIn={false}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Update Password
          </Typography>
          <TextField
            label="Current Password"
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
              if (e.target.value !== "") {
                setError(null);
              }
            }}
            fullWidth
            margin="normal"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={currentPassword === "" && Boolean(error)}
          />
          <TextField
            label="New Password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              if (e.target.value !== "") {
                setError(null);
              }
            }}
            fullWidth
            margin="normal"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={newPassword === "" && Boolean(error)}
          />
          <TextField
            label="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => {
              setConfirmNewPassword(e.target.value);
              if (e.target.value !== "") {
                setError(null);
              }
            }}
            fullWidth
            margin="normal"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={confirmNewPassword === "" && Boolean(error)}
          />{" "}
          <Button
            onClick={() => setShowForgotPassword(true)}
            variant="text"
            sx={{ color: "#d4740f", width: "fit-content" }}
          >
            Forgot Password
          </Button>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="primary" sx={{ mt: 2 }}>
              {success}
            </Typography>
          )}
          <Box sx={{ mt: 2, position: "relative" }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleUpdatePassword}
              sx={{ bgcolor: "#d4740f", width: "fit-content" }}
            >
              Update Password
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UpdatePasswordForm;
