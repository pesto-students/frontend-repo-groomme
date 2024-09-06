import { Box, Link, Typography } from "@mui/material";
import { SalonInformationType } from "../../../../types/salon";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

function AddressAndMap({
  salonDetails,
}: {
  salonDetails: SalonInformationType;
}) {
  const apikey = import.meta.env.VITE_google_map_Api_key;
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5">How to reach us</Typography>
      <Box>
        <Typography variant="body2">Address</Typography>
        <Typography>
          {" "}
          {salonDetails.address.street +
            "," +
            salonDetails.address.city +
            "," +
            salonDetails.address.state +
            "," +
            salonDetails.address.country +
            "," +
            salonDetails.address.postalCode}
        </Typography>
      </Box>
      <Link href={salonDetails.mapLocationLink}>Open on Google Maps</Link>
      <LoadScript googleMapsApiKey={apikey}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={{
            lat: salonDetails.coordinates.latitude,
            lng: salonDetails.coordinates.longitude,
          }}
          zoom={10}
        >
          <Marker
            position={{
              lat: salonDetails.coordinates.latitude,
              lng: salonDetails.coordinates.longitude,
            }}
          />
        </GoogleMap>
      </LoadScript>
    </Box>
  );
}

export default AddressAndMap;
