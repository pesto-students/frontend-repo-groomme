/** @format */

import { Box, Container, Typography } from "@mui/material";

import customer from "../../../assets/landingPage/customer.png";
import img1 from "../../../assets/landingPage/img1.png";
import img2 from "../../../assets/landingPage/img2.png";
import img3 from "../../../assets/landingPage/img3.png";

const items = [
  {
    id: 1,
    title: "Customer Support",
    text: "Our dedicated team is always ready to assist you with any inquiries or issues",
    img: img3,
  },
  {
    id: 2,
    title: "Best Price Guarantted",
    text: "Enjoy competitive prices and transparent pricing with no hidden fees.",
    img: img2,
  },
  {
    id: 3,
    title: "Many Location",
    text: "Easily find and book appointments at salons near you, wherever you are.",
    img: img1,
  },
];

const ChooseUsDetails = ({
  title,
  text,
  img,
}: {
  title: string;
  text: string;
  img: string;
}) => {
  return (
    <Box sx={{ display: "flex", gap: 2.5 }}>
      <div>
        <svg
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="51.4521"
            height="51.4521"
            rx="10"
            transform="matrix(-1 0 0 1 51.4521 0.312988)"
            fill="#C4C4C4"
            fill-opacity="0.6"
          />
          <image
            href={img}
            x="12"
            y="12"
            width="30"
            height="30"
            clip-path="url(#clip)"
          />
        </svg>
      </div>
      <div
        style={{
          textAlign: "start",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography fontSize={22} fontWeight={600}>
          {title}
        </Typography>
        <Typography fontSize={16} width={"80%"}>
          {text}
        </Typography>
      </div>
    </Box>
  );
};

function ChooseUsSection() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ paddingBottom: 10, paddingTop: 10 }}>
        <div>
          <Typography sx={{ textAlign: "center" }} fontSize={48}>
            Why choose us
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography
              fontSize={18}
              width={"35%"}
              sx={{ textAlign: "center", m: 3 }}
            >
              Experience seamless online booking and top-rated salon services
              designed for your convenience.
            </Typography>
          </div>
        </div>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop: 2,
            marginLeft: 8,
            marginRight: 8,
          }}
        >
          <div>
            <img src={customer} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "40%",
              gap: 60,
            }}
          >
            {items.map((item) => {
              return (
                <div>
                  <ChooseUsDetails
                    title={item.title}
                    text={item.text}
                    img={item.img}
                  />
                </div>
              );
            })}
          </div>
        </Box>
      </Box>
    </Container>
  );
}

export default ChooseUsSection;
