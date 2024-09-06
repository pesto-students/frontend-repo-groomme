import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../config/axiosInstance";
import { openRouteConstants } from "../../../routes/routeConstants";
import { authUrls } from "../../../urls/urls";

const ResetPassword: React.FC = () => {
  const { token } = useParams();

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axiosInstance.post(
        `${authUrls.ResetPassword}/${token}`,
        {
          password,
        }
      );
      setMessage(response.data.message);

      setTimeout(() => navigate(openRouteConstants.SignIn), 3000);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4">Reset Password</Typography>
      <form
        onSubmit={handleSubmit}
        style={{ width: "300px", marginTop: "20px" }}
      >
        <TextField
          label="New Password"
          type="password"
          variant="outlined"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Reset Password
        </Button>
      </form>
      {message && (
        <Typography
          variant="body1"
          style={{ marginTop: "20px", color: "green" }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default ResetPassword;
