import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  TextField,
  Box,
  Button,
  MenuItem,
  Slider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FilterBox = ({
  city,
  setCity,
  cities,
  category,
  setCategory,
  categories,
  distanceRange,
  setDistanceRange,
  salonList,
  rateRange,
  setRateRange,
  clearFilters,
}: any) => {
  const minRate = Math.floor(
    Math.min(
      ...salonList.flatMap((salon: any) =>
        salon.services.map((service: any) => service.rate)
      )
    )
  );

  const maxRate = Math.ceil(
    Math.max(
      ...salonList.flatMap((salon: any) =>
        salon.services.map((service: any) => service.rate)
      )
    )
  );
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body1">Filters: </Typography>
        <Button
          onClick={clearFilters}
          sx={{
            color: "#D4740F",
          }}
          variant="text"
        >
          Clear
        </Button>
      </Box>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>City</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            select
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}
            variant="outlined"
            size="small"
            label="Select City..."
          >
            {cities.map((city: string, index: number) => (
              <MenuItem key={index} value={city}>
                {city}
              </MenuItem>
            ))}
          </TextField>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            select
            label="Select Category..."
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            variant="outlined"
            size="small"
          >
            {categories.map((category: any, index: number) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Distance</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Slider
            sx={{ width: "80%" }}
            value={distanceRange}
            onChange={(_e, newValue) => setDistanceRange(newValue)}
            valueLabelDisplay="auto"
            min={Math.floor(
              Math.min(
                ...salonList.map((salon: any) => parseInt(salon.distance))
              )
            )}
            max={Math.ceil(
              Math.max(
                ...salonList.map((salon: any) => parseInt(salon.distance))
              )
            )}
            marks={[
              {
                value: Math.floor(
                  Math.min(
                    ...salonList.map((salon: any) => parseInt(salon.distance))
                  )
                ),
                label: `${Math.floor(
                  Math.min(
                    ...salonList.map((salon: any) => parseInt(salon.distance))
                  )
                )}`,
              },
              {
                value: Math.ceil(
                  Math.max(
                    ...salonList.map((salon: any) => parseInt(salon.distance))
                  )
                ),
                label: `${Math.ceil(
                  Math.max(
                    ...salonList.map((salon: any) => parseInt(salon.distance))
                  )
                )}`,
              },
            ]}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Prices</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Slider
            sx={{ width: "80%" }}
            value={rateRange}
            onChange={(_e, newValue) => setRateRange(newValue)}
            valueLabelDisplay="auto"
            min={minRate}
            max={maxRate}
            marks={[
              { value: minRate, label: `₹ ${minRate}` },
              { value: maxRate, label: `₹ ${maxRate}` },
            ]}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FilterBox;
