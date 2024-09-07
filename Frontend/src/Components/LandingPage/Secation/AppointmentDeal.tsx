/** @format */

import { Box, Typography, Tab, Tabs, Button } from "@mui/material";
import React from "react";
import { findMinimumRateOfService } from "../../../helpers/findMinimumRateOfService";
import { useNavigate } from "react-router-dom";
import {
  customerRouteConstants,
  openRouteConstants,
} from "../../../routes/routeConstants";

function AppointmentDeal({
  categories,

  setCategory,
  applyFiltersAndSorting,
}: {
  categories: string[];
  setCategory: Function;
  applyFiltersAndSorting: any;
}) {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: any, newValue: any) => {
    setValue(newValue);
  };
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <Box
      sx={{
        backgroundColor: "rgba(212, 116, 15, 0.4)",
        p: 5,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography fontSize={48}>
        Most Popular Salon Appointment Deals
      </Typography>
      <Typography
        sx={{
          width: "35%",
          textAlign: "center",
        }}
      >
        An efficient online appointment system designed for salons to streamline
        bookings and manage schedules.
      </Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        sx={{
          width: "60%",
          "& .MuiTabs-flexContainer": {
            display: "flex",
            gap: 3,
            justifyContent: "space-between",
          },
        }}
      >
        {categories.slice(0, 4).map((category: string, index: number) => {
          return (
            <Tab
              label={category}
              {...a11yProps(index)}
              onClick={() => setCategory(category)}
            />
          );
        })}
      </Tabs>{" "}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",

          "& .image-container": {
            position: "relative",
            width: 300,
            height: 350,
            overflow: "hidden",
          },
          "& .image": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 5,
          },
          "& .overlay": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            borderRadius: 5,
            flexDirection: "column",
          },
        }}
      >
        {applyFiltersAndSorting().map((item: any) => {
          return (
            <Box sx={{ mb: 4 }}>
              <Box className="image-container" key={item.id}>
                <img
                  src={
                    item.salonImages[0].url ||
                    "https://wallpapers.com/images/featured/plain-black-background-02fh7564l8qq4m6d.jpg"
                  }
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg";
                  }}
                  className="image"
                />
                <Box className="overlay">
                  <Typography variant="h6" sx={{ m: 1.5, ml: 3 }}>
                    {item.salonName}
                  </Typography>{" "}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 1.5,
                      ml: 3,
                    }}
                  >
                    <Typography variant="body1" sx={{ textAlign: "center" }}>
                      Starts from
                      <Typography variant="body1">
                        {`₹${findMinimumRateOfService(item.services)}`}
                      </Typography>
                    </Typography>

                    <Button
                      sx={{
                        backgroundColor: "#D4740F",
                        color: "white",
                        mr: 3,
                        "&:hover": {
                          backgroundColor: "#BF610C",
                        },
                      }}
                      onClick={() => {
                        sessionStorage.getItem("userType") === "customer"
                          ? navigate(customerRouteConstants.salonPreview, {
                              state: {
                                salonData: item._id,
                              },
                            })
                          : navigate(openRouteConstants.SignIn);
                      }}
                    >
                      View
                    </Button>
                  </Box>
                </Box>{" "}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default AppointmentDeal;
