import {
  Box,
  Button,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import GroommeIcon from "../../../assets/icons/common/GroommeIcon";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { SignInFormValuesType } from "../../../types/authTypes";
import {
  customerRouteConstants,
  openRouteConstants,
  salonRouteConstants,
} from "../../../routes/routeConstants";
import { signInService } from "../../../services/authentication";
import ForgotPassword from "../ForgotPassword/ForgotPassword";

function SignInForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [signInFormValues, setSignInFormValues] =
    useState<SignInFormValuesType>({
      email: "",
      password: "",
    });
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setSignInFormValues({
      ...signInFormValues,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!signInFormValues.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(signInFormValues.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!signInFormValues.password) {
      newErrors.password = "Password is required";
    } else if (signInFormValues.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    return newErrors;
  };

  function handleSuccessSignIn(userType: string) {
    if (userType === "salon") {
      navigate(salonRouteConstants.manageSalon);
    }
    if (userType === "customer") {
      navigate(customerRouteConstants.salonList);
    }
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await signInService(signInFormValues, handleSuccessSignIn);
  };
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  return showForgotPassword ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "auto",
        backgroundColor: "white",
        padding: 3,
        borderRadius: 5,
        boxShadow: 1,
        alignItems: "center",
      }}
    >
      <ForgotPassword
        setShowForgotPassword={setShowForgotPassword}
        isFromSignIn={true}
      />
    </Box>
  ) : (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "auto",
        backgroundColor: "white",
        padding: 3,
        borderRadius: 5,
        boxShadow: 1,
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          mb: 2,
          display: "flex",

          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Divider sx={{ width: "40%", backgroundColor: "#000", height: 1 }} />

        <Box sx={{ width: "10%" }}>
          <GroommeIcon />
        </Box>
        <Divider sx={{ width: "40%", backgroundColor: "#000", height: 1 }} />
      </Box>
      <Box
        sx={{
          border: "1px solid #B5B5B5",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
          p: 4,
          borderRadius: 5,
        }}
      >
        <Typography variant="h4" sx={{ color: "#000" }}>
          Sign In
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email Address"
              name="email"
              value={signInFormValues.email}
              onChange={handleInputChange}
              type="email"
              fullWidth
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Your Password"
              name="password"
              value={signInFormValues.password}
              onChange={handleInputChange}
              type={showPassword ? "text" : "password"}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
            <Button
              onClick={() => setShowForgotPassword(true)}
              variant="text"
              sx={{ color: "#d4740f", width: "fit-content" }}
            >
              Forgot Password
            </Button>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {" "}
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#D4740F",
                borderRadius: 40,
                width: "70%",
              }}
              size="large"
            >
              Log In
            </Button>
            <FormHelperText>
              <Typography sx={{ textAlign: "center" }}>
                By continuing, you agree to the{"  "}
                <Link
                  to="https://example.com/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "underline", color: "#000" }}
                >
                  Terms of use{"  "}
                </Link>
                and{"  "}
                <Link
                  to="https://example.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "underline", color: "#000" }}
                >
                  Privacy Policy
                </Link>
                .
              </Typography>
            </FormHelperText>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 4,
              flexDirection: {
                xs: "column",
                sm: "row",
              },
            }}
          >
            <Link
              to="https://example.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline", color: "#000" }}
            >
              Other issues with sign in
            </Link>{" "}
            <Link
              to="https://example.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline", color: "#000" }}
            >
              Forgot Password
            </Link>
          </Grid>
        </Grid>
      </Box>

      <Grid
        item
        xs={12}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Divider sx={{ width: "30%", backgroundColor: "#000", height: 1 }} />

          <Box>
            <Typography
              sx={{ color: "#000000", fontWeight: "bold", fontStyle: "italic" }}
              variant="body1"
            >
              New to your community
            </Typography>
          </Box>
          <Divider sx={{ width: "30%", backgroundColor: "#000", height: 1 }} />
        </Box>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#D4740F",
            borderRadius: 40,
            width: "70%",
          }}
          size="large"
          onClick={() => {
            navigate(openRouteConstants.SignUp);
          }}
        >
          Create an account
        </Button>
      </Grid>
    </Box>
  );
}

export default SignInForm;
