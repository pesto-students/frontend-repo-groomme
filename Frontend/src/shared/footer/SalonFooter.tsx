import { Box, Button, Typography } from "@mui/material";

import { openRouteConstants } from "../../routes/routeConstants";
function SalonFooter() {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(212, 116, 15, 0.4)",
        display: "flex",
        justifyContent: "space-between",
        p: 2,
        fontSize: "8px",
      }}
    >
      <Typography sx={{ fontSize: "12px", ml: 10 }}>
        © Groomme 2024 | All rights reserved
      </Typography>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "20%",
        }}
      >
        <Button
          sx={{ color: "#000" }}
          onClick={() => {
            const baseUrl = window.location.origin;
            window.open(
              `${baseUrl}${openRouteConstants.privacyPolicy}`,
              "_blank"
            );
          }}
        >
          <Typography sx={{ fontSize: "12px" }}>Privacy & Policy</Typography>
        </Button>
        <Button
          onClick={() => {
            const baseUrl = window.location.origin;
            window.open(
              `${baseUrl}${openRouteConstants.termsAndConditions}`,
              "_blank"
            );
          }}
          sx={{ color: "#000" }}
        >
          <Typography sx={{ fontSize: "12px" }}>Terms & Conditions</Typography>
        </Button>
      </Box>
    </Box>
  );
}

export default SalonFooter;
