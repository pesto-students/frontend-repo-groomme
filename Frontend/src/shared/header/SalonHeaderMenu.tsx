import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  openRouteConstants,
  salonRouteConstants,
} from "../../routes/routeConstants";

function SalonHeaderMenu({ isLandingPage }: { isLandingPage?: boolean }) {
  const navigate = useNavigate();
  const CustomerHeaderMenuArray = [
    { id: 1, title: "Home", onClick: () => navigate(openRouteConstants.home) },
    {
      id: 2,
      title: "Manage Salon",
      onClick: () => navigate(salonRouteConstants.manageSalon),
    },
    {
      id: 2,
      title: "Bookings",
      onClick: () => navigate(salonRouteConstants.bookingList),
    },
  ];
  return CustomerHeaderMenuArray.map((section) => {
    return (
      <Button
        key={section.id}
        onClick={() => section.onClick()}
        sx={{ color: isLandingPage ? "#FFF" : "#000" }}
      >
        {section.title}
      </Button>
    );
  });
}

export default SalonHeaderMenu;
