import { SalonInformationType } from "../../../../types/salon";
import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import { formatTime } from "../../../../services/salons";

function DescriptionAndTimings({
  salonDetails,
}: {
  salonDetails: SalonInformationType;
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h5">Description</Typography>
        <Typography
          variant="subtitle2"
          sx={{ textAlign: "justify", fontWeight: 200 }}
        >
          {salonDetails.description}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h5">Opening Hours</Typography>
        <Typography
          variant="subtitle2"
          sx={{ textAlign: "justify", fontWeight: 200 }}
        >
          <List>
            {Object.entries(
              salonDetails.slotGeneration.openingClosingHours
            ).map(([day, { opening, closing }]) => (
              <Box key={day}>
                <ListItem>
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography variant="body1">
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="subtitle2">
                        {` ${formatTime(parseInt(opening))} -  ${formatTime(
                          parseInt(closing)
                        )}`}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              </Box>
            ))}
          </List>
        </Typography>
      </Box>
    </Box>
  );
}

export default DescriptionAndTimings;
