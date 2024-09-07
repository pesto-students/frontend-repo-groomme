import { Box, IconButton } from "@mui/material";
import backgroundImage from "../../../assets/images/image.png";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import AccountTypeSelection from "./AccountTypeSelection";
import SignUpForm from "./SignUpForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { openRouteConstants } from "../../../routes/routeConstants";
import { SignUpFormValuesType } from "../../../types/authTypes";

function SignUp() {
  const componentType = ["selectAccType", "signUpForm"];
  const navigate = useNavigate();
  const [compToShow, setCompToShow] = useState(componentType[0]);

  const [signUpFormValues, setSignUpFormValues] =
    useState<SignUpFormValuesType>({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
      userType: "",
    });

  function setUserTypeFormvalue(val: string) {
    setSignUpFormValues({
      ...signUpFormValues,
      userType: val,
    });
    setCompToShow(componentType[1]);
  }
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
        {compToShow === componentType[0] && (
          <AccountTypeSelection setUserTypeFormvalue={setUserTypeFormvalue} />
        )}
        {compToShow === componentType[1] && (
          <SignUpForm
            signUpFormValues={signUpFormValues}
            setSignUpFormValues={setSignUpFormValues}
          />
        )}
      </Box>
    </Box>
  );
}

export default SignUp;
