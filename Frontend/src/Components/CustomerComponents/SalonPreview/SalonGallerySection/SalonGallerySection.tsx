import { useEffect, useState } from "react";
import { SalonInformationType } from "../../../../types/salon";
import { Box, ImageList, ImageListItem, styled } from "@mui/material";

const BigImage = styled(Box)(() => ({
  height: "500px",
  overflow: "hidden",
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  transition: "transform 0.5s ease-in-out",
}));

function SalonGallerySection({
  salonDetails,
}: {
  salonDetails: SalonInformationType;
}) {
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    if (salonDetails.salonImages[0].url !== "")
      setSelectedImage(salonDetails.salonImages[0].url);
  }, [salonDetails.salonImages]);

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
  };
  return (
    <Box>
      <BigImage style={{ backgroundImage: `url(${selectedImage})` }} />
      <ImageList cols={7} rowHeight={140}>
        {salonDetails.salonImages.map((item, index) => (
          <ImageListItem
            key={index}
            onClick={() => handleImageClick(item.url)}
            sx={{
              cursor: "pointer",
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": {
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 1.3)",
              },
            }}
          >
            <img
              srcSet={`${item.url}`}
              src={`${item.url}`}
              alt={"Image not Found"}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

export default SalonGallerySection;
