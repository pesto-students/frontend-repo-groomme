/** @format */

import { Box, Container } from "@mui/material";
import bg1 from "../../../assets/landingPage/bg1.png";
import bg2 from "../../../assets/landingPage/bg2.png";

function GallerySection() {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(212, 116, 15, 0.4)",
        paddingTop: 10,
        paddingBottom: 10,
      }}
    >
      <Container maxWidth="xl">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 55,
          }}
        >
          <img src={bg2}></img>
          <img src={bg1}></img>
        </div>
      </Container>
    </Box>
  );
}

export default GallerySection;
