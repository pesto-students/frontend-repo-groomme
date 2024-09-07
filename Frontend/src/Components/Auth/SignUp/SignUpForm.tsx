import { useState, ChangeEvent, FormEvent } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Typography,
  Box,
  Avatar,
  FormHelperText,
  Grid,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { openRouteConstants } from "../../../routes/routeConstants";
import ProprietorIcon from "../../../assets/icons/SignUp/ProprietorIcon";
import CustomerIcon from "../../../assets/icons/SignUp/CustomerIcon";
import { SignUpFormValuesType } from "../../../types/authTypes";
import { signUpService } from "../../../services/authentication";

const SignUpForm = ({
  signUpFormValues,
  setSignUpFormValues,
}: {
  signUpFormValues: SignUpFormValuesType;
  setSignUpFormValues: Function;
}) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setSignUpFormValues({
      ...signUpFormValues,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!signUpFormValues.firstname.trim()) {
      newErrors.firstname = "First name is required";
    }

    // Validate last name
    if (!signUpFormValues.lastname.trim()) {
      newErrors.lastname = "Last name is required";
    }

    // Validate email
    if (!signUpFormValues.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(signUpFormValues.email)) {
      newErrors.email = "Email is invalid";
    }

    // Validate password
    if (!signUpFormValues.password) {
      newErrors.password = "Password is required";
    } else if (signUpFormValues.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!signUpFormValues.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    }
    // Validate confirm password
    if (signUpFormValues.password !== signUpFormValues.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match!";
    }

    // Validate terms acceptance
    if (!signUpFormValues.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms and conditions.";
    }

    return newErrors;
  };

  function handleSuccessSignUp() {
    setSignUpFormValues({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
      userType: "",
    });
    navigate(openRouteConstants.SignIn);
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    await signUpService(signUpFormValues, handleSuccessSignUp);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 600,
        margin: "auto",
        backgroundColor: "white",
        padding: 3,
        borderRadius: 5,
        boxShadow: 1,
        alignItems: "center",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Avatar sx={{ bgcolor: "primary.main", margin: "auto" }}>
          {signUpFormValues.userType === "salon" ? (
            <ProprietorIcon />
          ) : (
            <CustomerIcon />
          )}
        </Avatar>
        <Typography variant="h4" sx={{ color: "#000" }}>
          Create an Account
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            name="firstname"
            value={signUpFormValues.firstname}
            onChange={handleInputChange}
            fullWidth
            error={Boolean(errors.firstname)}
            helperText={errors.firstname}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            name="lastname"
            value={signUpFormValues.lastname}
            onChange={handleInputChange}
            fullWidth
            error={Boolean(errors.lastname)}
            helperText={errors.lastname}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Email"
            name="email"
            value={signUpFormValues.email}
            onChange={handleInputChange}
            type="email"
            fullWidth
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Password"
            name="password"
            value={signUpFormValues.password}
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
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            value={signUpFormValues.confirmPassword}
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
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
          />
        </Grid>
        <Grid item xs={12}>
          <FormHelperText>
            Use 8 or more characters with a mix of letters, numbers & symbols
          </FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            sx={{ color: "#000" }}
            control={
              <Checkbox
                name="termsAccepted"
                checked={signUpFormValues.termsAccepted}
                onChange={handleInputChange}
              />
            }
            label={
              <Typography>
                By creating an account, I agree to our{" "}
                <Link
                  to={`${window.location.origin}${openRouteConstants.termsAndConditions}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "underline", color: "#000" }}
                >
                  Terms of use
                </Link>{" "}
                and{" "}
                <Link
                  to={`${window.location.origin}${openRouteConstants.privacyPolicy}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "underline", color: "#000" }}
                >
                  Privacy Policy
                </Link>
                .
              </Typography>
            }
          />
          {errors.termsAccepted && (
            <FormHelperText error>{errors.termsAccepted}</FormHelperText>
          )}
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        sx={{ backgroundColor: "#D4740F", borderRadius: 40, width: "70%" }}
        size="large"
      >
        Sign Up
      </Button>{" "}
      <Grid item xs={12}>
        <Typography variant="body2" align="center" sx={{ color: "#000" }}>
          Already have an account?{" "}
          <Link
            to={openRouteConstants.SignIn}
            style={{ textDecoration: "underline", color: "#000" }}
          >
            Log in
          </Link>
        </Typography>
      </Grid>
    </Box>
  );
};

export default SignUpForm;
