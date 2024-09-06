import { useState } from "react";
import { SalonInformationType, StaffType } from "../../../../types/salon";
import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import StaffPreview from "./StaffPreview";

function StaffSection({
  salonDetails,
}: {
  salonDetails: SalonInformationType;
}) {
  const staffPreviewInitialState = {
    _id: "",
    fullname: "",
    description: "",
    specialties: [],
    profilePic: "",
  };
  const [staffPreviewDetail, setStaffPreviewDetail] = useState<StaffType>(
    staffPreviewInitialState
  );

  const handleCloseStaffPreviewDetail = () => {
    setStaffPreviewDetail(staffPreviewInitialState);
  };
  return (
    <Box>
      <Typography variant="h5">Meet our staff</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
        }}
      >
        {salonDetails.staff[0].profilePic !== "" && (
          <ImageList cols={2} rowHeight={250} gap={100}>
            {salonDetails.staff.map((item) => (
              <ImageListItem
                key={item.profilePic}
                onClick={() => {
                  setStaffPreviewDetail(item);
                }}
                sx={{
                  cursor: "pointer",

                  transition: "box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 1.3)",
                  },
                }}
              >
                <img
                  src={`${item.profilePic}`}
                  alt={item.fullname}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "10px 10px 0 0",
                  }}
                />
                <ImageListItemBar title={item.fullname} />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Box>
      {staffPreviewDetail._id !== "" && (
        <StaffPreview
          staffDetail={staffPreviewDetail}
          handleCloseStaffPreviewDetail={handleCloseStaffPreviewDetail}
        />
      )}
    </Box>
  );
}

export default StaffSection;
