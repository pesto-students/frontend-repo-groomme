import { ChangeEvent } from "react";
import { SalonInformationType } from "../../../../types/salon";
import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  styled,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { handleUploadToS3Service } from "../../../../services/uploadToS3";

const fallbackImageUrl =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBe3aCKZdDJfdiCwyZCfUUXyuyC2nAd44ouw&s";

const HiddenInput = styled("input")({
  display: "none",
});

function SalonGallery({
  mainSalonInformation,
  handleMainSalonInformationChange,
}: {
  mainSalonInformation: SalonInformationType;
  handleMainSalonInformationChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    path: string | string[]
  ) => void;
}) {
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.target.files && event.target.files[0]) {
      const uploadUrl = await handleUploadToS3Service(
        event.target.files[0],
        mainSalonInformation.userId,
        "salon"
      );

      const fileUrl: any = {
        target: {
          value: uploadUrl,
        },
      };

      handleMainSalonInformationChange(fileUrl, [
        "salonImages",
        index.toString(),
        "url",
      ]);
    }
  };

  return (
    <Box>
      <ImageList sx={{ height: "60vh", width: "100%" }}>
        {[0, 1, 2, 3, 4, 5, 6].map((imageIndex: any) => (
          <ImageListItem key={mainSalonInformation.salonImages[imageIndex]._id}>
            {mainSalonInformation.salonImages[imageIndex].url ? (
              <img
                src={
                  mainSalonInformation.salonImages[imageIndex].url ||
                  fallbackImageUrl
                }
                alt="no image found"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  maxHeight: "100%",
                }}
              />
            ) : (
              <Typography sx={{ textAlign: "center" }}>
                No Image Found
              </Typography>
            )}
            <ImageListItemBar
              sx={{
                background: "rgba(0, 0, 0, 0.8)",
              }}
              actionIcon={
                <Box sx={{ display: "flex", gap: 2 }}>
                  <IconButton
                    component="label"
                    sx={{ color: "rgba(255, 255, 255, 1)" }}
                  >
                    <EditIcon />
                    <HiddenInput
                      accept="image/*"
                      type="file"
                      onChange={(e) => handleFileChange(e, imageIndex)}
                    />
                  </IconButton>
                </Box>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

export default SalonGallery;
