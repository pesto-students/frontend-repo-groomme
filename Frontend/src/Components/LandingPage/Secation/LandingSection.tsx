/** @format */

import { Box, Button, Container, Stack, Typography } from "@mui/material";

import mainBg from "../../../assets/landingPage/mainBg.png";
import { useNavigate } from "react-router-dom";
import {
  customerRouteConstants,
  openRouteConstants,
} from "../../../routes/routeConstants";

function LandingSection() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0)), url(${mainBg})`,
        backgroundSize: "cover",
        paddingBottom: 22,
        width: "100%",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            width: "60%",
          }}
        >
          <Box sx={{ paddingTop: "220px", marginLeft: 7, textAlign: "start" }}>
            <Typography
              sx={{
                color: "#FFA500",
                fontSize: 26,
                stroke: "1px solid #B42020",
              }}
            >
              100% Trusted Men’s Salon Booking Platform in India
            </Typography>
            <Typography
              sx={{
                color: "#ffffff",
                fontSize: 45,
                fontWeight: 600,
                marginTop: 2,
                width: "70%",
              }}
            >
              Fast And Easy Way To Book Salon Appointments
            </Typography>
            <Typography
              sx={{
                color: "#ffffff",
                fontSize: 20,
                marginTop: 2,
                width: "75%",
              }}
            >
              Our Salon Booking System is Designed to Meet the Specific Needs of
              Men's Salon Owners and Customers. This Easy-to-Use Software Will
              Let You Manage Appointments Seamlessly.
            </Typography>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                textAlign: "center",
                marginTop: 6,
                gap: 5,
              }}
            >
              <Button
                size="large"
                onClick={() =>
                  sessionStorage.getItem("userType") === "customer"
                    ? navigate(customerRouteConstants.salonList)
                    : navigate(openRouteConstants.SignIn)
                }
                sx={{
                  backgroundColor: "#D4740F",
                  color: "white",
                  width: "150px",
                  "&:hover": {
                    backgroundColor: "#BF610C",
                  },
                }}
              >
                Book Now
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default LandingSection;
