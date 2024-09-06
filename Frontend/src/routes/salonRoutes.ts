import BookingCalendarMenuIcon from "../assets/icons/drawerMenuIcons/BookingCalendarMenuIcon";
import CustomerManagementMenuIcon from "../assets/icons/drawerMenuIcons/CustomerManagementMenuIcon";
import HelpSupportMenuIcon from "../assets/icons/drawerMenuIcons/HelpSupportMenuIcon";
import ManageSalonMenuIcon from "../assets/icons/drawerMenuIcons/ManageSalonMenuIcon";
import AppointmentList from "../Components/SalonComponents/AppointmentList/AppointmentList";
import Help from "../Components/SalonComponents/Help/Help";
import ManageSalon from "../Components/SalonComponents/ManageSalon/ManageSalon";
import SalonUserProfile from "../Components/SalonComponents/SalonUserProfile/SalonUserProfile";
import { salonRouteConstants } from "./routeConstants";

const salonsRoutesArray = [
  // {
  //   id: 1,
  //   path: salonRouteConstants.dashboard,
  //   component: Dashboard,
  //   label: "Dashboard",
  //   Icon: DashboardMenuIcon,
  // },
  // {
  //   id: 2,
  //   path: salonRouteConstants.bookingCalender,
  //   component: BookingCalender,
  //   label: "Booking Calender",
  //   Icon: BookingCalendarMenuIcon,
  // },
  {
    id: 3,
    path: salonRouteConstants.manageSalon,
    component: ManageSalon,
    label: "Manage Salon",
    Icon: ManageSalonMenuIcon,
  },
  // {
  //   id: 4,
  //   path: salonRouteConstants.customerManagement,
  //   component: CustomerManagement,
  //   label: "Customer Management",
  //   Icon: CustomerManagementMenuIcon,
  // },
  // {
  //   id: 5,
  //   path: salonRouteConstants.promotionsOffers,
  //   component: PromotionsOffers,
  //   label: "Promotions & Offers",
  //   Icon: PromotionOfferMenuIcon,
  // },
  // {
  //   id: 6,
  //   path: salonRouteConstants.reports,
  //   component: Reports,
  //   label: "Reports & Analytics",
  //   Icon: ReportsAnalyticsMenuIcon,
  // },
  // {
  //   id: 7,
  //   path: salonRouteConstants.billings,
  //   component: Billings,
  //   label: "Billings & Payments",
  //   Icon: BillingPaymentMenuIcon,
  // },
  // {
  //   id: 8,
  //   path: salonRouteConstants.review,
  //   component: Review,
  //   label: "Review & Rating",
  //   Icon: ReviewRatingMenuIcon,
  // },

  {
    id: 9,
    path: salonRouteConstants.bookingList,
    component: AppointmentList,
    label: "Appointment List",
    Icon: BookingCalendarMenuIcon,
  },
  {
    id: 10,
    path: salonRouteConstants.salonUserProfile,
    label: "Profile",
    component: SalonUserProfile,
    Icon: CustomerManagementMenuIcon,
  },
  {
    id: 11,
    path: salonRouteConstants.help,
    component: Help,
    label: "Help & Support",
    Icon: HelpSupportMenuIcon,
  },
];

export default salonsRoutesArray;
