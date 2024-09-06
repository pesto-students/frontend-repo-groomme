import { ChangeEvent, useState } from "react";
import { Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import Loader from "../../../../widgets/Loader";
import { SalonInformationType } from "../../../../types/salon";

const weekDays = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
const SalonForm = ({
  mainSalonInformation,
  handleMainSalonInformationChange,
  serviceCategories,
}: {
  mainSalonInformation: SalonInformationType;
  handleMainSalonInformationChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    path: string | string[]
  ) => void;
  serviceCategories: any;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const getCurrentLocation = async (): Promise<void> => {
    if (navigator.geolocation) {
      setLoading(true);
      try {
        const position: GeolocationPosition =
          await new Promise<GeolocationPosition>((resolve, reject) =>
            navigator.geolocation.getCurrentPosition(resolve, reject)
          );
        const { latitude, longitude } = position.coords;

        const latitudeEvent: any = {
          target: {
            value: latitude,
          },
        };

        const longitudeEvent: any = {
          target: {
            value: longitude,
          },
        };

        handleMainSalonInformationChange(latitudeEvent, [
          "coordinates",
          "latitude",
        ]);

        handleMainSalonInformationChange(longitudeEvent, [
          "coordinates",
          "longitude",
        ]);
      } catch (error) {
        console.error("Error getting location:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <Box sx={{ minHeight: "70vh" }}>
      <Grid container spacing={2}>
        {/* Left Column */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2} sx={{ mt: 0 === 0 ? 0 : 2 }}>
            <Grid item xs={12}>
              <TextField
                size="small"
                fullWidth
                id="salonName"
                name="salonName"
                label="Salon Name"
                value={mainSalonInformation.salonName}
                onChange={(e) =>
                  handleMainSalonInformationChange(e, "salonName")
                }
                // error={!!mainSalonInfoErros.salonName}
                // helperText={mainSalonInfoErros.salonName}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            // key={index}
            sx={{ mt: 1 }}
          >
            <Grid item xs={12} md={6}>
              <TextField
                size="small"
                fullWidth
                id="street"
                name="street"
                label="Street"
                value={mainSalonInformation.address?.street}
                onChange={(e) =>
                  handleMainSalonInformationChange(e, ["address", "street"])
                }
                // error={!!mainSalonInfoErros.location}
                // helperText={mainSalonInfoErros.location}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                size="small"
                fullWidth
                id="city"
                name="city"
                label="City"
                value={mainSalonInformation.address?.city}
                onChange={(e) =>
                  handleMainSalonInformationChange(e, ["address", "city"])
                }
                // error={!!mainSalonInfoErros.location}
                // helperText={mainSalonInfoErros.location}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            // key={index}
            sx={{ mt: 1 }}
          >
            <Grid item xs={12} md={4}>
              <TextField
                size="small"
                fullWidth
                id="state"
                name="state"
                label="State"
                value={mainSalonInformation.address?.state}
                onChange={(e) =>
                  handleMainSalonInformationChange(e, ["address", "state"])
                }
                // error={!!mainSalonInfoErros.location}
                // helperText={mainSalonInfoErros.location}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                size="small"
                fullWidth
                id="country"
                name="country"
                label="Country"
                value={mainSalonInformation.address?.country}
                onChange={(e) =>
                  handleMainSalonInformationChange(e, ["address", "country"])
                }
                // error={!!mainSalonInfoErros.location}
                // helperText={mainSalonInfoErros.location}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>{" "}
            <Grid item xs={12} md={4}>
              <TextField
                size="small"
                fullWidth
                id="postalCode"
                name="postalCode"
                label="Postal Code"
                value={mainSalonInformation.address?.postalCode}
                onChange={(e) =>
                  handleMainSalonInformationChange(e, ["address", "postalCode"])
                }
                // error={!!mainSalonInfoErros.location}
                // helperText={mainSalonInfoErros.location}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                size="small"
                fullWidth
                id="description"
                name="description"
                label="Description"
                multiline
                rows={4}
                value={mainSalonInformation.description}
                onChange={(e) =>
                  handleMainSalonInformationChange(e, "description")
                }
                // error={!!mainSalonInfoErros.description}
                // helperText={mainSalonInfoErros.description}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            // key={index}
            sx={{ mt: 1 }}
          >
            <Grid item xs={12}>
              <TextField
                size="small"
                fullWidth
                id="mapLocationLink"
                name="mapLocationLink"
                label="Map Location Link"
                value={mainSalonInformation.mapLocationLink}
                onChange={(e) =>
                  handleMainSalonInformationChange(e, "mapLocationLink")
                }
                // error={!!mainSalonInfoErros.mapLocationLink}
                // helperText={mainSalonInfoErros.mapLocationLink}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 1.5 }}>
            <Grid item xs={12} md={4}>
              <TextField
                size="small"
                fullWidth
                id="latitude"
                name="latitude"
                label="Latitude"
                value={mainSalonInformation.coordinates.latitude}
                onChange={(e) =>
                  handleMainSalonInformationChange(e, [
                    "coordinates",
                    "latitude",
                  ])
                }
                // error={!!mainSalonInfoErros.coordinates.latitude}
                // helperText={mainSalonInfoErros.coordinates.latitude}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>{" "}
            <Grid item xs={12} md={4}>
              <TextField
                size="small"
                fullWidth
                id="longitude"
                name="longitude"
                label="Longitude"
                value={mainSalonInformation.coordinates.longitude}
                onChange={(e) =>
                  handleMainSalonInformationChange(e, [
                    "coordinates",
                    "longitude",
                  ])
                }
                // error={!!mainSalonInfoErros.coordinates.longitude}
                // helperText={mainSalonInfoErros.coordinates.longitude}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  height: "100%",
                  border: "1px solid #d4740f",
                  color: "#000",
                }}
                onClick={getCurrentLocation}
              >
                Get Cordinates
              </Button>
            </Grid>
          </Grid>{" "}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              size="small"
              fullWidth
              type="number"
              id="slotInterval"
              name="slotInterval"
              label="Slot Interval"
              value={mainSalonInformation.slotGeneration.slotInterval}
              onChange={(e) =>
                handleMainSalonInformationChange(e, [
                  "slotGeneration",
                  "slotInterval",
                ])
              }
              // error={!!mainSalonInfoErros.mapLocationLink}
              // helperText={mainSalonInfoErros.mapLocationLink}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {weekDays.map((day: string) => {
                return (
                  <Grid container spacing={2} key={day} sx={{ mt: 0.3 }}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        size="small"
                        fullWidth
                        id={`${day}.opening`}
                        name={`${day}.opening`}
                        label={`${
                          day.charAt(0).toUpperCase() + day.slice(1)
                        } Opening Time`}
                        type="time"
                        value={
                          mainSalonInformation.slotGeneration
                            .openingClosingHours[day].opening
                        }
                        onChange={(e) =>
                          handleMainSalonInformationChange(e, [
                            "slotGeneration",
                            "openingClosingHours",
                            day,
                            "opening",
                          ])
                        }
                        // error={
                        //   !!errors.openingHours[
                        //     day as keyof typeof errors.openingHours
                        //   ].opening
                        // }
                        // helperText={
                        //   errors.openingHours[
                        //     day as keyof typeof errors.openingHours
                        //   ].opening
                        // }
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        size="small"
                        fullWidth
                        id={`${day}.closing`}
                        name={`${day}.closing`}
                        label={`${
                          day.charAt(0).toUpperCase() + day.slice(1)
                        } Closing Time`}
                        type="time"
                        value={
                          mainSalonInformation.slotGeneration
                            .openingClosingHours[day].closing
                        }
                        onChange={(e) =>
                          handleMainSalonInformationChange(e, [
                            "slotGeneration",
                            "openingClosingHours",
                            day,
                            "closing",
                          ])
                        }
                        // error={
                        //   !!errors.openingHours[
                        //     day as keyof typeof errors.openingHours
                        //   ].closing
                        // }
                        // helperText={
                        //   errors.openingHours[
                        //     day as keyof typeof errors.openingHours
                        //   ].closing
                        // }
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
        {/* Right Column */}
        <Grid item xs={12} md={6}>
          {[0, 1, 2, 3, 4, 5].map((index: number) => {
            return (
              <Grid
                container
                spacing={2}
                key={index}
                sx={{ mt: index === 0 ? 0 : 2 }}
                xs={12}
              >
                <Grid item md={4} xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    id={`serviceName-${index}`}
                    name="name"
                    label={`Service ${index + 1} Name`}
                    value={mainSalonInformation.services[index]?.name}
                    onChange={(e) => {
                      handleMainSalonInformationChange(e, [
                        "services",
                        index.toString(),
                        "name",
                      ]);
                    }}
                    // error={!!errors.services[index]?.name}
                    // helperText={errors.services[index]?.name}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Autocomplete
                    size="small"
                    value={
                      mainSalonInformation.services[index].category || null
                    }
                    onChange={(_event: any, newValue: string | null) => {
                      const cateval: any = {
                        target: { value: newValue },
                      };
                      handleMainSalonInformationChange(cateval, [
                        "services",
                        index.toString(),
                        "category",
                      ]);
                    }}
                    id="controllable-states-demo"
                    options={serviceCategories}
                    getOptionLabel={(option: any) =>
                      typeof option === "string" ? option : option.label
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        InputLabelProps={{ shrink: true }}
                        label={`Service ${index + 1} Category`}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    id={`serviceRate-${index}`}
                    name="rate"
                    label={`Service ${index + 1} Rate`}
                    type="number"
                    value={mainSalonInformation.services[index]?.rate}
                    onChange={(e) => {
                      handleMainSalonInformationChange(e, [
                        "services",
                        index.toString(),
                        "rate",
                      ]);
                    }}
                    // error={!!errors.services[index]?.rate}
                    // helperText={errors.services[index]?.rate}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: 0.5 }}>
                  <TextField
                    size="small"
                    fullWidth
                    id={`serviceDescription-${index}`}
                    name="description"
                    label={`Service ${index + 1} Description`}
                    multiline
                    rows={2}
                    value={mainSalonInformation.services[index]?.description}
                    onChange={(e) => {
                      handleMainSalonInformationChange(e, [
                        "services",
                        index.toString(),
                        "description",
                      ]);
                    }}
                    // error={!!errors.services[index]?.description}
                    // helperText={errors.services[index]?.description}
                    InputLabelProps={{ shrink: true }}
                  />{" "}
                </Grid>
              </Grid>
            );
          })}

          {/* <Grid container spacing={2}>
            <Grid item xs={12}>
              {weekDays.slice(3, 7).map((day: string) => {
                return (
                  <Grid container spacing={2} key={day} sx={{ mt: 0.3 }}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        size="small"
                        fullWidth
                        id={`${day}.opening`}
                        name={`${day}.opening`}
                        label={`${
                          day.charAt(0).toUpperCase() + day.slice(1)
                        } Opening Time`}
                        type="time"
                        value={
                          mainSalonInformation.slotGeneration
                            .openingClosingHours[day].opening
                        }
                        onChange={(e) =>
                          handleMainSalonInformationChange(e, [
                            "slotGeneration",
                            "openingClosingHours",
                            day,
                            "opening",
                          ])
                        }
                        // error={
                        //   !!errors.openingHours[
                        //     day as keyof typeof errors.openingHours
                        //   ].opening
                        // }
                        // helperText={
                        //   errors.openingHours[
                        //     day as keyof typeof errors.openingHours
                        //   ].opening
                        // }
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        size="small"
                        fullWidth
                        id={`${day}.closing`}
                        name={`${day}.closing`}
                        label={`${
                          day.charAt(0).toUpperCase() + day.slice(1)
                        } Closing Time`}
                        type="time"
                        value={
                          mainSalonInformation.slotGeneration
                            .openingClosingHours[day].closing
                        }
                        onChange={(e) =>
                          handleMainSalonInformationChange(e, [
                            "slotGeneration",
                            "openingClosingHours",
                            day,
                            "closing",
                          ])
                        }
                        // error={
                        //   !!errors.openingHours[
                        //     day as keyof typeof errors.openingHours
                        //   ].closing
                        // }
                        // helperText={
                        //   errors.openingHours[
                        //     day as keyof typeof errors.openingHours
                        //   ].closing
                        // }
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid> */}
        </Grid>
      </Grid>
      {loading && <Loader />}
    </Box>
  );
};

export default SalonForm;
