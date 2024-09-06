import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axiosInstance from "../../../config/axiosInstance";
import { authUrls } from "../../../urls/urls";

const ForgotPassword = ({
  setShowForgotPassword,
  isFromSignIn,
}: {
  setShowForgotPassword: Function;
  isFromSignIn: boolean;
}) => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(authUrls.ForgotPassword, {
        email,
      });
      setMessage(response.data.message);
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
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: isFromSignIn ? "#000" : "" }}
      >
        Forgot Password
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "300px",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: "20px" }}
        />{" "}
        <Button
          type="submit"
          variant="contained"
          sx={{ bgcolor: "#d4740f", width: "fit-content" }}
          fullWidth
        >
          Send Reset Link
        </Button>
      </form>{" "}
      {!isFromSignIn && (
        <Button
          onClick={() => setShowForgotPassword(false)}
          variant="text"
          sx={{
            color: "#d4740f",
            width: "fit-content",
            mt: 2,
            textTransform: "none",
          }}
        >
          Go Back
        </Button>
      )}
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

export default ForgotPassword;
