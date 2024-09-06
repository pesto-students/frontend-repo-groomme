import { SalonInformationType } from "../../../../types/salon";
import { Box, Divider, Rating, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import { getReviewsAndRatingService } from "../../../../services/reviewsRating";
import { useEffect, useState } from "react";
function SalonNameAndLocation({
  salonDetails,
}: {
  salonDetails: SalonInformationType;
}) {
  const [reviewRatingCount, setReviewRatingCount] = useState({
    reviewCount: 0,
    ratingCount: 0,
  });
  const fetchReviews = async () => {
    try {
      const reviews = await getReviewsAndRatingService(salonDetails._id);

      setReviewRatingCount({
        reviewCount: reviews.enhancedReviews.length,
        ratingCount: reviews.averages.avgRating,
      });
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  useEffect(() => {
    if (salonDetails._id !== "") fetchReviews();
  }, [salonDetails]);
  console.log("reviewRatingCount", reviewRatingCount);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography sx={{ fontFamily: "Volkhov" }} variant="h3">
        {salonDetails.salonName}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <LocationOnOutlinedIcon />
        <Typography sx={{ fontFamily: "Mulish" }}>
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
        <Divider orientation="vertical" flexItem />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Rating
            size="large"
            value={reviewRatingCount.ratingCount}
            readOnly
            precision={0.5}
          />

          <Typography sx={{ fontFamily: "Mulish" }}>
            {`(${reviewRatingCount.reviewCount} Reviews) `}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default SalonNameAndLocation;
