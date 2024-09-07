import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#9c27b0",
      contrastText: "#ffffff",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#2196f3",
    },
    success: {
      main: "#4caf50",
    },
    background: {
      default: "#f7f7f7",
      paper: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#9c27b0",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 700,
    },
    h4: {
      fontSize: "1.125rem",
      fontWeight: 700,
    },
    h5: {
      fontSize: "1rem",
      fontWeight: 700,
    },
    h6: {
      fontSize: "0.875rem",
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 700,
      textTransform: "none",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 400,
      textTransform: "uppercase",
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  shadows: [
    "none",
    "0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)",
    "0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)",
    "0px 10px 20px rgba(0, 0, 0, 0.19), 0px 6px 6px rgba(0, 0, 0, 0.23)",
    "0px 14px 28px rgba(0, 0, 0, 0.25), 0px 10px 10px rgba(0, 0, 0, 0.22)",
    "0px 19px 38px rgba(0, 0, 0, 0.30), 0px 15px 12px rgba(0, 0, 0, 0.22)",
    "0px 24px 48px rgba(0, 0, 0, 0.35), 0px 20px 15px rgba(0, 0, 0, 0.25)",
    "0px 32px 64px rgba(0, 0, 0, 0.40), 0px 25px 20px rgba(0, 0, 0, 0.30)",
    "0px 40px 80px rgba(0, 0, 0, 0.45), 0px 30px 25px rgba(0, 0, 0, 0.35)",
    "0px 48px 96px rgba(0, 0, 0, 0.50), 0px 35px 30px rgba(0, 0, 0, 0.40)",
    "0px 56px 112px rgba(0, 0, 0, 0.55), 0px 40px 35px rgba(0, 0, 0, 0.45)",
    "0px 64px 128px rgba(0, 0, 0, 0.60), 0px 45px 40px rgba(0, 0, 0, 0.50)",
    "0px 72px 144px rgba(0, 0, 0, 0.65), 0px 50px 45px rgba(0, 0, 0, 0.55)",
    "0px 80px 160px rgba(0, 0, 0, 0.70), 0px 55px 50px rgba(0, 0, 0, 0.60)",
    "0px 88px 176px rgba(0, 0, 0, 0.75), 0px 60px 55px rgba(0, 0, 0, 0.65)",
    "0px 96px 192px rgba(0, 0, 0, 0.80), 0px 65px 60px rgba(0, 0, 0, 0.70)",
    "0px 104px 208px rgba(0, 0, 0, 0.85), 0px 70px 65px rgba(0, 0, 0, 0.75)",
    "0px 112px 224px rgba(0, 0, 0, 0.90), 0px 75px 70px rgba(0, 0, 0, 0.80)",
    "0px 120px 240px rgba(0, 0, 0, 0.95), 0px 80px 75px rgba(0, 0, 0, 0.85)",
    "0px 128px 256px rgba(0, 0, 0, 1.00), 0px 85px 80px rgba(0, 0, 0, 0.90)",
    "0px 136px 272px rgba(0, 0, 0, 1.05), 0px 90px 85px rgba(0, 0, 0, 0.95)",
    "0px 144px 288px rgba(0, 0, 0, 1.10), 0px 95px 90px rgba(0, 0, 0, 1.00)",
    "0px 152px 304px rgba(0, 0, 0, 1.15), 0px 100px 95px rgba(0, 0, 0, 1.05)",
    "0px 160px 320px rgba(0, 0, 0, 1.20), 0px 105px 100px rgba(0, 0, 0, 1.10)",
    "0px 168px 326px rgba(0, 0, 0, 1.25), 0px 110px 105px rgba(0, 0, 0, 1.15)",
  ],
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  transitions: {
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
});

export default lightTheme;
