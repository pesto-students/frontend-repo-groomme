/** @format */

import { Avatar, Box, Container, Typography } from "@mui/material";

function ReviewCard({ review }: any) {
  return (
    <Box
      sx={{
        width: "25%",
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: "#DCDCDC",
        borderRadius: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between", // Ensure space between name and rating
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ bgcolor: "#d4740f" }}
            alt={review.fullName}
            src="/static/images/avatar/1.jpg"
          />
          <Box
            sx={{
              marginLeft: 2, // Add some space between the avatar and the name
            }}
          >
            <Box>{review.fullName}</Box>
            <Box>{`${review.city}, ${review.country}`}</Box>
          </Box>
        </Box>
        <Box
          sx={{
            marginLeft: "auto", // Push the rating to the end
          }}
        >
          {review.rating}
        </Box>
      </Box>

      <Box sx={{ textAlign: "justify" }}>{review.review}</Box>
    </Box>
  );
}
const reviews = [
  {
    fullName: "Emily Carter",
    rating: 5,
    city: "New York",
    country: "USA",
    profilePic: "https://example.com/images/emily-carter.jpg",
    review:
      "I had an amazing experience at the salon! The staff was professional, and the atmosphere was relaxing. Highly recommend booking through this site!",
  },
  {
    fullName: "Liam O'Sullivan",
    rating: 4,
    city: "Dublin",
    country: "Ireland",
    profilePic: "https://example.com/images/liam-osullivan.jpg",
    review:
      "The booking process was smooth, and the salon did a great job. My haircut turned out exactly how I wanted. Will definitely use this service again.",
  },
  {
    fullName: "Aisha Khan",
    rating: 3,
    city: "Mumbai",
    country: "India",
    profilePic: "https://example.com/images/aisha-khan.jpg",
    review:
      "The service was good, but the waiting time was longer than expected. The website made it easy to find a salon nearby, which was convenient.",
  },
];

function TrustedSection() {
  return (
    <Box
      sx={{
        paddingTop: 10,
        paddingBottom: 10,
      }}
    >
      <Container maxWidth="xl">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 25,
          }}
        >
          <Typography
            fontSize={35}
            fontWeight={600}
            width="35%"
            sx={{ textAlign: "center" }}
          >
            Trusted by Hundreds of Happy Customer
          </Typography>
          <Typography width="30%" sx={{ textAlign: "center", m: 3 }}>
            A high-performing web-based booking system for men's salons, perfect
            for any salon owner and website
          </Typography>
        </div>
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          {reviews.map((review: any) => {
            return <ReviewCard review={review} />;
          })}
        </Box>
      </Container>
    </Box>
  );
}

export default TrustedSection;
