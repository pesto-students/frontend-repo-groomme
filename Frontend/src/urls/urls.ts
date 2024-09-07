const authBaseRoute = "/api/auth";
const userBaseRoute = "/api/user";
const salonBaseRoute = "salon";
const supportBaseRoute = "/support";
const reviewBaseRoute = "/api";

export const authUrls = {
  signUp: `${authBaseRoute}/register`,
  signIn: `${authBaseRoute}/login`,
  validateToken: `${authBaseRoute}/validateToken`,
  logout: `${authBaseRoute}/logout`,
  ForgotPassword: `${authBaseRoute}/forgot-password`,
  ResetPassword: `${authBaseRoute}/reset-password`,
  updatePassword: `${authBaseRoute}/update-password`,
};

export const userUrls = {
  getUserDetails: `${userBaseRoute}/getUserDetails`,
};

export const salonsUrls = {
  getSalonsList: `${salonBaseRoute}/getSalonsList`,
  getOpenSalonsList: `${salonBaseRoute}/getOpenSalonsList`,
  getSalonDetails: `${salonBaseRoute}/getSalon`,
  getSalonPreview: `${salonBaseRoute}/salonPreview`,
  updateSalonDetails: `${salonBaseRoute}/updateSalon`,
  getServiceCategories: `${salonBaseRoute}/getServiceCategories`,
  bookAppointment: `/book`,
  appointmentsList: `/appointmentsList`,
};
export const helpAndSupportUrls = {
  createSupportQuery: `${supportBaseRoute}/createQuery`,
  getSupportQueriesList: `${supportBaseRoute}/getQueriesList`,
};

export const uploadToS3 = `/api/upload`;

export const paymentsUrls = {
  createPaymentIntent: "/create-payment-intent",
};

export const reviewsUrls = {
  submitReview: `${reviewBaseRoute}/reviews`,
  getReviews: (salonId: string) =>
    `${reviewBaseRoute}/salons/${salonId}/reviews`,

  updateReviews: (reviewId: string) => `${reviewBaseRoute}/reviews/${reviewId}`,
};
