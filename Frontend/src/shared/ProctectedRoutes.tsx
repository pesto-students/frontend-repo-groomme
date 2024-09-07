import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../widgets/Loader";
import { Box, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { openRouteConstants } from "../routes/routeConstants";
interface ProtectedRouteProps {
  Element: React.ComponentType;
  allowedRoles?: string;
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  Element,
  allowedRoles = [],
  redirectPath = openRouteConstants.home,
}) => {
  const { loggedIn, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <Loader />;
  }

  if (allowedRoles !== sessionStorage.getItem("userType")) {
    setTimeout(() => {
      navigate(-1);
    }, 2000);
    return (
      <Box
        sx={{
          color: "red",
          textAlign: "center",
          border: "1px solid red",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ErrorIcon /> <Typography variant="h1">Access Denied</Typography>
        <Typography variant="body1">
          You do not have permission to view this page.
        </Typography>
      </Box>
    );
  }

  return loggedIn ? <Element /> : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
