import { Box, IconButton } from "@mui/material";
import backgroundImage from "../../../assets/images/image.png";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import { useNavigate } from "react-router-dom";
import { openRouteConstants } from "../../../routes/routeConstants";
import SignInForm from "./SignInForm";

function SignIn() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: {
          xs: "100%",
          sm: "100%",
          md: "100vh",
          lg: "100vh",
        },
        width: "100%",
      }}
    >
      <IconButton
        onClick={() => {
          navigate(openRouteConstants.home);
        }}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 2,
          color: "#FFF",
          borderColor: "#FFF",
        }}
      >
        <HighlightOffSharpIcon />
      </IconButton>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <SignInForm />
      </Box>
    </Box>
  );
}

export default SignIn;
