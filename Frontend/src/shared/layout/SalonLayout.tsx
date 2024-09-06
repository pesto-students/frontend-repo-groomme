import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import SalonDrawer from "../drawer/SalonDrawer";
import SalonHeader from "../header/SalonHeader";
import SalonFooter from "../footer/SalonFooter";

export default function SalonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <Box sx={{ width: "100%", minWidth: "100vw" }}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <SalonDrawer setOpen={setOpen} open={open} />
        <SalonHeader open={open} setOpen={setOpen} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minHeight: "92vh",
            mt: 9,
            mr: 1,
          }}
        >
          {children}
        </Box>
      </Box>
      <SalonFooter />
    </Box>
  );
}
