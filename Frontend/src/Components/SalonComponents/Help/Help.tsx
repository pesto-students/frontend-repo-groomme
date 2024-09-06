import { Typography } from "@mui/material";
import SalonLayout from "../../../shared/layout/SalonLayout";
import HelpAndSupport from "../../helpAndSupport/HelpAndSupport";

function Help() {
  return (
    <SalonLayout>
      <Typography variant="h5" sx={{ p: 2 }}>
        Help & Support
      </Typography>
      <HelpAndSupport />
    </SalonLayout>
  );
}

export default Help;
