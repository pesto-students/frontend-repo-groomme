import React, { useState, useCallback } from "react";
import { Box, Menu, MenuItem, Typography } from "@mui/material";
import { SalonInformationType } from "../../../types/salon";

const formatTime = (time: number) => {
  const hours = Math.floor(time / 100);
  const minutes = time % 100;
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes === 0 ? "00" : minutes} ${period}`;
};

const OpenCloseHrs = ({ salon }: { salon: SalonInformationType }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <Box>
      <Typography
        variant="caption"
        onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleClose}
        sx={{ cursor: "pointer" }}
      >
        Monday:{" "}
        {formatTime(
          parseInt(salon.slotGeneration.openingClosingHours.monday.opening)
        )}{" "}
        -{" "}
        {formatTime(
          parseInt(salon.slotGeneration.openingClosingHours.monday.closing)
        )}
      </Typography>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onMouseLeave={handleClose}
      >
        {Object.entries(salon.slotGeneration.openingClosingHours).map(
          ([day, { opening, closing }]) => (
            <MenuItem key={day}>
              <Typography variant="caption">
                {day.charAt(0).toUpperCase() + day.slice(1)}:{" "}
                {formatTime(parseInt(opening))} -{" "}
                {formatTime(parseInt(closing))}
              </Typography>
            </MenuItem>
          )
        )}
      </Menu>
    </Box>
  );
};

export default OpenCloseHrs;
