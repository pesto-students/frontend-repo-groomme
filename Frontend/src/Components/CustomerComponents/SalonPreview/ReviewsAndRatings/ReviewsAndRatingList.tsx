import React, { useEffect, useState } from "react";
import { getReviewsAndRatingService } from "../../../../services/reviewsRating";
import { Box, Button, Typography } from "@mui/material";
import OverallSection from "./OverallSection";
import ReviewsList from "./ReviewsList";

interface Review {
  _id: string;
  userDetails: { lastName: string; firstName: string };
  rating: number;
  comment: string;
  services: number;
  staff: number;
  valueForMoney: number;
  cleanliness: number;
  createdAt: string;
}

interface Averages {
  avgRating: number;
  avgServices: number;
  avgStaff: number;
  avgValueForMoney: number;
  avgCleanliness: number;
}

interface ReviewsProps {
  salonId: string;
  handleClickOpenReviewRatingForm: () => void;
}

const ReviewsAndRatingList: React.FC<ReviewsProps> = ({
  salonId,
  handleClickOpenReviewRatingForm,
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averages, setAverages] = useState<Averages>({
    avgRating: 0,
    avgServices: 0,
    avgStaff: 0,
    avgValueForMoney: 0,
    avgCleanliness: 0,
  });
  const fetchReviews = async () => {
    try {
      const reviews = await getReviewsAndRatingService(salonId);

      setReviews(reviews.enhancedReviews);
      setAverages(reviews.averages);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  useEffect(() => {
    if (salonId !== "") fetchReviews();
  }, [salonId]);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "95vw" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">Customer Reviews</Typography>
        <Button
          variant="outlined"
          sx={{
            borderColor: "#d4740f",
            color: "#d4740f",
            textTransform: "none",
          }}
          onClick={handleClickOpenReviewRatingForm}
        >
          Write a Review
        </Button>
      </Box>
      <Box>
        <OverallSection averages={averages} reviewsCount={reviews.length} />
      </Box>

      <Box>
        <ReviewsList reviews={reviews} />
      </Box>
    </Box>
  );
};

export default ReviewsAndRatingList;
