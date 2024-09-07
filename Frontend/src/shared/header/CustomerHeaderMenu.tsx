import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  customerRouteConstants,
  openRouteConstants,
} from "../../routes/routeConstants";

function CustomerHeaderMenu({ isLandingPage }: { isLandingPage: boolean }) {
  const navigate = useNavigate();
  const CustomerHeaderMenuArray = [
    { id: 1, title: "Home", onClick: () => navigate(openRouteConstants.home) },
    {
      id: 2,
      title: "Salons",
      onClick: () => navigate(customerRouteConstants.salonList),
    },
    {
      id: 2,
      title: "Appointments",
      onClick: () => navigate(customerRouteConstants.appointments),
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

export default CustomerHeaderMenu;
