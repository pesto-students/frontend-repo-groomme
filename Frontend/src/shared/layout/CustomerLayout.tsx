import React from "react";
import { Box } from "@mui/material";
import CustomerHeader from "../header/CustomerHeader";
import { CustomerWrapperProps } from "../../types/common";
import CustomerFooter from "../footer/CustomerFooter";

const CustomerLayout: React.FC<CustomerWrapperProps> = ({ children }) => {
  return (
    <Box sx={{ width: "100%", margin: "0 auto", backgroundColor: "#f4f4f7" }}>
      <CustomerHeader isLandingPage={false} />

      <Box component="main" sx={{ padding: 2, minHeight: "80vh" }}>
        {children}
      </Box>

      <Box component="footer">
        <CustomerFooter />
      </Box>
    </Box>
  );
};

export default CustomerLayout;
