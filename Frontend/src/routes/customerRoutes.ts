import BookingsList from "../Components/CustomerComponents/BookingsList/BookingsList";
import Profile from "../Components/CustomerComponents/Profile/Profile";
import SalonPreview from "../Components/CustomerComponents/SalonPreview/SalonPreview";
import SalonsList from "../Components/CustomerComponents/SalonsList/SalonsList";
import UserHelpAndSupport from "../Components/CustomerComponents/UserHelpAndSupport/UserHelpAndSupport";
import { customerRouteConstants } from "./routeConstants";

const customerRoutesArray = [
  {
    id: 1,
    path: customerRouteConstants.salonList,
    component: SalonsList,
  },
  {
    id: 2,
    path: customerRouteConstants.salonPreview,
    component: SalonPreview,
  },
  {
    id: 3,
    path: customerRouteConstants.appointments,
    component: BookingsList,
  },
  {
    id: 4,
    path: customerRouteConstants.userProfile,
    component: Profile,
  },
  {
    id: 5,
    path: customerRouteConstants.userHelp,
    component: UserHelpAndSupport,
  },
];

export default customerRoutesArray;
