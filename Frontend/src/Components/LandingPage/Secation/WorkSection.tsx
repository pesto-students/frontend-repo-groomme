/** @format */

import { Box, Card, Container, Typography } from "@mui/material";
import line from "../../../assets/landingPage/line.png";
import LocationIcon from "../../../assets/icons/landingPage/LocationIcon";
import { FC } from "react";
import PickADateIcon from "../../../assets/icons/landingPage/PickADateIcon";
import BookSalonIcon from "../../../assets/icons/landingPage/BookSalonIcon";
interface WorkCardProps {
  Icon: FC;
}

const WorkCard: FC<WorkCardProps> = ({ Icon }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#B8B8B8",
        width: "106px",
        height: "106px",
        borderRadius: 28,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon />
    </Card>
  );
};

function WorkSection() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ marginTop: 10, textAlign: "center", paddingBottom: 10 }}>
        <Typography sx={{ fontSize: 48, fontWeight: 400 }}>
          How it works
        </Typography>

        <Typography
          sx={{
            fontSize: 18,
          }}
        >
          A High-Performing Web-Based System for Any Men's Salon
        </Typography>
        <Typography
          sx={{
            fontSize: 18,
          }}
        >
          and Booking Website
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <WorkCard Icon={LocationIcon} />
            <Typography
              sx={{
                color: "#1A202C",
                fontSize: 24,
                fontWeight: 550,
              }}
            >
              Choose Location
            </Typography>
            <Typography
              sx={{
                color: "#1A202C",
                fontSize: 14,
              }}
            >
              Discover salons near you effortlessly by selecting your preferred
              location. Find the best options that suit your needs.
            </Typography>
          </Box>
          <Box>
            <img src={line} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <WorkCard Icon={PickADateIcon} />
            <Typography
              sx={{
                color: "#1A202C",
                fontSize: 24,
                fontWeight: 550,
              }}
            >
              Pick-up Date
            </Typography>
            <Typography
              sx={{
                color: "#1A202C",
                fontSize: 14,
              }}
            >
              Select a date that fits your schedule perfectly. Enjoy the
              convenience of flexible booking tailored to your availability.
            </Typography>
          </Box>
          <Box>
            <img src={line} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <WorkCard Icon={BookSalonIcon} />
            <Typography
              sx={{
                color: "#1A202C",
                fontSize: 24,
                fontWeight: 550,
              }}
            >
              Book your Salon
            </Typography>
            <Typography
              sx={{
                color: "#1A202C",
                fontSize: 14,
              }}
            >
              Confirm your appointment in just a few clicks. Experience a
              seamless booking process and get ready for your salon visit.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default WorkSection;
