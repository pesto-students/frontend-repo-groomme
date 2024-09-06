import {
  Box,
  LinearProgress,
  linearProgressClasses,
  Rating,
  styled,
  Typography,
} from "@mui/material";

interface Averages {
  avgRating: number;
  avgServices: number;
  avgStaff: number;
  avgValueForMoney: number;
  avgCleanliness: number;
}
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  width: "90%",

  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[400],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#d4740f",
  },
}));

function OverallSection({
  averages,
  reviewsCount,
}: {
  averages: Averages;
  reviewsCount: number;
}) {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box sx={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
            <Typography variant="h2" sx={{ fontWeight: 900 }}>
              {averages.avgRating}
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              {reviewsCount} Reviews
            </Typography>
          </Box>{" "}
          <Rating
            size="large"
            value={averages.avgRating}
            readOnly
            precision={0.5}
          />
        </Box>
        <Box
          sx={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {Object.entries(averages).map(([key, value]) => {
            if (key !== "avgRating" && key !== "_id") {
              return (
                <Box
                  sx={{
                    display: "flex",
                    gap: 3,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" sx={{ width: "40%" }}>
                    {key
                      .replace(/^avg/, "")
                      .replace(/([a-z])([A-Z])/g, "$1 $2")
                      .replace(/[_-]/g, " ")
                      .replace(/\b\w/g, (char: string) => char.toUpperCase())}
                  </Typography>
                  <BorderLinearProgress
                    variant="determinate"
                    value={value * 20}
                  />
                  <Typography variant="caption" sx={{ width: "10%" }}>
                    {value}
                  </Typography>
                </Box>
              );
            }
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default OverallSection;
