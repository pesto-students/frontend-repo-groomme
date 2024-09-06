import { useEffect, useState } from "react";
import { getSalonPreviewService } from "../../../services/salons";
import CustomerLayout from "../../../shared/layout/CustomerLayout";
import { SalonInformationType } from "../../../types/salon";
import SalonNameAndLocation from "./SalonNameAndLocation/SalonNameAndLocation";
import SalonGallerySection from "./SalonGallerySection/SalonGallerySection";
import Top6Services from "./Top6Services/Top6Services";
import DescriptionAndTimings from "./DescriptionAndTimings/DescriptionAndTimings";
import StaffSection from "./StaffSection/StaffSection";
import AddressAndMap from "./AddressAndMap/AddressAndMap";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import BookingForm from "../AppoointmentBooking/AppoointmentBooking";
import { initialSalonInformationState } from "../../../constants/salon";
import ReviewsAndRatingForm from "./ReviewsAndRatings/ReviewsAndRatingForm";
import ReviewsAndRatingList from "./ReviewsAndRatings/ReviewsAndRatingList";

function SalonPreview() {
  const location = useLocation();
  const salonData = location.state?.salonData;

  const [salonDetails, setSalonDetails] = useState<SalonInformationType>(
    initialSalonInformationState
  );

  async function getSalonInfo(salonData: string) {
    const salonInfo = await getSalonPreviewService(salonData);

    setSalonDetails(salonInfo);
  }

  useEffect(() => {
    if (salonData) getSalonInfo(salonData);
  }, []);

  const [openReviewRatingForm, setOpenReviewRatingForm] = useState(false);

  const handleClickOpenReviewRatingForm = () => {
    setOpenReviewRatingForm(true);
  };

  const handleCloseReviewRatingForm = () => {
    setOpenReviewRatingForm(false);
  };

  return (
    <CustomerLayout>
      <Box
        sx={{
          display: "flex",
          gap: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,

            p: 2,
            width: "70%",
          }}
        >
          <SalonNameAndLocation salonDetails={salonDetails} />
          <SalonGallerySection salonDetails={salonDetails} />
          <Top6Services salonDetails={salonDetails} />
          <DescriptionAndTimings salonDetails={salonDetails} />
          <StaffSection salonDetails={salonDetails} />
          <AddressAndMap salonDetails={salonDetails} />
          <ReviewsAndRatingList
            salonId={salonDetails._id}
            handleClickOpenReviewRatingForm={handleClickOpenReviewRatingForm}
          />
        </Box>
        <Box sx={{ width: "30%" }}>
          <BookingForm salonDetails={salonDetails} />{" "}
        </Box>{" "}
      </Box>
      {openReviewRatingForm && (
        <ReviewsAndRatingForm
          salonId={salonDetails._id}
          handleClose={handleCloseReviewRatingForm}
          open={openReviewRatingForm}
        />
      )}
    </CustomerLayout>
  );
}

export default SalonPreview;
