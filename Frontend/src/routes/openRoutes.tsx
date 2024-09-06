import ResetPassword from "../Components/Auth/ResetPassword/ResetPassword";
import SignIn from "../Components/Auth/SignIn/SignIn";
import SignUp from "../Components/Auth/SignUp/SignUp";
import LandingPage from "../Components/LandingPage/LandingPage";
import PrivacyPolicy from "../shared/legalities/PrivacyPolicy";
import TermsAndConditions from "../shared/legalities/TermsAndConditions";
import { openRouteConstants } from "./routeConstants";

const publicRoutesArray = [
  {
    id: 1,
    path: openRouteConstants.home,
    component: <LandingPage />,
  },
  {
    id: 2,
    path: openRouteConstants.SignUp,
    component: <SignUp />,
  },
  {
    id: 3,
    path: openRouteConstants.SignIn,
    component: <SignIn />,
  },
  {
    id: 4,
    path: openRouteConstants.resetPassword,
    component: <ResetPassword />,
  },
  {
    id: 5,
    path: openRouteConstants.privacyPolicy,
    component: <PrivacyPolicy />,
  },
  {
    id: 6,
    path: openRouteConstants.termsAndConditions,
    component: <TermsAndConditions />,
  },
];

export default publicRoutesArray;
