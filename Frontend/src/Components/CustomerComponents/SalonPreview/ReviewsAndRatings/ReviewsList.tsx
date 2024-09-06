import { useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  Rating,
  Typography,
  Pagination,
  PaginationItem,
  IconButton,
} from "@mui/material";
import ReviewFormDialog from "./ReviewsAndRatingForm";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
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

interface ReviewsListProps {
  reviews: Review[];
  reviewsPerPage?: number;
}

function ReviewsList({ reviews, reviewsPerPage = 5 }: ReviewsListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const paginatedReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  const handlePageChange = (_: any, page: number) => {
    setCurrentPage(page);
  };

  const [openReviewRatingFormUpdate, setOpenReviewRatingFormUpdate] =
    useState<any>();

  const handleClickOpenReviewRatingFormUpdate = (data: Review) => {
    setOpenReviewRatingFormUpdate(data);
  };

  const handleCloseReviewRatingFormUpdate = () => {
    setOpenReviewRatingFormUpdate(undefined);
  };
  return (
    <>
      {paginatedReviews.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 4,
          }}
        >
          {paginatedReviews.map((review: Review, index: number) => (
            <Box key={review._id}>
              <Box
                sx={{
                  display: "flex",
                  gap: 4,
                }}
              >
                <Box sx={{ width: "10%" }}>
                  <Avatar
                    alt={review.userDetails.firstName}
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 56, height: 56, bgcolor: "#d4740f" }}
                  />
                </Box>
                <Box
                  sx={{
                    width: "20%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Rating value={review.rating} readOnly />
                  <Typography variant="body2">{`${review.userDetails.firstName} ${review.userDetails.lastName}`}</Typography>
                  <Typography variant="body2">{`${new Date(
                    review.createdAt
                  ).toLocaleDateString()}`}</Typography>
                </Box>
                <Box sx={{ width: "60%" }}>
                  <Typography sx={{ textAlign: "justify" }} variant="body2">
                    {review.comment}
                  </Typography>
                </Box>
                {index === 0 && (
                  <IconButton
                    onClick={() => {
                      handleClickOpenReviewRatingFormUpdate(review);
                    }}
                  >
                    <EditOutlinedIcon sx={{ color: "#D4740F" }} />
                  </IconButton>
                )}
              </Box>
              <Divider sx={{ mt: 4, width: "100%" }} />
            </Box>
          ))}
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          renderItem={(item) => (
            <PaginationItem
              {...item}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#d4740f",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#a55c0c",
                  },
                },
              }}
            />
          )}
        />
      </Box>
      {
        <ReviewFormDialog
          salonId={""}
          handleClose={handleCloseReviewRatingFormUpdate}
          open={Boolean(openReviewRatingFormUpdate)}
          reviewToUpdate={openReviewRatingFormUpdate}
        />
      }
    </>
  );
}

export default ReviewsList;
