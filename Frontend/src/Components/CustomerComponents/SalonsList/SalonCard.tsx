import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import OpenCloseHrs from "./SalonTimings";
import SpecialityIcon from "../../../assets/icons/salons/SalonSpecialityIcon";
import { findMinimumRateOfService } from "../../../helpers/findMinimumRateOfService";
import { useNavigate } from "react-router-dom";
import { customerRouteConstants } from "../../../routes/routeConstants";

function SalonCard({ salon }: any) {
  const navigate = useNavigate();
  return (
    <Paper
      elevation={5}
      sx={{
        display: "flex",
        gap: 2,

        p: 1,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          width: "15%",
          aspectRatio: 1,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ position: "absolute" }}
        />

        <img
          src={salon.salonImages[0].url}
          alt="Description"
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/150?text=Fallback"; //
          }}
          // onLoad={() => e.currentTarget.parentElement.querySelector('div.MuiSkeleton-root').style.display = 'none'}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "relative",
          }}
        />
      </Box>

      <Box
        sx={{
          width: "70%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Typography variant="h5">{salon.salonName}</Typography>
            <Chip
              variant="outlined"
              sx={{
                border: "1px solid #D4740F",
                fontSize: "8px",
                height: "20px",
              }}
              label={`~${Math.round(salon.distance)} km`}
              size="small"
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocationOnOutlinedIcon sx={{ width: "20px" }} />{" "}
            <Typography variant="caption">
              {salon.address.street +
                "," +
                salon.address.city +
                "," +
                salon.address.state +
                "," +
                salon.address.country +
                "," +
                salon.address.postalCode}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            textAlign: "justify",
          }}
        >
          <Typography variant="body2">{salon.description}</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AccessTimeOutlinedIcon sx={{ width: "20px" }} />{" "}
          <OpenCloseHrs salon={salon} />{" "}
          <Divider orientation="vertical" flexItem /> <SpecialityIcon />{" "}
          {salon.services.slice(0, 3).map((service: any) => (
            <Box key={service._id}>
              <Typography
                variant="caption"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontWeight: "bold",
                }}
              >
                {service.name}
              </Typography>{" "}
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          width: "10%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: 2, // Add padding if needed
        }}
      >
        <Box>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            Starts from
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            {`₹${findMinimumRateOfService(salon.services)}`}
          </Typography>
        </Box>
        <Button
          sx={{
            width: "100%", // Adjust width to fit container
            backgroundColor: "#D4740F",
            color: "#fff", // Ensure text is visible
            mt: 2, // Add margin-top for spacing
          }}
          onClick={() => {
            navigate(customerRouteConstants.salonPreview, {
              state: {
                salonData: salon._id,
              },
            });
          }}
          variant="contained"
        >
          Book
        </Button>
      </Box>
    </Paper>
  );
}

export default SalonCard;
