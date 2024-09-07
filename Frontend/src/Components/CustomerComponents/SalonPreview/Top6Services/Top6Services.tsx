import { SalonInformationType } from "../../../../types/salon";
import { Box, Grid, Typography } from "@mui/material";
import ServicesIcon from "../../../../assets/icons/salons/ServicesIcon";

function Top6Services({
  salonDetails,
}: {
  salonDetails: SalonInformationType;
}) {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        rowSpacing={7}
        sx={{
          pl: 7,
          pr: 7,
          backgroundColor: "#F9FAFC",
          mt: 1,
          pb: 7,
          borderRadius: 5,
        }}
      >
        {salonDetails.services.map((service, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Box sx={{ display: "flex", alignItems: "start" }}>
              <Box sx={{ mt: 0.5, mr: 2 }}>
                <ServicesIcon />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 900 }} variant="body1">
                  {service.name}
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 100 }}>
                  {service.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Top6Services;
